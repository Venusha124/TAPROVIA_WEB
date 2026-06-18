"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function StickyQuoteBar() {
    const pathname = usePathname();
    
    // For now, let's only show this on the products page and single product pages, or hide it on the home/contact pages.
    // If we want it globally, we can remove this check, but usually it's best on shop pages.
    const isShopPage = pathname === "/products" || pathname.startsWith("/products/");

    return (
        <AnimatePresence>
            {isShopPage && (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-0 inset-x-0 z-50 p-4 pointer-events-none"
                >
                    <div className="container mx-auto max-w-4xl">
                        <div className="bg-gray-900 text-white rounded-full shadow-2xl p-4 px-6 md:px-8 flex items-center justify-between pointer-events-auto border border-gray-800 backdrop-blur-md bg-opacity-95">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#D2B48C] text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                    0
                                </div>
                                <div className="hidden md:block">
                                    <p className="font-bold text-sm">Items in Quote</p>
                                    <p className="text-xs text-gray-400">Add products to build your bulk order.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/contact">
                                    <Button className="bg-[#D2B48C] hover:bg-[#b09673] text-gray-900 font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full px-6 md:px-8 transition-all">
                                        <ShoppingCart size={14} className="mr-2" /> Request Quote
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
