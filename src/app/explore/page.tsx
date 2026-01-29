"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Eye, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const shopProducts = [
    {
        id: 1,
        name: "Ceylon Cinnamon Oil",
        badge: "Featured",
        origin: "Sri Lanka",
        grade: "Premium",
        price: "US $34.00",
        image: "/hero-bg.png",
        category: "Oils"
    },
    {
        id: 2,
        name: "Cinnamon Leaf Oil",
        badge: "Sale",
        origin: "Sri Lanka",
        grade: "Export",
        price: "US $28.00",
        image: "/hero-bg.png",
        category: "Oils"
    },
    {
        id: 3,
        name: "Ceylon Alba Sticks",
        badge: "Top Grade",
        origin: "Sri Lanka",
        grade: "Alba",
        price: "US $45.00",
        image: "/hero-bg.png",
        category: "Spices"
    },
    {
        id: 4,
        name: "Ceylon Quills (Premium)",
        badge: "Bestseller",
        origin: "Sri Lanka",
        grade: "Premium",
        price: "US $28.00",
        image: "/hero-bg.png",
        category: "Spices"
    },
    {
        id: 5,
        name: "Ceylon Cinnamon Powder",
        badge: "Fresh",
        origin: "Sri Lanka",
        grade: "Fine",
        price: "US $15.00",
        image: "/hero-bg.png",
        category: "Spices"
    },
    {
        id: 6,
        name: "Cinnamon Powder (Export)",
        badge: "Export",
        origin: "Sri Lanka",
        grade: "Export",
        price: "US $12.50",
        image: "/hero-bg.png",
        category: "Spices"
    }
];

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);

    const filteredProducts = activeCategory === "All"
        ? shopProducts
        : shopProducts.filter(p => p.category === activeCategory);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
            {/* HEADER */}
            <section className="bg-[#1a1a1a] text-white py-16 text-center">
                <div className="container px-4">
                    <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Shop Online</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold">Explore Our Collection</h1>
                </div>
            </section>

            {/* FILTERS & GRID */}
            <section className="py-12">
                <div className="container px-4">

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {["All", "Spices", "Oils", "Gifts"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                                    activeCategory === cat
                                        ? "bg-[#A05628] text-white shadow-md"
                                        : "bg-white text-[#4a4a4a] hover:bg-[#E8DCC6]"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-[2rem] p-4 relative shadow-sm hover:shadow-xl transition-all duration-300 group">

                                {/* Top Row: Badge & Heart */}
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-gray-100">
                                        {product.badge}
                                    </span>
                                    <button
                                        onClick={() => toggleFavorite(product.id)}
                                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100"
                                    >
                                        <Heart size={18} className={cn(favorites.includes(product.id) && "fill-current text-red-500")} />
                                    </button>
                                </div>

                                {/* Image Area */}
                                <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-[#F3EFE9]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="px-2">
                                    <h3 className="font-serif font-bold text-xl text-[#1a1a1a] mb-2">{product.name}</h3>
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wide">
                                        <span>Origin: {product.origin}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span>Grade: {product.grade}</span>
                                    </div>

                                    <div className="text-[#A05628] font-bold text-xl mb-6">
                                        {product.price}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <button className="flex items-center text-xs font-bold text-gray-500 hover:text-[#1a1a1a] uppercase tracking-wider transition-colors">
                                            <Eye size={16} className="mr-2" /> Quick View
                                        </button>
                                        <Button className="bg-[#1a1a1a] hover:bg-[#A05628] text-white rounded-full px-6 font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center">
                                            <ShoppingBag size={14} className="mr-2" /> Add to Cart
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

        </div>
    )
}
