"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, Send, Globe, MessageSquare, ShieldCheck, Zap, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";


export default function ContactPage() {
    const [status, setStatus] = useState<"LIVE" | "STANDBY">("STANDBY");

    useEffect(() => {
        const updateStatus = () => {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const slDate = new Date(utc + (3600000 * 5.5));
            const hours = slDate.getHours();
            setStatus(hours >= 8 && hours < 18 ? "LIVE" : "STANDBY");
        };
        updateStatus();
        const interval = setInterval(updateStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#F3EFE9] selection:bg-[#D2B48C] selection:text-black overflow-x-hidden">

            {/* --- 1. THE CONCIERGE HERO --- */}
            <section className="relative pt-64 pb-24 text-center border-b border-white/5 bg-[radial-gradient(circle_at_top,rgba(210,180,140,0.05),transparent)]">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px]">Global Logistics Desk</span>
                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1 rounded-full border text-[8px] font-bold tracking-[0.2em] uppercase",
                                status === "LIVE" ? "bg-[#D2B48C]/10 border-[#D2B48C] text-[#D2B48C]" : "bg-white/5 border-white/10 text-white/20"
                            )}>
                                <div className={cn("w-1 h-1 rounded-full", status === "LIVE" ? "bg-[#D2B48C] animate-pulse" : "bg-white/20")} />
                                Desk {status}
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-serif font-light leading-none mb-12 tracking-tighter">
                            Direct <span className="italic text-white/20">Access.</span>
                        </h1>
                        <p className="text-white/40 max-w-2xl mx-auto text-xl font-light leading-relaxed italic border-x border-white/5 px-12">
                            "Connecting the source to the connoisseur. Our Concierge Desk is primed for your global acquisition requirements."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. BESPOKE PROTOCOLS --- */}
            <section className="py-32 border-b border-white/5 bg-[#080808]">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ProtocolCard
                            Icon={Zap}
                            title="Global Wholesale"
                            desc="Optimized logistics for luxury distributors and bulk acquisitions of premium export grades."
                            action="View Logistics"
                        />
                        <ProtocolCard
                            Icon={Diamond}
                            title="Private Reserve"
                            desc="Bespoke access for elite collectors to reserve the limited Alba Peak harvests before global release."
                            action="Request Access"
                        />
                        <ProtocolCard
                            Icon={ShieldCheck}
                            title="Compliance Registry"
                            desc="Direct verification of ISO 22000, FDA and Organic certifications for institutional audits."
                            action="Verify Protocol"
                        />
                    </div>
                </div>
            </section>

            {/* --- 3. THE HUB GRID --- */}
            <section className="py-32 relative">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                        {/* LEFT: INFORMATION MODULES */}
                        <div className="lg:col-span-5 space-y-20">
                            <div>
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#D2B48C] mb-12 block">The Strategic Hub</h2>

                                <div className="space-y-12">
                                    <ContactInfoItem
                                        Icon={MapPin}
                                        title="Operations Center"
                                        detail="No. 45, Cinnamon Gardens, Galle Road, Balapitiya, LK."
                                    />
                                    <ContactInfoItem
                                        Icon={Globe}
                                        title="Global Trading"
                                        detail="Serving 48+ Nations across 4 Continents with direct Highland provenance."
                                    />
                                    <ContactInfoItem
                                        Icon={Mail}
                                        title="Registry Desk"
                                        detail="exports@taprovia.com • concierge@taprovia.com"
                                    />
                                    <ContactInfoItem
                                        Icon={Phone}
                                        title="Direct Protocol"
                                        detail="+94 11 234 5678 (INTL) • +94 77 123 4567 (SOS)"
                                    />
                                </div>
                            </div>

                            <div className="pt-20 border-t border-white/5">
                                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-700">
                                        <Clock size={80} />
                                    </div>
                                    <h3 className="text-white font-serif text-2xl mb-4 italic">Clock Synchrony</h3>
                                    <p className="text-white/30 text-sm font-light leading-relaxed">
                                        Operating on IST (GMT+5:30). Desk active 08:00 — 18:00 Mon-Fri. Global SOS active 24/7 for logistics priority.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: THE INQUIRY VAULT */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-white/[0.02] backdrop-blur-3xl p-10 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D2B48C]/30 to-transparent" />

                                <div className="flex items-center gap-6 mb-16">
                                    <MessageSquare size={20} className="text-[#D2B48C]" />
                                    <h2 className="text-2xl md:text-3xl font-serif text-white italic">Protocol Inquiry</h2>
                                </div>

                                <form className="space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Appellation</label>
                                            <input type="text" className="w-full bg-transparent border-b border-white/10 py-5 text-lg font-light text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/5 uppercase tracking-wider" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Registry Email</label>
                                            <input type="email" className="w-full bg-transparent border-b border-white/10 py-5 text-lg font-light text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/5 uppercase tracking-wider" placeholder="email@protocol.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Inquiry Classification</label>
                                        <select className="w-full bg-transparent border-b border-white/10 py-5 text-lg font-light text-white focus:outline-none focus:border-[#D2B48C] transition-all appearance-none cursor-pointer uppercase tracking-wider">
                                            <option className="bg-[#050505]">Wholesale Acquisition</option>
                                            <option className="bg-[#050505]">Private Reserve Request</option>
                                            <option className="bg-[#050505]">Logistics Analytics</option>
                                            <option className="bg-[#050505]">Press Chronicles</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Narrative</label>
                                        <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-5 text-lg font-light text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/5 resize-none italic font-serif" placeholder="Elaborate on your requirements..." ></textarea>
                                    </div>

                                    <div className="pt-8">
                                        <Button className="w-full h-24 bg-[#D2B48C] text-black hover:bg-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-full transition-all group overflow-hidden relative shadow-3xl">
                                            <span className="relative z-10 flex items-center justify-center gap-4">
                                                Transmit Inquiry <Send size={16} />
                                            </span>
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function ContactInfoItem({ Icon, title, detail }: { Icon: any, title: string, detail: string }) {
    return (
        <div className="flex items-start gap-8 group">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#D2B48C] group-hover:text-black transition-all duration-700 group-hover:rotate-12">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-2">{title}</h3>
                <p className="text-white text-lg font-light italic leading-relaxed font-serif">
                    {detail}
                </p>
            </div>
        </div>
    )
}

function ProtocolCard({ Icon, title, desc, action }: { Icon: any, title: string, desc: string, action: string }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 group hover:border-[#D2B48C]/30 transition-all duration-700"
        >
            <div className="w-16 h-16 rounded-2xl bg-[#D2B48C]/10 text-[#D2B48C] flex items-center justify-center mb-8 border border-[#D2B48C]/20 group-hover:bg-[#D2B48C] group-hover:text-black transition-all">
                <Icon size={24} />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4 italic">{title}</h3>
            <p className="text-white/30 text-sm font-light leading-relaxed mb-8">{desc}</p>
            <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-[#D2B48C]">
                {action} <ArrowUpRight size={14} />
            </button>
        </motion.div>
    )
}
