import React from "react";
import { getOrders } from "@/actions/orders";
import { OrdersTable } from "@/components/admin/orders-table";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Orders</h1>
                    <p className="text-white/40 text-sm">Track and fulfill customer orders.</p>
                </div>
            </div>

            <OrdersTable initialOrders={orders} />
        </div>
    );
}
