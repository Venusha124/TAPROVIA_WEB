"use client";

import React, { useState } from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Search, Filter, CheckCircle, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
    id: string;
    order_number: string;
    created_at: string;
    customer: {
        full_name: string;
        email: string;
        phone?: string;
    } | null;
    total_price: number;
    status: string;
    payment_status: string;
}

const TABS = ["All", "Pending", "Fulfillment", "Shipped", "Completed", "Cancelled"];

export function OrdersTable({ initialOrders }: { initialOrders: any[] }) {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOrders = initialOrders.filter((order) => {
        const matchesTab = activeTab === "All" || order.status === activeTab;
        const matchesSearch =
            order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer?.email.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case 'Shipped': return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case 'Cancelled': return "text-red-400 bg-red-400/10 border-red-400/20";
            case 'Fulfillment': return "text-amber-400 bg-amber-400/10 border-amber-400/20";
            default: return "text-[#D2B48C] bg-[#D2B48C]/10 border-[#D2B48C]/20";
        }
    };

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-1">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-3 text-sm font-bold uppercase tracking-widest rounded-t-xl transition-all relative",
                            activeTab === tab
                                ? "text-[#D2B48C] bg-white/[0.02]"
                                : "text-white/40 hover:text-white hover:bg-white/[0.01]"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D2B48C]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 bg-[#050505] p-2 rounded-2xl border border-white/5">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none text-sm"
                    />
                </div>
                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors border-l border-white/5">
                    <Filter size={18} />
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Order</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Date</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Customer</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Total</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Payment</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/20 text-sm">
                                        No orders found in this category.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 text-white font-medium text-sm">
                                            {order.order_number}
                                        </td>
                                        <td className="p-6 text-white/60 text-sm">
                                            {formatDate(order.created_at)}
                                        </td>
                                        <td className="p-6 text-white text-sm">
                                            {order.customer?.full_name || "Guest"}
                                            <div className="flex flex-col gap-0.5 mt-1">
                                                <span className="text-[10px] text-white/40">{order.customer?.email}</span>
                                                {order.customer?.phone && (
                                                    <span className="text-[10px] text-white/40">{order.customer.phone}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-[#D2B48C] font-serif italic text-lg">
                                            {formatCurrency(order.total_price)}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider">
                                                {order.payment_status === 'Paid' ? (
                                                    <CheckCircle size={12} className="text-emerald-500" />
                                                ) : (
                                                    <Clock size={12} className="text-amber-500" />
                                                )}
                                                {order.payment_status}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", getStatusColor(order.status))}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
