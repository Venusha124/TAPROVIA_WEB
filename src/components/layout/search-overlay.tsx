"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const suggestions = [
        { category: "Grades", items: ["Alba Quills", "C5 Special", "Grading Guide"] },
        { category: "Usage", items: ["Culinary Dust", "Bark Oil", "Medicinal Potions"] },
        { category: "Locations", items: ["Matara Highlands", "Southern Belt", "Plantation Reserve"] }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-40 px-4"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-12 right-12 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-white/40 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                    {/* Search Input Container */}
                    <div className="w-full max-w-5xl">
                        <div className="relative group mb-24">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="DISCOVER THE SOVEREIGN..."
                                className="w-full bg-transparent border-b border-white/10 py-12 text-4xl md:text-7xl font-serif font-light text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C] transition-all tracking-tighter uppercase"
                            />
                            <div className="absolute right-0 bottom-12 text-[#D2B48C] opacity-30 group-hover:opacity-100 transition-opacity">
                                <Search size={48} strokeWidth={1} />
                            </div>
                        </div>

                        {/* Suggestions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                            {suggestions.map((section, idx) => (
                                <motion.div
                                    key={section.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                >
                                    <h4 className="text-[#D2B48C] font-bold text-[10px] tracking-[0.5em] uppercase mb-10 opacity-40">
                                        {section.category}
                                    </h4>
                                    <ul className="space-y-6">
                                        {section.items.map((item) => (
                                            <li key={item}>
                                                <Link
                                                    href={item === "Grading Guide" ? "/grading" : "/products"}
                                                    onClick={onClose}
                                                    className="text-xl md:text-2xl text-white/40 hover:text-white transition-colors flex items-center gap-4 group italic font-serif underline decoration-white/0 hover:decoration-[#D2B48C]/30 decoration-1"
                                                >
                                                    {item}
                                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[#D2B48C]" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        {/* Featured Item */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-32 p-12 rounded-[3rem] border border-white/5 bg-white/[0.02] flex items-center gap-12 group cursor-pointer hover:bg-white/[0.04] transition-all"
                        >
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D2B48C]/20 to-transparent flex items-center justify-center text-[#D2B48C]">
                                <Sparkles size={32} />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D2B48C] mb-2 block">Premium Insight</span>
                                <h3 className="text-2xl font-serif text-white group-hover:text-[#D2B48C] transition-colors">The 2024 Alba Reserve Report</h3>
                            </div>
                            <ArrowRight className="mr-8 text-white/20 group-hover:text-[#D2B48C] transition-colors" />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
