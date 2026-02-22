"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            *,
            customer:customers(full_name, email, phone, address),
            items:order_items(
                id,
                quantity,
                price,
                product:products(title, images)
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching orders:", JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}

export async function getRecentOrders(limit: number = 3) {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            customer:customers(full_name, email, phone, address),
            items:order_items(
                id,
                quantity,
                price,
                product:products(title, images)
            )
        `)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching recent orders:", JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}

export async function getDashboardStats() {
    // 1. Total Revenue (Sum of all orders)
    const { data: revenueData, error: revenueError } = await supabase
        .from("orders")
        .select("total_price");

    let totalRevenue = 0;
    if (!revenueError && revenueData) {
        totalRevenue = revenueData.reduce((acc, order) => acc + (Number(order.total_price) || 0), 0);
    }

    // 2. Active Orders (Pending, Processing, Shipped)
    const { count: activeOrdersCount, error: activeOrdersError } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .in("status", ["Pending", "Processing", "Shipped", "Fulfillment"]);

    // 3. Total Customers
    const { count: totalCustomersCount, error: customersError } = await supabase
        .from("customers")
        .select("id", { count: "exact", head: true });

    return {
        totalRevenue: totalRevenue || 0,
        activeOrders: activeOrdersCount || 0,
        totalCustomers: totalCustomersCount || 0,
    };
}

interface OrderData {
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        city: string;
        postalCode: string;
    };
    items: Array<{
        id: string; // product_id
        quantity: number;
        price: number;
    }>;
    total: number;
}

export async function createOrder(orderData: OrderData) {
    console.log("Creating order with data:", JSON.stringify(orderData, null, 2));

    // 1. Create or Get Customer
    const fullName = `${orderData.customer.firstName} ${orderData.customer.lastName}`;

    // Check if customer exists by email
    const { data: existingCustomers, error: customerSearchError } = await supabase
        .from("customers")
        .select("id")
        .eq("email", orderData.customer.email)
        .limit(1);

    if (customerSearchError) {
        console.error("Error searching customer:", customerSearchError);
        return { success: false, error: "Failed to verify customer" };
    }

    let customerId;

    if (existingCustomers && existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
        // Optionally update address
    } else {
        const { data: newCustomer, error: createCustomerError } = await supabase
            .from("customers")
            .insert([{
                full_name: fullName,
                email: orderData.customer.email,
                address: {
                    street: orderData.customer.address,
                    city: orderData.customer.city,
                    postal_code: orderData.customer.postalCode
                }
            }])
            .select("id")
            .single();

        if (createCustomerError) {
            console.error("Error creating customer:", createCustomerError);
            return { success: false, error: "Failed to create customer: " + createCustomerError.message };
        }
        customerId = newCustomer.id;
    }

    // 2. Create Order
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    const { data: newOrder, error: createOrderError } = await supabase
        .from("orders")
        .insert([{
            order_number: orderNumber,
            customer_id: customerId,
            total_price: orderData.total,
            status: "Pending",
            payment_status: "Pending" // Assuming COD or external payment for now
        }])
        .select("id")
        .single();

    if (createOrderError) {
        console.error("Error creating order:", createOrderError);
        return { success: false, error: "Failed to create order record" };
    }

    // 3. Create Order Items
    const orderItems = orderData.items.map(item => ({
        order_id: newOrder.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
    }));

    const { error: createItemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

    if (createItemsError) {
        console.error("Error creating order items:", createItemsError);
        // Ideally rollback order here, but for MVP we log it
        return { success: false, error: "Failed to create order items" };
    }

    // 4. Update Stock Levels
    await updateProductStock(orderItems);

    revalidatePath("/admin/products");
    return { success: true, orderNumber };
}

// Helper to update stock safely
async function updateProductStock(orderItems: any[]) {
    for (const item of orderItems) {
        const { data: product, error: fetchError } = await supabase
            .from("products")
            .select("inventory_quantity")
            .eq("id", item.product_id)
            .single();

        if (fetchError || !product) {
            console.error(`Error fetching product ${item.product_id} for stock update:`, fetchError);
            continue;
        }

        const newQuantity = (product.inventory_quantity || 0) - item.quantity;

        const { error: updateError } = await supabase
            .from("products")
            .update({ inventory_quantity: Math.max(0, newQuantity) }) // Prevent negative stock
            .eq("id", item.product_id);

        if (updateError) {
            console.error(`Error updating stock for product ${item.product_id}:`, updateError);
        }
    }
}

export async function updateOrderStatus(orderId: string, status: string) {
    const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

    if (error) {
        console.error("Error updating order status:", error);
        return { success: false, error: "Failed to update order status" };
    }

    revalidatePath("/admin/orders");
    return { success: true };
}

export async function getCustomerOrders(customerId: string) {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            id,
            order_number,
            created_at,
            total_price,
            status,
            payment_status,
            items:order_items(
                id,
                quantity,
                price,
                product:products(title, images)
            )
        `)
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching customer orders:", error);
        return [];
    }

    return data;
}
