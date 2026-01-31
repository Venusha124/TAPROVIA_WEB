"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Heart,
    MessageCircle,
    ArrowRight,
    Share2,
    Star,
    Leaf,
    Sparkles,
    MoveRight,
    Layers,
    Compass,
    CheckCircle2,
    Quote,
    ShoppingCart,
    PhoneCall
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
    {
        id: 1,
        name: "Artisan Cinnamon Oil",
        badge: "The Alchemist's Choice",
        origin: "Southern Sri Lanka",
        grade: "Ultra-Premium Bark Oil",
        price: "Enquire for Price",
        image: "/products/oil.png",
        category: "Oils",
        description: "Double-distilled for maximum purity and aromatic depth. A treasure for connoisseurs.",
        rating: 5.0,
        reviews: 24,
        scale: 1.2,
        parallax: -40,
        features: ["99.8% Purity", "Cold Distilled", "Single Origin"]
    },
    {
        id: 2,
        name: "Vintage Alba Quills",
        badge: "Master Grade",
        origin: "Matara Highlands",
        grade: "Alba (The Sovereign)",
        price: "US $48.50",
        image: "/products/oil.png",
        category: "Sticks",
        description: "Thinly peeled, golden quills with a sweet, refined profile rarely found in commercial markets.",
        rating: 4.9,
        reviews: 142,
        scale: 1,
        parallax: 60,
        features: ["Zero Additives", "Sun-Dried", "Hand-Rolled"]
    },
    {
        id: 3,
        name: "TAPROVIA Legacy Set",
        badge: "The Archive",
        origin: "Multi-Region",
        grade: "Curated Selection",
        price: "US $120.00",
        image: "/products/gift-set.png",
        category: "Bulk & Exports",
        description: "A hand-crafted mahogany box containing our three flagship offerings. The ultimate expression of Ceylon.",
        rating: 5.0,
        reviews: 56,
        scale: 1.1,
        parallax: -80,
        features: ["Limited Edition", "Custom Engraving", "Global Shipping"]
    },
    {
        id: 4,
        name: "High-Alt Cinnamon Powder",
        badge: "Chef's Treasure",
        origin: "Ratnapura",
        grade: "Extra Fine (A++)",
        price: "US $22.00",
        image: "/products/oil.png", // Fallback to oil if powder missing
        category: "Powders",
        description: "Ground to a silk-like consistency using cold-milling technology to preserve volatile oils.",
        rating: 4.8,
        reviews: 89,
        scale: 0.9,
        parallax: 30,
        features: ["Micro-milled", "Air-tight Glass", "High Eugenol"]
    }
];

const testimonials = [
    {
        name: "Jean-Pierre Laurent",
        role: "Head Pastry Chef, Paris",
        content: "The aromatic complexity of TAPROVIA's Alba quills is unlike anything I've encountered in 20 years. It's not just a spice; it's a foundation for our desserts.",
        avatar: "/testimonials/chef1.png"
    },
    {
        name: "Sarah Chen",
        role: "Wellness Consultant, Singapore",
        content: "We use the Artisan Oil for our bespoke aromatherapy blends. The purity level is verified at 99%, which is essential for our clinical work.",
        avatar: "/testimonials/chef2.png"
    },
    {
        name: "Michael Ross",
        role: "Luxury Retail Buyer, London",
        content: "TAPROVIA is the Bentley of cinnamon. The packaging, the story, and the unparalleled quality make it our top-performing premium spice.",
        avatar: "/testimonials/chef3.png"
    }
];

const categories = ["All", "Sticks", "Oils", "Powders", "Bulk & Exports"];

type Product = (typeof products)[0];

const prologueSteps = [
    {
        id: "origin",
        title: "The Primordial Soil",
        subtitle: "CHAPTER I",
        description: "In the Southern Highlands of Sri Lanka, the red lateralite soil holds a secret—the highest concentration of Eugenol ever recorded in Cinnamomum zeylanicum.",
        image: "/explore/plantation.png"
    },
    {
        id: "timing",
        title: "The Dawn Rhythm",
        subtitle: "CHAPTER II",
        description: "The bark is most elastic at the break of dawn. Our artisans begin their work before the sun touches the hills, capturing the sap at its peak vitality.",
        image: "/explore/artisan.png"
    },
    {
        id: "purity",
        title: "The Alchemical Purity",
        subtitle: "CHAPTER III",
        description: "Beyond the harvest lies the vault. Through precise steam distillation, we extract the essence—a liquid gold that transcends mere spice.",
        image: "/explore/alchemy.png"
    }
];

