import React from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp, Clock } from "lucide-react";
import { getRecentOrders, getDashboardStats } from "@/actions/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MetricCard } from "@/components/admin/metric-card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const [recentOrders, stats] = await Promise.all([
        getRecentOrders(3),
        getDashboardStats()
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Dashboard</h1>
                    <p className="text-white/40 text-sm">Welcome back to the command center.</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D2B48C]">Live Status</span>
                    <div className="flex items-center justify-end gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white/60 text-xs">Systems Nominal</span>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} trend="+12.5%" icon={<DollarSign size={48} />} />
                <MetricCard title="Active Orders" value={stats.activeOrders.toString()} trend="+4" icon={<ShoppingBag size={48} />} />
                <MetricCard title="Total Customers" value={stats.totalCustomers.toString()} trend="+18%" icon={<Users size={48} />} />
                <MetricCard title="Conversion Rate" value="3.2%" trend="+0.4%" icon={<TrendingUp size={48} />} />
            </div>

            {/* Recent Activity */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-serif text-white">Recent Orders</h3>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Clock size={14} />
                        <span>Real-time</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {recentOrders.length === 0 ? (
                        <div className="text-white/40 text-sm italic">No recent orders found.</div>
                    ) : (
                        recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#D2B48C] group-hover:bg-[#D2B48C]/10 transition-colors">
                                        <ShoppingBag size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-white font-medium">Order {order.order_number}</h4>
                                        <p className="text-xs text-white/40">{formatDate(order.created_at)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[#D2B48C] text-sm font-bold block">{formatCurrency(order.total_price)}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">{order.status}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
