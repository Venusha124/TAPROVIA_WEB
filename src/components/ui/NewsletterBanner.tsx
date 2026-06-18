"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show after 5 seconds if not dismissed
        const timer = setTimeout(() => {
            if (!isDismissed) {
                setIsVisible(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 z-[100] max-w-sm w-full"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="bg-[#D2B48C]/10 p-6 relative">
                            <button 
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full p-1 shadow-sm"
                            >
                                <X size={16} />
                            </button>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#D2B48C] mb-4">
                                <Mail size={20} />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Get the Ceylon Guide</h3>
                            <p className="text-sm text-gray-600 mb-0">
                                Enter your email for a free wholesale guide to True Ceylon Cinnamon grades and pricing.
                            </p>
                        </div>
                        <div className="p-6">
                            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleDismiss(); }}>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    required
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#D2B48C] focus:ring-1 focus:ring-[#D2B48C]"
                                />
                                <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white px-4 rounded-lg">
                                    <ArrowRight size={16} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
