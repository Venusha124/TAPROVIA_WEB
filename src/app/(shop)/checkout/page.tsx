"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Truck, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [formStep, setFormStep] = useState(1); // 1: Info, 2: Payment, 3: Confirm
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Ensure valid prices
        const validatedCart = cart.map((item: any) => ({
            ...item,
            price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : Number(item.price) || 0
        }));
        setItems(validatedCart);
        setIsLoaded(true);
    }, []);

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = items.length > 0 ? 8.00 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    if (!isLoaded) return <div className="bg-[#050505] min-h-screen" />;

    return (
        <main className="bg-[#050505] min-h-screen text-[#F3EFE9] pt-32 pb-60 overflow-x-hidden selection:bg-[#D2B48C] selection:text-black">
            <div className="container px-4">

                {/* Header */}
                <div className="mb-20">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors text-xs uppercase tracking-widest">
                        <ArrowLeft size={14} /> Back to Cart
                    </button>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Secure Checkout.</h1>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                        <span className={cn(formStep >= 1 ? "text-[#D2B48C]" : "")}>01. Shipping</span>
                        <div className="w-8 h-px bg-white/10" />
                        <span className={cn(formStep >= 2 ? "text-[#D2B48C]" : "")}>02. Payment</span>
                        <div className="w-8 h-px bg-white/10" />
                        <span className={cn(formStep >= 3 ? "text-[#D2B48C]" : "")}>03. Review</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left: Form */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Shipping Info */}
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 md:p-16">
                            <div className="flex items-center gap-4 mb-10">
                                <Truck className="text-[#D2B48C]" size={24} />
                                <h2 className="text-2xl font-serif text-white">Shipping Details</h2>
                            </div>

                            <form className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">First Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-sm focus:border-[#D2B48C] outline-none transition-all" placeholder="Shamalka" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Last Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-sm focus:border-[#D2B48C] outline-none transition-all" placeholder="Edirisinghe" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Email Address</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-sm focus:border-[#D2B48C] outline-none transition-all" placeholder="hello@taprovia.com" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Street Address</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-sm focus:border-[#D2B48C] outline-none transition-all" placeholder="123 Matara Road" />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">City</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-sm focus:border-[#D2B48C] outline-none transition-all" placeholder="Galle" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Postal Code</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-sm focus:border-[#D2B48C] outline-none transition-all" placeholder="80000" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 md:p-16 opacity-50 relative pointer-events-none">
                            <div className="absolute inset-0 z-10" /> {/* Overlay to indicate disabled/next step */}
                            <div className="flex items-center gap-4 mb-10">
                                <CreditCard className="text-white/40" size={24} />
                                <h2 className="text-2xl font-serif text-white/60">Payment Method</h2>
                            </div>
                            <p className="text-white/30 text-sm">Secure payment via Stripe or Direct Bank Transfer will be available in the next step.</p>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="bg-[#0A0A0A] border border-[#D2B48C]/20 rounded-[3rem] p-10 md:p-12 overflow-hidden relative">
                                <h2 className="text-2xl font-serif text-white mb-8">Order Summary</h2>

                                <div className="max-h-60 overflow-y-auto custom-scrollbar mb-8 space-y-6">
                                    {items.map((item, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-serif text-lg leading-none mb-1">{item.name}</h4>
                                                <p className="text-[10px] uppercase tracking-widest text-white/40">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-[#D2B48C] font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-white/10 space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-sm font-light text-white/40">
                                        <span className="uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                        <span className="font-serif italic">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-white/40">
                                        <span className="uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                        <span className="font-serif italic">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-white/40">
                                        <span className="uppercase tracking-widest text-[10px] font-bold">Tax</span>
                                        <span className="font-serif italic">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-10">
                                    <span className="text-xl font-serif text-white italic">Total</span>
                                    <span className="text-4xl font-serif text-[#D2B48C] tracking-tighter">${total.toFixed(2)}</span>
                                </div>

                                <Button
                                    onClick={() => {
                                        setIsOrderConfirmed(true);
                                        localStorage.removeItem('cart');
                                    }}
                                    className="w-full bg-[#D2B48C] text-black hover:bg-white rounded-full h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl group"
                                >
                                    Confirm Order <ShieldCheck size={16} className="ml-4 text-black/50 group-hover:text-black" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOrderConfirmed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#0A0A0A] border border-[#D2B48C]/20 rounded-[3rem] p-12 md:p-20 text-center max-w-2xl relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent" />

                            <div className="w-24 h-24 rounded-full bg-[#D2B48C]/10 flex items-center justify-center mx-auto mb-10 border border-[#D2B48C]/20">
                                <CheckCircle2 className="text-[#D2B48C] w-10 h-10" />
                            </div>

                            <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Order Successfully Placed</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-none">
                                Welcome to the <br /> <span className="italic text-white/30">Inner Circle.</span>
                            </h2>
                            <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-md mx-auto">
                                Your order regarding the sovereign grade inventory has been secured. Our concierge team will contact you shortly to finalize shipping logistics.
                            </p>

                            <Button
                                onClick={() => router.push('/')}
                                className="bg-white text-black hover:bg-[#D2B48C] rounded-full h-16 px-12 text-[10px] font-bold uppercase tracking-[0.4em] transition-all shadow-xl"
                            >
                                Return to Estate
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
