"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
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
                <MetricCard title="Total Revenue" value="$48,290" trend="+12.5%" Icon={DollarSign} />
                <MetricCard title="Active Orders" value="24" trend="+4" Icon={ShoppingBag} />
                <MetricCard title="Total Customers" value="1,204" trend="+18%" Icon={Users} />
                <MetricCard title="Conversion Rate" value="3.2%" trend="+0.4%" Icon={TrendingUp} />
            </div>

            {/* Recent Activity Mock */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-serif text-white mb-6">Recent Orders</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                                    <ShoppingBag size={16} />
                                </div>
                                <div>
                                    <h4 className="text-sm text-white font-medium">Order #102{i}</h4>
                                    <p className="text-xs text-white/40">2 minutes ago</p>
                                </div>
                            </div>
                            <span className="text-[#D2B48C] text-sm font-bold">$340.00</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, Icon }: { title: string, value: string, trend: string, Icon: any }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-[#050505] border border-white/5 rounded-3xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Icon size={48} />
            </div>
            <div className="relative z-10">
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{title}</h3>
                <div className="flex items-baseline gap-4">
                    <span className="text-3xl text-white font-serif">{value}</span>
                    <span className="text-green-500 text-xs font-bold">{trend}</span>
                </div>
            </div>
        </motion.div>
    )
}
