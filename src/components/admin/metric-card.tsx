"use client";

import React from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-[#050505] border border-white/5 rounded-3xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="relative z-10">
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{title}</h3>
                <div className="flex items-baseline gap-4">
                    <span className="text-3xl text-white font-serif">{value}</span>
                    <span className="text-green-500 text-xs font-bold">{trend}</span>
                </div>
            </div>
        </motion.div>
    );
}
