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
                        <h1 className="text-6xl md:text-[10rem] font-serif font-light leading-none mb-12 tracking-tighter text-white">
                            Direct <span className="italic text-white/20">Access.</span>
                        </h1>
                        <p className="text-white/40 max-w-2xl mx-auto text-xl font-light leading-relaxed italic border-x border-white/5 px-12">
                            "Connecting the source to the connoisseur. Our Concierge Desk is primed for your global acquisition requirements."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. QUICK INFO GRID --- */}
            <section className="py-20 bg-[#080808] border-y border-white/5">
                <div className="container px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Response time", value: "Within 24–48 hrs" },
                            { label: "Best for", value: "Bulk / Export" },
                            { label: "Support", value: "Order guidance" },
                            { label: "Shipping", value: "Worldwide options" }
                        ].map((info, i) => (
                            <div key={i} className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.04] transition-all group">
                                <span className="text-white/20 text-[10px] font-bold uppercase tracking-wider block mb-2 group-hover:text-[#D2B48C]/50 transition-colors">{info.label}</span>
                                <h3 className="text-white font-serif font-light text-xl group-hover:text-[#D2B48C] transition-colors italic">{info.value}</h3>
                            </div>
                        ))}
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

                            <div className="pt-20 border-t border-white/5 space-y-12">
                                {/* Business Hours Card */}
                                <div className="p-10 rounded-[2.5rem] bg-white/[0.02] text-[#F3EFE9] border border-white/5 relative overflow-hidden group">
                                    <h3 className="text-white font-serif text-2xl mb-8 italic">Business Hours</h3>
                                    <div className="space-y-4 font-sans text-sm font-light">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                            <span className="text-white/40">Mon–Fri</span>
                                            <span className="text-white font-medium">9:00 AM – 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                            <span className="text-white/40">Saturday</span>
                                            <span className="text-white font-medium">10:00 AM – 2:00 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/40">Sunday</span>
                                            <span className="text-[#D2B48C] font-bold">Closed</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Preview Card */}
                                <div className="p-4 rounded-[3rem] bg-white/[0.02] border border-white/5 relative group">
                                    <div className="flex justify-between items-center px-10 py-10">
                                        <div>
                                            <span className="text-[#D2B48C] text-[10px] font-bold uppercase tracking-[0.4em] block mb-2 transition-colors">Find us</span>
                                            <h3 className="text-white font-serif text-3xl font-light italic">Location <span className="text-white/20">Preview</span></h3>
                                        </div>
                                        <button className="h-14 px-8 rounded-full border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:border-[#D2B48C] hover:text-[#D2B48C] transition-all">
                                            Open Maps
                                        </button>
                                    </div>
                                    <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-black">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511707696!2d79.85959141477286!3d6.914677495003666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596dc70a2fef%3A0x6b8014526c85775c!2sColombo!5e0!3m2!1sen!2slk!4v1680000000000!5m2!1sen!2slk"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)' }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: THE SEND A MESSAGE FORM */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-white/[0.02] backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D2B48C]/30 to-transparent" />

                                <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 text-white italic">Send a <span className="text-white/20">Message</span></h2>
                                <p className="text-white/40 text-sm mb-12 max-w-lg leading-relaxed font-light italic border-l border-[#D2B48C]/30 pl-8">
                                    "Share a quick note about your request. If it's a booking service, include your preferred date and location."
                                </p>

                                <div className="space-y-12">
                                    {/* Message Type Pills */}
                                    <div className="space-y-6">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Message classification</label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Partnership", "Export", "Bulk", "Packaging", "Booking"].map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    className="px-8 py-4 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:border-[#D2B48C] hover:text-[#D2B48C] transition-all"
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <form className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <input type="text" placeholder="Your Name" className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/20" />
                                            <input type="email" placeholder="Your Email" className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/20" />
                                            <input type="tel" placeholder="Phone (optional)" className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/20" />
                                            <input type="text" placeholder="Country (optional)" className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/20" />
                                        </div>

                                        <input type="text" placeholder="Subject (e.g., Partnership / Export Inquiry / Booking)" className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white focus:outline-none focus:border-[#D2B48C] transition-all placeholder:text-white/20" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <select className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white/60 focus:outline-none focus:border-[#D2B48C] transition-all appearance-none cursor-pointer">
                                                <option className="bg-[#050505] text-white">Preferred contact: Email</option>
                                                <option className="bg-[#050505] text-white">Preferred contact: Phone</option>
                                                <option className="bg-[#050505] text-white">Preferred contact: WhatsApp</option>
                                            </select>
                                            <select className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-6 text-sm text-white/60 focus:outline-none focus:border-[#D2B48C] transition-all appearance-none cursor-pointer">
                                                <option className="bg-[#050505] text-white">Timeframe: Anytime</option>
                                                <option className="bg-[#050505] text-white">Timeframe: Morning</option>
                                                <option className="bg-[#050505] text-white">Timeframe: Evening</option>
                                            </select>
                                        </div>

                                        <div className="relative">
                                            <textarea rows={6} placeholder="Your Message" className="w-full bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 text-sm text-white focus:outline-none focus:border-[#D2B48C] transition-all resize-none placeholder:text-white/20 italic font-serif" ></textarea>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 border-dashed">
                                            <label className="flex items-center gap-4 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-black text-[#D2B48C] focus:ring-[#D2B48C]" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">I agree to be contacted about my request.</span>
                                            </label>
                                            <span className="text-[10px] text-white/20 font-bold tabular-nums">0 / 800</span>
                                        </div>

                                        <div className="flex flex-wrap gap-6">
                                            <Button className="bg-[#D2B48C] hover:bg-white text-black px-16 h-20 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] transition-all shadow-2xl">
                                                Send Message
                                            </Button>
                                            <Button variant="outline" className="border-white/10 text-white/40 hover:bg-white/5 hover:text-white px-16 h-20 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] transition-all">
                                                Copy Email
                                            </Button>
                                        </div>

                                        <p className="text-[10px] text-white/20 font-light italic pt-4">
                                            Tip: For bulk/export, include quantity, destination country, and preferred packing (bags/jars).
                                        </p>
                                    </form>
                                </div>
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
