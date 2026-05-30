"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- GET PRODUCTS ---
export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }

    return data;
}

// --- GET SINGLE PRODUCT ---
export async function getProduct(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return null;
    return data;
}

// --- CREATE PRODUCT ---
export async function createProduct(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const compareAtPrice = parseFloat(formData.get("compareAtPrice") as string) || null;
    const costPerItem = parseFloat(formData.get("costPerItem") as string) || null;
    const sku = formData.get("sku") as string;
    const inventoryQuantity = parseInt(formData.get("inventoryQuantity") as string) || 0;
    // Images handled separately or via URL string for now
    const imageUrl = formData.get("imageUrl") as string;
    const images = imageUrl ? [imageUrl] : [];

    const { error } = await supabase.from("products").insert([
        {
            title,
            description,
            status,
            price,
            compare_at_price: compareAtPrice,
            cost_per_item: costPerItem,
            sku,
            inventory_quantity: inventoryQuantity,
            images,
            grade: formData.get("grade") as string,
            origin: formData.get("origin") as string,
            features: (formData.get("features") as string)?.split(",").map(f => f.trim()).filter(Boolean) || [],
            category: formData.get("category") as string,
        },
    ]);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin/products");
    return { success: true };
}

// --- UPDATE PRODUCT ---
export async function updateProduct(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const compareAtPrice = parseFloat(formData.get("compareAtPrice") as string) || null;
    const costPerItem = parseFloat(formData.get("costPerItem") as string) || null;
    const sku = formData.get("sku") as string;
    const inventoryQuantity = parseInt(formData.get("inventoryQuantity") as string) || 0;
    const imageUrl = formData.get("imageUrl") as string;
    const images = imageUrl ? [imageUrl] : []; // Basic handling for now

    const { error } = await supabase
        .from("products")
        .update({
            title,
            description,
            status,
            price,
            compare_at_price: compareAtPrice,
            cost_per_item: costPerItem,
            sku,
            inventory_quantity: inventoryQuantity,
            images,
            grade: formData.get("grade") as string,
            origin: formData.get("origin") as string,
            features: (formData.get("features") as string)?.split(",").map(f => f.trim()).filter(Boolean) || [],
            category: formData.get("category") as string,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin/products");
    return { success: true };
}

// --- DELETE PRODUCT ---
export async function deleteProduct(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/products");
}
