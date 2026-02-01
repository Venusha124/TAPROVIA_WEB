"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronRight, X, Minus, Plus, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Validate and fix prices to prevent NaN
        const validatedCart = cart.map((item: any) => ({
            ...item,
            price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : Number(item.price) || 0
        }));
        setItems(validatedCart);
        setIsLoaded(true);
    }, []);

    const updateLocalStorage = (newItems: any[]) => {
        localStorage.setItem('cart', JSON.stringify(newItems));
        setItems(newItems);
    };

    const updateQuantity = (id: string, delta: number) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        updateLocalStorage(newItems);
    };

    const removeItem = (id: string) => {
        const newItems = items.filter(item => item.id !== id);
        updateLocalStorage(newItems);
    };

    const clearCart = () => {
        updateLocalStorage([]);
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = items.length > 0 ? 8.00 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    if (!isLoaded) {
        return <div className="bg-[#050505] min-h-screen" />;
    }

    return (
        <main className="bg-[#050505] min-h-screen text-[#F3EFE9] pt-32 pb-60 overflow-x-hidden selection:bg-[#D2B48C] selection:text-black">
            {/* Stage I: Header */}
            <div className="container px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0A0A0A] border border-[#D2B48C]/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">Your Selection</span>
                        <h1 className="text-6xl md:text-[8rem] font-serif font-light leading-none mb-12 tracking-tighter">
                            Your <span className="italic text-white/30">Cart.</span>
                        </h1>
                        <p className="text-xl text-white/40 font-light italic font-serif leading-relaxed max-w-xl mb-16">
                            Review your selected TAPROVIA items. Update quantities, remove items, and proceed to checkout when ready.
                        </p>

                        <Button
                            onClick={() => router.push('/explore')}
                            className="bg-[#D2B48C] text-black hover:bg-white rounded-full h-16 px-10 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/checkout')}
                            className="border-white/10 text-white/50 hover:bg-white/5 hover:text-white rounded-full h-16 px-10 text-[11px] font-bold uppercase tracking-[0.3em] bg-transparent transition-all"
                        >
                            Go to Checkout
                        </Button>
                    </div>

                    {/* Atmospheric Glow */}
                    <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-[#D2B48C]/5 rounded-full blur-[120px] pointer-events-none" />
                </motion.div>
            </div>

            {/* Stage II: Content */}
            <div className="container px-4">
                {items.length > 0 ? (
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                        {/* Left Column: Items */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Summary Bar */}
                            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Order Preview</span>
                                    <h2 className="text-2xl font-serif text-white tracking-tight">Items & Summary</h2>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/explore')}
                                        className="border-white/5 text-white/40 hover:text-white rounded-full h-12 px-6 text-[9px] font-bold uppercase tracking-widest bg-transparent transition-all"
                                    >
                                        Add More Items
                                    </Button>
                                    <Button
                                        onClick={() => router.push('/checkout')}
                                        className="bg-[#D2B48C]/10 text-[#D2B48C] hover:bg-[#D2B48C] hover:text-black rounded-full h-12 px-6 text-[9px] font-bold uppercase tracking-widest transition-all"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>

                            {/* Item List */}
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 md:p-10 group relative"
                                    >
                                        <div className="flex flex-col md:grid md:grid-cols-12 gap-10 items-center">
                                            {/* Item Image */}
                                            <div className="md:col-span-4 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5">
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                            </div>

                                            {/* Item Details */}
                                            <div className="md:col-span-4 text-center md:text-left">
                                                <h3 className="text-2xl font-serif text-white mb-2">{item.name}</h3>
                                                <p className="text-[#D2B48C] text-[10px] font-bold uppercase tracking-widest mb-6 opacity-60">{item.origin}</p>
                                                <p className="text-white/40 text-lg font-serif italic">${item.price ? item.price.toFixed(2) : "0.00"} each</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="md:col-span-4 flex flex-col items-center md:items-end gap-8">
                                                {/* Quantity Control */}
                                                <div className="flex flex-col items-center md:items-end gap-3">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Qty</span>
                                                    <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-full p-2 pr-8">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-sm text-white">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <span className="text-xl font-serif text-[#D2B48C] ml-auto">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center gap-3 text-white/20 hover:text-red-400/60 transition-all group/btn"
                                                >
                                                    <Trash2 size={14} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Summary */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#0A0A0A] border border-[#D2B48C]/20 rounded-[3rem] p-12 sticky top-32 overflow-hidden"
                            >
                                <h2 className="text-4xl font-serif text-white mb-12 tracking-tight">Order Summary</h2>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-center text-sm font-light text-white/40">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Subtotal</span>
                                        <span className="font-serif italic text-lg">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-white/40">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Shipping</span>
                                        <span className="font-serif italic text-lg">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-white/40">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Estimated Tax</span>
                                        <span className="font-serif italic text-lg">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                                        <span className="text-xl font-serif text-white italic">Total</span>
                                        <span className="text-4xl font-serif text-[#D2B48C] tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Button
                                        onClick={() => router.push('/checkout')}
                                        className="w-full bg-[#D2B48C] text-black hover:bg-white rounded-full h-20 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-2xl"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/explore')}
                                        className="w-full border-white/10 text-white/50 hover:bg-white/5 hover:text-white rounded-full h-20 text-[11px] font-bold uppercase tracking-[0.3em] bg-transparent transition-all"
                                    >
                                        Continue Shopping
                                    </Button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full text-white/20 hover:text-red-400/60 text-[9px] font-bold uppercase tracking-[0.4em] transition-all pt-4"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#D2B48C]/5 to-transparent pointer-events-none" />
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-60 text-center"
                    >
                        <ShoppingBag size={64} className="mx-auto text-white/5 mb-12" />
                        <h2 className="text-4xl font-serif text-white mb-8 italic">Your cart is as empty as a morning mist.</h2>
                        <Button
                            onClick={() => router.push('/explore')}
                            className="bg-[#D2B48C]/10 text-[#D2B48C] hover:bg-[#D2B48C] hover:text-black rounded-full h-16 px-12 text-[10px] font-bold uppercase tracking-[0.4em] transition-all"
                        >
                            Explore the Collection
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Footer Texture */}
            <div className="absolute bottom-20 right-10 text-[12vw] font-serif font-black text-white/[0.02] select-none pointer-events-none uppercase italic leading-none z-0">
                Sovereign.
            </div>
        </main>
    );
}