const hotspots = [
    {
        id: "soil",
        x: "30%",
        y: "40%",
        title: "Mineral Rich Terroir",
        label: "GEOLOGY",
        description: "Deep lateralite layers rich in iron and minerals."
    },
    {
        id: "peeling",
        x: "70%",
        y: "60%",
        title: "The 45° Intuition",
        label: "MASTERY",
        description: "A technique passed through bloodlines, never written."
    }
];

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    const toggleFavorite = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    return (
        <div ref={containerRef} className="relative bg-[#050505] text-[#F3EFE9] min-h-screen font-sans selection:bg-[#D2B48C] selection:text-black overflow-x-hidden">
            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

            {/* --- 1. THE SOVEREIGN PROLOGUE (VERTICAL REVEAL) --- */}
            <div className="relative z-10">
                {prologueSteps.map((step, index) => (
                    <PrologueSection key={step.id} step={step} index={index} total={prologueSteps.length} />
                ))}
            </div>

            {/* --- 2. THE SOVEREIGN GALLERY (ASYMMETRICAL) --- */}
            <div className="relative z-20 bg-[#050505]">
                {/* Gallery Hero */}
                <section className="relative py-60 overflow-hidden border-t border-white/5">
                    <div className="container px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="flex justify-center gap-6 mb-12">
                                <span className="w-12 h-px bg-[#D2B48C]/30 my-auto" />
                                <span className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px]">The Archive</span>
                                <span className="w-12 h-px bg-[#D2B48C]/30 my-auto" />
                            </div>
                            <h2 className="text-7xl md:text-[10rem] font-serif font-light leading-none mb-12 tracking-tighter">
                                The <span className="italic text-white/40">Gallery.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
                                "Observations of geological perfection, curated for the refined palate."
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filter Bar (Sticky) */}
                <section className="sticky top-0 z-[60] py-8 border-y border-white/5 backdrop-blur-3xl bg-black/60">
                    <div className="container px-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "relative px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all",
                                        activeCategory === cat ? "text-black bg-[#D2B48C]" : "text-white/30 hover:text-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Asymmetrical Gallery Grid */}
                <section className="py-40 relative">
                    <div className="container px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-60 lg:gap-x-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <GalleryItem
                                        key={product.id}
                                        product={product}
                                        index={index}
                                        isFavorite={favorites.includes(product.id)}
                                        onToggleFavorite={toggleFavorite}
                                        onSelect={() => setSelectedProduct(product)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Testimonials Segment */}
                <TestimonialsSection />

                {/* Heritage Deep-Dive Spotlight */}
                <HeritageDeepDive />

                {/* Concierge CTA */}
                <section className="py-60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D2B48C]/5 to-transparent pointer-events-none" />
                    <div className="container px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="max-w-4xl mx-auto p-24 rounded-[5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D2B48C]/30 to-transparent" />
                            <h2 className="text-5xl md:text-7xl font-serif font-light mb-12 italic">The Custom Reserve.</h2>
                            <p className="text-xl text-white/30 font-light mb-16 max-w-xl mx-auto leading-relaxed">
                                For enterprise partners requiring bespoke grades, white-labeling, or strategic logistics optimization.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button className="bg-[#D2B48C] hover:bg-white text-black font-bold h-24 px-16 rounded-full text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                                    <PhoneCall className="mr-4 group-hover:rotate-12 transition-transform" size={18} />
                                    Speak with Concierge
                                </Button>
                                <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors group flex items-center gap-4">
                                    View Export Grades
                                    <MoveRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* --- 3. THE VAULT (DETAIL EXPANSION) --- */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/98 backdrop-blur-3xl cursor-pointer"
                        />

                        <motion.div
                            layoutId={`gallery-${selectedProduct.id}`}
                            className="relative w-full max-w-7xl aspect-[16/9] bg-[#0A0A0A] rounded-[4rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                        >
                            {/* Left: Cinematic Image with Zoom */}
                            <div className="w-full md:w-1/2 relative overflow-hidden group">
                                <motion.div
                                    layoutId={`image-${selectedProduct.id}`}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
                                    />
                                </motion.div>
                                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                                    <div className="flex items-center gap-2 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={cn("fill-[#D2B48C] text-[#D2B48C]", i >= Math.floor(selectedProduct.rating) && "opacity-20")} />
                                        ))}
                                        <span className="text-xs font-bold text-white ml-2">{selectedProduct.rating} / 5.0</span>
                                        <span className="text-white/20 text-xs ml-2">({selectedProduct.reviews} reviews)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedProduct.features.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                                <CheckCircle2 size={12} className="text-[#D2B48C]" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: The Data Vault */}
                            <div className="w-full md:w-1/2 p-16 md:p-24 flex flex-col justify-center relative">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-12 right-12 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#D2B48C] transition-all"
                                >
                                    <ArrowRight className="rotate-180" size={24} />
                                </button>

                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block"
                                >
                                    {selectedProduct.badge} • {selectedProduct.category}
                                </motion.span>
                                <h2 className="text-6xl md:text-8xl font-serif font-light text-white mb-10">{selectedProduct.name}</h2>
                                <p className="text-xl text-white/30 font-light leading-relaxed mb-12 italic border-l-2 border-[#D2B48C]/20 pl-8">
                                    "{selectedProduct.description}"
                                </p>

                                <div className="grid grid-cols-2 gap-12 mb-16 border-t border-white/5 pt-12">
                                    <div>
                                        <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Engagement Model</span>
                                        <span className="text-2xl font-serif text-white uppercase">Sovereign Direct</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Provenance Price</span>
                                        <span className="text-2xl font-serif text-[#D2B48C] uppercase">{selectedProduct.price}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Button className="w-full bg-[#D2B48C] hover:bg-white text-black font-bold h-24 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all group shadow-xl">
                                        <ShoppingCart className="mr-4 group-hover:-translate-y-1 transition-transform" size={18} />
                                        Acquire from Collection
                                    </Button>
                                    <Button variant="outline" className="w-full border-white/10 hover:border-[#D2B48C] hover:bg-transparent text-white font-bold h-20 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all">
                                        Request Custom Spec Sheet
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Global Action */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-12 right-12 z-[500] flex items-center gap-4"
            >
                <div className="px-8 py-4 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center gap-6">
                    <div className="flex -space-x-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-tr from-[#D2B48C]/30 to-black flex items-center justify-center text-[10px] text-white/50">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Global Desk</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-[0.2em]">Active Concierge</span>
                        </div>
                    </div>
                </div>
                <button className="w-16 h-16 rounded-full bg-[#D2B48C] text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
                    <MessageCircle size={24} />
                </button>
            </motion.div>
        </div>
    );
}

