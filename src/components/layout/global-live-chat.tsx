"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, MessageSquare } from "lucide-react";

export function GlobalLiveChat() {
    const [isOpen, setIsOpen] = React.useState(false);

    const contactMethods = [
        {
            icon: MessageSquare,
            label: "WhatsApp Business",
            detail: "Direct artisan access",
            href: "https://wa.me/94771234567",
            color: "text-green-500"
        },
        {
            icon: Send,
            label: "Direct Email",
            detail: "concierge@taprovia.com",
            href: "mailto:concierge@taprovia.com",
            color: "text-[#D2B48C]"
        },
        {
            icon: Phone,
            label: "Direct Protocol",
            detail: "+94 77 123 4567",
            href: "tel:+94771234567",
            color: "text-white/40"
        }
    ];

    return (
        <div className="fixed bottom-12 right-12 z-[500]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-80 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 shadow-3xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent opacity-30" />
                        <div className="mb-8">
                            <span className="text-[#D2B48C] font-bold tracking-[0.4em] uppercase text-[9px] mb-2 block">Concierge Desk</span>
                            <h3 className="text-xl font-serif text-white italic">How may we assist?</h3>
                        </div>

                        <div className="space-y-4">
                            {contactMethods.map((method, i) => (
                                <a
                                    key={i}
                                    href={method.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#D2B48C]/30 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform`}>
                                        <method.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white tracking-wide">{method.label}</h4>
                                        <p className="text-[10px] text-white/40 font-light italic">{method.detail}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <p className="mt-8 text-[9px] text-white/20 font-light italic text-center">
                            Standard response time: <span className="text-white/40">Within 2 hours</span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-auto"
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full bg-[#D2B48C] text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all group relative"
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                    {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#050505] animate-pulse" />}
                </button>
            </motion.div>
        </div>
    );
}
