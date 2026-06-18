"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/actions/products";
import { ShoppingCart, Star, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const fallbackProducts = [
        {
            id: 1,
            name: "Ceylon Alba Sticks",
            grade: "Alba",
            image: "/products/cinnamon_powder_spoon.png",
            category: "Sticks",
            description: "The most prized grade of Ceylon cinnamon, known for its slender diameter and exceptional sweetness.",
            rating: 5.0,
            available: true,
        },
        {
            id: 2,
            name: "Cinnamon Leaf Oil",
            grade: "Pure Leaf Extract",
            image: "/products/oil.png",
            category: "Oils",
            description: "Steam-distilled from the leaves, this oil offers a rich, clove-like aroma perfect for wellness and culinary use.",
            rating: 4.9,
            available: true,
        },
        {
            id: 3,
            name: "Ceylon Cinnamon Powder",
            grade: "Extra Fine",
            image: "/products/cinnamon_powder_bowl.png",
            category: "Powders",
            description: "Finely ground premium quills, delivering the authentic warmth and sweetness of Ceylon in a versatile form.",
            rating: 4.8,
            available: false,
        },
        {
            id: 4,
            name: "Ceylon Quills",
            grade: "Custom Lengths",
            image: "/products/cinnamon_powder_spoon.png",
            category: "Sticks",
            description: "Uniformly hand-filled quills that preserve the full aromatic profile of the inner bark.",
            rating: 4.9,
            available: true,
        },
        {
            id: 5,
            name: "Cinnamon Powder (Bulk)",
            grade: "Export Ready",
            image: "/products/cinnamon_powder_bowl.png",
            category: "Powders",
            description: "Optimized for global distribution, maintaining potency and flavor for industrial and retail partners.",
            rating: 4.7,
            available: true,
        },
        {
            id: 6,
            name: "Cinnamon Bark Oil",
            grade: "Premium Bark Extract",
            image: "/products/oil.png",
            category: "Oils",
            description: "Extracted from the bark itself, this oil represents the pinnacle of cinnamon potency and complexity.",
            rating: 5.0,
            available: false,
        }
    ];

    const categories = ["All", "Sticks", "Oils", "Powders"];

    function ProductCard({ product, router, onQuickView }: { product: any; router: any; onQuickView: () => void }) {
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const mouseXSpring = useSpring(x);
        const mouseYSpring = useSpring(y);

        const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
        const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        const hoverImage = product.image.includes("spoon") || product.image.includes("bowl") 
            ? "/products/cinnamon_powder_bowl.png" 
            : product.image.includes("oil") 
                ? "/gallery/gallery-3.jpg" 
                : "/gallery/gallery-1.jpg";

        return (
            <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-xl hover:border-[#D2B48C]/50 transition-colors duration-500 flex flex-col"
            >
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden cursor-pointer" style={{ transform: "translateZ(30px)" }} onClick={onQuickView}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:opacity-0 transition-opacity duration-700"
                    />
                    <Image
                        src={hoverImage}
                        alt={product.name + " Alternate"}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-md text-gray-900 font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                            Quick View
                        </span>
                    </div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur border border-gray-100 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-800 w-fit">
                            {product.grade}
                        </span>
                        <span className={`px-3 py-1 bg-white/90 backdrop-blur border rounded-full text-[9px] font-bold uppercase tracking-widest w-fit ${
                            product.available 
                            ? "border-green-200 text-green-600" 
                            : "border-red-200 text-red-600"
                        }`}>
                            {product.available ? "Available" : "Unavailable"}
                        </span>
                    </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            <Star size={10} className="fill-[#D2B48C] text-[#D2B48C]" />
                            <span className="text-[10px] font-bold text-gray-700">{product.rating}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                        {product.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <Button 
                            onClick={() => router.push(`/contact?product=${encodeURIComponent(product.name)}`)}
                            className="w-full bg-[#D2B48C] hover:bg-[#b09673] text-white font-bold py-6 text-[10px] uppercase tracking-widest transition-all shadow-md group-hover:shadow-lg"
                        >
                            <ShoppingCart size={14} className="mr-2" /> Request Quote
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    function ProductQuickViewModal({ product, onClose, router }: { product: any; onClose: () => void; router: any }) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                >
                    <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-2 block">{product.category}</span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{product.name}</h2>
                            </div>
                            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-[#D2B48C]">
                                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-current" />)}
                            </div>
                            <span className="text-sm font-bold text-gray-600">{product.rating}</span>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed text-lg mb-8 text-justify">
                            {product.description}
                        </p>
                        
                        <div className="mt-auto space-y-4 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Availability</span>
                                <span className={`text-sm font-bold uppercase tracking-widest ${product.available ? "text-green-600" : "text-red-600"}`}>
                                    {product.available ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>
                            <Button 
                                onClick={() => router.push(`/contact?product=${encodeURIComponent(product.name)}`)}
                                className="w-full bg-[#D2B48C] hover:bg-[#b09673] text-white font-bold py-6 text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl"
                            >
                                <ShoppingCart size={18} className="mr-2" /> Request Wholesale Quote
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    export default function ProductsPage() {
        const router = useRouter();
        const [activeCategory, setActiveCategory] = useState("All");
        const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
        const [dbProducts, setDbProducts] = useState<any[]>([]);

        useEffect(() => {
            const fetchProducts = async () => {
                const fetched = await getProducts();
                if (fetched && fetched.length > 0) {
                    const mapped = fetched.map((p: any) => ({
                        id: p.id,
                        name: p.title || "Premium Cinnamon",
                        grade: p.grade || "Premium Grade",
                        image: (p.images && p.images.length > 0) ? p.images[0] : "/products/cinnamon_powder_spoon.png",
                        category: p.category || "Sticks",
                        description: p.description || "",
                        rating: 5.0,
                        available: p.status === 'active',
                    }));
                    setDbProducts(mapped);
                }
            };
            fetchProducts();
        }, []);

        const displayProducts = dbProducts.length > 0 ? dbProducts : fallbackProducts;

        const filteredProducts = activeCategory === "All"
            ? displayProducts
            : displayProducts.filter(p => p.category === activeCategory);

        return (
            <div className="bg-white min-h-screen text-gray-900 font-sans pb-24 pt-32">
                {/* Hero Section */}
                <div className="container px-4 mx-auto mb-16 text-center">
                    <span className="text-[#D2B48C] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                        Our Collection
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                        Premium Ceylon Spices
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Sourced directly from local plantations in Sri Lanka. Hand-harvested, premium grade, and certified pure.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="container px-4 mx-auto mb-16">
                    <div className="flex flex-wrap justify-center gap-3 relative">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-colors border ${
                                    activeCategory === cat 
                                        ? "text-white border-transparent" 
                                        : "bg-white text-gray-500 border-gray-200 hover:text-[#D2B48C]"
                                }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategoryBackground"
                                        className="absolute inset-0 bg-[#D2B48C] rounded-full z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="container px-4 mx-auto">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} router={router} onQuickView={() => setSelectedProduct(product)} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Quick View Modal */}
                <AnimatePresence>
                    {selectedProduct && (
                        <ProductQuickViewModal 
                            product={selectedProduct} 
                            onClose={() => setSelectedProduct(null)} 
                            router={router} 
                        />
                    )}
                </AnimatePresence>
            </div>
    );
}