function PrologueSection({ step, index, total }: { step: typeof prologueSteps[0], index: number, total: number }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
                <Image src={step.image} alt={step.title} fill className="object-cover opacity-60 grayscale-[0.3]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </motion.div>

            <div className="container relative z-10 px-4 pt-48">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                        className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block"
                    >
                        {step.subtitle}
                    </motion.span>
                    <motion.h2
                        style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
                        className="text-6xl md:text-[8rem] font-serif font-light text-white mb-10 leading-none tracking-tighter"
                    >
                        {step.title}
                    </motion.h2>
                    <motion.p
                        style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                        className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed italic"
                    >
                        "{step.description}"
                    </motion.p>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
                <span className="text-[10px] font-bold text-white/10 uppercase [writing-mode:vertical-lr]">{index + 1} / {total}</span>
                <div className="w-px h-24 bg-white/5 relative">
                    <motion.div style={{ scaleY: scrollYProgress, originY: 0 }} className="absolute inset-0 bg-[#D2B48C]" />
                </div>
            </div>
        </section>
    );
}

function GalleryItem({ product, index, isFavorite, onToggleFavorite, onSelect }: {
    product: Product,
    index: number,
    isFavorite: boolean,
    onToggleFavorite: (e: React.MouseEvent, id: number) => void,
    onSelect: () => void
}) {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, product.parallax]);
    const springY = useSpring(y, { damping: 20, stiffness: 40 });

    const isLarge = index % 3 === 0;

    return (
        <motion.div
            ref={itemRef}
            layoutId={`gallery-${product.id}`}
            style={{ y: springY }}
            className={cn(
                "relative group cursor-pointer",
                isLarge ? "lg:col-span-8" : "lg:col-span-4",
                index % 5 === 0 && "lg:-mt-40"
            )}
            onClick={onSelect}
        >
            <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden bg-white/5 border border-white/5 shadow-3xl">
                <motion.div layoutId={`image-${product.id}`} className="w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
                    />
                </motion.div>

                {/* Visual Feedback Badges */}
                <div className="absolute top-12 left-12 flex flex-col gap-3">
                    <span className="px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                        {product.badge}
                    </span>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2B48C]/10 backdrop-blur-md border border-[#D2B48C]/30 self-start">
                        <Star size={10} className="fill-[#D2B48C] text-[#D2B48C]" />
                        <span className="text-[9px] font-bold text-[#D2B48C] tracking-widest">{product.rating}</span>
                    </div>
                </div>

                {/* Interaction Overlay */}
                <div className="absolute top-12 right-12 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button
                        onClick={(e) => onToggleFavorite(e, product.id)}
                        className={cn(
                            "w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all",
                            isFavorite ? "bg-red-500/20 border-red-500 text-red-500" : "bg-black/40 border-white/10 text-white hover:border-[#D2B48C]"
                        )}
                    >
                        <Heart size={18} className={cn(isFavorite && "fill-current")} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:border-[#D2B48C] transition-all">
                        <Share2 size={18} />
                    </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="w-8 h-px bg-[#D2B48C]/50" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D2B48C]">
                            {product.grade}
                        </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 transform group-hover:translate-x-4 transition-transform duration-700">
                        {product.name}
                    </h3>
                    <div className="flex justify-between items-center py-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Observation Unit</span>
                            <span className="text-xl font-serif text-white/70 tracking-tight">{product.price}</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Examine Detail</span>
                            <div className="w-14 h-14 rounded-full bg-[#D2B48C] flex items-center justify-center text-black shadow-xl transform group-hover:rotate-[360deg] transition-all duration-1000">
                                <MoveRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function TestimonialsSection() {
    return (
        <section className="py-60 relative overflow-hidden bg-white/[0.01]">
            <div className="container px-4">
                <div className="text-center mb-40">
                    <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[11px] mb-8 block">Voice of Connoisseurs</span>
                    <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white leading-none tracking-tighter italic">Global Credibility.</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0 hidden lg:block" />
                    {testimonials.map((test, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-black/40 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/5 relative z-10 hover:bg-white/[0.03] transition-colors group"
                        >
                            <Quote className="text-[#D2B48C] mb-12 opacity-30 group-hover:opacity-100 transition-opacity" size={40} />
                            <p className="text-2xl text-white/50 font-light leading-relaxed mb-16 italic">
                                "{test.content}"
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D2B48C]/50 to-transparent border border-white/10 flex items-center justify-center relative grayscale group-hover:grayscale-0 transition-all">
                                    <span className="text-xl font-serif text-white">{test.name[0]}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-serif text-xl">{test.name}</span>
                                    <span className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-widest mt-1 opacity-60">{test.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HeritageDeepDive() {
    return (
        <section className="py-60 relative overflow-hidden bg-black mt-40 border-y border-white/5">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/explore/plantation.png')] bg-cover bg-fixed grayscale pointer-events-none" />
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <div className="container relative z-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div>
                        <span className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Terroir Intelligence</span>
                        <h2 className="text-6xl md:text-8xl font-serif font-light text-white mb-12">Secrets of the <br /><span className="italic">Southern Highlands.</span></h2>
                        <div className="space-y-12">
                            {hotspots.map((spot) => (
                                <div key={spot.id} className="group cursor-default">
                                    <div className="flex items-center gap-8 mb-4">
                                        <div className="w-12 h-12 rounded-full border border-[#D2B48C]/30 flex items-center justify-center text-[#D2B48C] group-hover:bg-[#D2B48C] group-hover:text-black transition-all">
                                            <Sparkles size={16} />
                                        </div>
                                        <h4 className="text-2xl font-serif text-white uppercase tracking-tight">{spot.title}</h4>
                                    </div>
                                    <p className="text-white/30 text-lg font-light pl-20 leading-relaxed italic border-l border-white/5 ml-6">
                                        {spot.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-square">
                        <div className="absolute inset-0 rounded-[5rem] border border-white/5 bg-gradient-to-tr from-[#D2B48C]/10 to-transparent" />
                        <div className="absolute inset-20 rounded-[4rem] overflow-hidden border border-white/10">
                            <Image src="/explore/alchemy.png" alt="Pure Extraction" fill className="object-cover" />
                        </div>
                        {/* Interactive UI elements floating */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-10 -right-10 p-12 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem]"
                        >
                            <span className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-widest block mb-4">Yield Quality</span>
                            <span className="text-4xl font-serif text-white">99.8%</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest block mt-2">Purity Gradient</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
