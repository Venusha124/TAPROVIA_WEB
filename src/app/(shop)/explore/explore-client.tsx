"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag, ChevronRight, X, Minus, Plus, ArrowRight, Trash2, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeritageMap } from "@/components/layout/heritage-map";

// Story Chapters
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

// Product Discovery Items
// Product Discovery Items (Fallback/Type definition)
// Remapping DB product to UI product type locally if needed, or just using 'any' for MVP
// Real implementation: we fetch from DB.



interface Product {
    id: string;
    name: string;
    grade: string;
    description: string;
    origin: string;
    image: string;
    features: string[];
    price: number;
    category: string;
}

export default function ExplorePageClient({ products }: { products: Product[] }) {
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");




    const categories = ["All", "Sticks", "Oils", "Powders", "Bulk & Exports"];

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-[#050505] text-[#F3EFE9] selection:bg-[#D2B48C] selection:text-black font-sans overflow-x-hidden">

            {/* Cinematic Hero Reveal */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')] opacity-[0.03] z-10 pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image src="/hero-bg.png" alt="Sovereign Background" fill className="object-contain grayscale" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />

                <div className="container relative z-20 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">TAPROVIA PRESENTS</span>
                        <h1 className="text-7xl md:text-[12rem] font-serif font-light leading-none mb-12 tracking-tighter">
                            The <span className="italic text-white/40">Explorer.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
                            "A cinematic descent into the geological and artisanal perfection of Ceylon."
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-white/20"
                >
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Descend to Begin</span>
                    <div className="w-px h-12 bg-white/20" />
                </motion.div>
            </section>

            {/* Stage 1: The Sovereign Prologue (Carousel) */}
            <PrologueCarousel />

            {/* Stage 2: The Sovereign Archive (Grid Layout) */}
            <div className="relative bg-[#050505] z-30 border-t border-white/5">
                <section className="py-40 text-center">
                    <div className="container px-4">
                        <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Stage II</span>
                        <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white leading-none tracking-tighter mb-12">
                            The <span className="italic text-white/30">Archive.</span>
                        </h2>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-4 mb-20">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
                                        activeCategory === cat
                                            ? "bg-[#D2B48C] text-black border-[#D2B48C]"
                                            : "bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="container px-4 pb-60">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelect={() => setSelectedProduct(product)}
                                onAddToCart={() => {
                                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                                    const existingItem = cart.find((item: any) => item.id === product.id);
                                    if (existingItem) {
                                        existingItem.quantity += 1;
                                    } else {
                                        cart.push({ ...product, quantity: 1 });
                                    }
                                    localStorage.setItem('cart', JSON.stringify(cart));
                                    router.push('/cart');
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Stage 3: The Sovereign Supply (Bulk Orders) */}
            <div className="relative bg-[#050505] z-30 border-t border-white/5">
                <section className="py-20 text-center">
                    <div className="container px-4">
                        <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Stage III</span>
                        <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white leading-none tracking-tighter">
                            Global <span className="italic text-white/30">Reach.</span>
                        </h2>
                    </div>
                </section>

                <div className="container px-4 pb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0A0A0A] border border-[#D2B48C]/20 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden group shadow-3xl"
                    >
                        <section className="relative w-full h-full flex flex-col justify-center items-center text-center py-32 px-4">
                            {/* Cinematic Background Glows */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#D2B48C]/5 via-transparent to-black/40" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D2B48C]/5 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                                <div>
                                    <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px] mb-6 block opacity-80">Global Distribution</span>
                                    <h3 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none tracking-tight">
                                        Bulk & <span className="italic text-white/40">Export.</span>
                                    </h3>
                                    <div className="w-12 h-px bg-[#D2B48C]/40 mx-auto my-8" />
                                    <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed font-serif italic max-w-2xl mx-auto">
                                        "Looking for wholesale quantities or private label packaging? We support global export with documentation and custom solutions."
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
                                    <Button
                                        onClick={() => router.push('/contact')}
                                        className="bg-[#D2B48C] text-black hover:bg-white rounded-full h-16 px-12 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_-5px_rgba(210,180,140,0.3)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
                                    >
                                        Request Bulk Quote
                                    </Button>
                                    <Button
                                        onClick={() => setIsQualityModalOpen(true)}
                                        variant="outline"
                                        className="border-white/10 text-white/40 hover:bg-white/5 hover:text-white rounded-full h-16 px-12 text-[11px] font-bold uppercase tracking-[0.3em] bg-transparent transition-all hover:border-white/20"
                                    >
                                        Our Quality Process
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Decorative cinematic light flare */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D2B48C]/10 via-transparent to-transparent pointer-events-none opacity-50" />
                        <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-[#D2B48C]/5 rounded-full blur-[120px] pointer-events-none" />
                    </motion.div>
                </div>
            </div >

            {/* ORIGIN INTELLIGENCE SECTION */}
            <section className="py-40 border-t border-white/5 bg-[#050505] relative z-20">
                <div className="container px-4">
                    <div className="max-w-4xl border-l border-[#D2B48C]/30 pl-12 mb-20">
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">Geographic Provenance</span>
                        <h2 className="text-5xl md:text-8xl font-serif font-light mb-12 tracking-tighter">The Heartland <br /><span className="italic text-white/20">of Purity.</span></h2>
                        <p className="text-xl text-white/40 font-light italic font-serif leading-relaxed">
                            TAPROVIA cinnamon is cultivated exclusively within the humid micro-climates of the Southern Highlands, where the soil is enriched by centuries of organic sediment.
                        </p>
                    </div>

                    <div className="relative w-full aspect-[2/1] bg-[#080808] rounded-[3rem] border border-white/5 overflow-hidden group">
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

                        {/* Top Left Label */}
                        <div className="absolute top-12 left-12 flex items-center gap-4 z-20">
                            <div className="w-12 h-px bg-[#D2B48C]" />
                            <span className="text-[#D2B48C] font-bold tracking-[0.4em] uppercase text-[10px]">Origin Intelligence</span>
                        </div>

                        {/* Matara Highlands Label */}
                        <div className="absolute bottom-12 right-12 text-right z-20">
                            <h3 className="text-4xl md:text-5xl font-serif text-white/10 font-bold leading-none tracking-tight group-hover:text-white/20 transition-colors duration-1000">
                                Matara <br /> Highlands.
                            </h3>
                        </div>

                        {/* Organic Paths & Markers */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 1000 500" preserveAspectRatio="none">
                            <motion.path
                                d="M0,400 C300,450 400,300 600,350 S900,200 1000,100"
                                fill="none"
                                stroke="#D2B48C"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                                className="opacity-30"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M200,100 C300,50 500,150 600,100 S900,400 1000,450"
                                fill="none"
                                stroke="#D2B48C"
                                strokeWidth="1"
                                strokeDasharray="10,10"
                                className="opacity-20"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.2 }}
                                transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Interactive Markers */}
                        <div className="absolute inset-0 z-10">
                            <OriginMarker x="30%" y="40%" label="Plantation A" delay={0.2} />
                            <OriginMarker x="55%" y="60%" label="Processing Unit" delay={0.6} />
                            <OriginMarker x="75%" y="30%" label="Export Hub" delay={1.0} />
                        </div>

                        {/* Cinematic Vignette */}
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            < section className="py-60 relative z-20 overflow-hidden border-t border-white/5 bg-[#050505]" >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D2B48C]/30 to-transparent" />
                <div className="container px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <h2 className="text-7xl md:text-[10rem] font-serif font-light mb-20 leading-none tracking-tighter">
                            From Soil <br /> To <span className="italic text-white/30">Sovereign.</span>
                        </h2>
                        <Button
                            onClick={() => router.push('/products')}
                            className="bg-[#D2B48C] text-black hover:bg-white rounded-full h-24 px-20 text-[11px] font-bold uppercase tracking-[0.5em] transition-all hover:scale-105 shadow-3xl active:scale-95 group"
                        >
                            Browse the Collection
                            <MoveRight className="ml-6 group-hover:translate-x-2 transition-transform" size={20} />
                        </Button>
                    </motion.div>
                </div>
                <div className="absolute bottom-20 right-10 text-[15vw] font-serif font-black text-white/[0.02] select-none pointer-events-none uppercase italic leading-none">
                    Purity.
                </div>
            </section >

            {/* Product Detail Modal */}
            <AnimatePresence>
                {
                    selectedProduct && (
                        <ProductModal
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                            onAddToCart={() => {
                                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                                const existingItem = cart.find((item: any) => item.id === selectedProduct.id);
                                if (existingItem) {
                                    existingItem.quantity += 1;
                                } else {
                                    cart.push({ ...selectedProduct, quantity: 1 });
                                }
                                localStorage.setItem('cart', JSON.stringify(cart));
                                setSelectedProduct(null);
                                router.push('/cart');
                            }}
                        />
                    )
                }
                {
                    isQualityModalOpen && (
                        <QualityProcessModal onClose={() => setIsQualityModalOpen(false)} />
                    )
                }
            </AnimatePresence >

            {/* Cinematic Filter HUD */}
            < div className="fixed bottom-12 right-12 z-50 text-white/5 select-none hidden xl:block pointer-events-none" >
                <div className="flex gap-12 text-[9px] font-bold uppercase tracking-[0.8em] items-center">
                    <span>Ethically Harvested</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]/40" />
                    <span>Cold-Milled Process</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]/40" />
                    <span>Certified Export Quality</span>
                </div>
            </div >
        </div >
    );
}

function PrologueCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Using a ref to prevent interval buildup if re-renders occur frequently
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startTimer = () => {
            timerRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % prologueSteps.length);
            }, 8000);
        };
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const nextSlide = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentIndex((prev) => (prev + 1) % prologueSteps.length);
    };

    const prevSlide = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentIndex((prev) => (prev - 1 + prologueSteps.length) % prologueSteps.length);
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center border-t border-white/5">
            {/* Background Transition */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={prologueSteps[currentIndex].image}
                        alt={prologueSteps[currentIndex].title}
                        fill
                        className="object-cover opacity-60 grayscale-[0.3]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </motion.div>
            </AnimatePresence>

            <div className="container relative z-10 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">
                                {prologueSteps[currentIndex].subtitle}
                            </span>
                            <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white mb-10 leading-none tracking-tighter">
                                {prologueSteps[currentIndex].title}
                            </h2>
                            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed italic">
                                "{prologueSteps[currentIndex].description}"
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation & Progress */}
            <div className="absolute bottom-12 right-12 flex items-center gap-12 z-20">
                <div className="flex gap-4">
                    <button onClick={prevSlide} className="text-white/30 hover:text-[#D2B48C] transition-colors">
                        <ArrowRight className="rotate-180" size={24} />
                    </button>
                    <button onClick={nextSlide} className="text-white/30 hover:text-[#D2B48C] transition-colors">
                        <ArrowRight size={24} />
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-[12px] font-bold text-[#D2B48C] tabular-nums">
                        {currentIndex + 1} <span className="text-white/20 mx-2">/</span> {prologueSteps.length}
                    </span>
                    <div className="w-24 h-px bg-white/10 relative overflow-hidden">
                        <motion.div
                            key={currentIndex}
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="absolute inset-0 bg-[#D2B48C]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}


function ProductCard({ product, onSelect, onAddToCart }: { product: Product, onSelect: () => void, onAddToCart?: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 bg-[#0A0A0A]"
        >
            {/* Background Image */}
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 z-20">
                <Button
                    onClick={() => onAddToCart?.()}
                    className="bg-[#D2B48C] text-black hover:bg-white rounded-full h-14 px-8 text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                >
                    <ShoppingCart size={14} className="mr-2" /> Add to Cart
                </Button>
                <button
                    onClick={onSelect}
                    className="flex items-center gap-2 text-white/70 hover:text-white text-[9px] font-bold uppercase tracking-[0.3em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75"
                >
                    <Info size={14} /> View Details
                </button>
            </div>

            {/* Content Labels */}
            <div className="absolute inset-0 p-10 flex flex-col z-10">
                {/* Top Badges */}
                <div className="flex flex-col gap-3 items-start">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/90">
                        {product.id === "alba" ? "HIGHEST GRADE" : product.id === "quills" ? "AROMATIC ESSENCE" : "PREMIUM RESERVE"}
                    </div>
                    <div className="bg-[#D2B48C]/20 border border-[#D2B48C]/30 rounded-full w-auto h-10 px-4 flex items-center justify-center text-[#D2B48C] text-[10px] font-bold gap-2">
                        <span>${product.price ? product.price.toFixed(2) : "0.00"}</span>
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-[#D2B48C]" />
                        <span className="text-[#D2B48C] text-[9px] font-bold uppercase tracking-[0.4em]">{product.grade}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight tracking-tighter italic">
                        {product.name.split(' ').map((word: string, i: number) => (
                            <React.Fragment key={i}>
                                {word} {i === 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
}





function QualityProcessModal({ onClose }: { onClose: () => void }) {
    const qualitySteps = [
        {
            title: "Global Compliance",
            desc: "ISO 22000 & SLSI certified export documentation and phytosanitary guarantees for all major continents.",
            icon: "01"
        },
        {
            title: "Bespoke Packaging",
            desc: "Private label solutions with premium materials that preserve the essential oil integrity during transit.",
            icon: "02"
        },
        {
            title: "Logistics Excellence",
            desc: "Dedicated temperature-controlled shipping lanes to maintain the Sovereign moisture profile of the quills.",
            icon: "03"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl bg-[#0A0A0A] rounded-[4rem] border border-[#D2B48C]/10 overflow-hidden shadow-3xl"
            >
                <div className="p-16 md:p-24">
                    <div className="mb-16">
                        <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">The Sovereign Standard</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white italic tracking-tighter">Bulk & Export <br /><span className="text-white/30">Process.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {qualitySteps.map((step, i) => (
                            <div key={i} className="relative p-10 bg-white/5 rounded-3xl border border-white/5 hover:border-[#D2B48C]/30 transition-all group">
                                <span className="text-[4rem] font-serif text-white/5 absolute -top-4 -left-2">{step.icon}</span>
                                <h3 className="text-xl font-bold text-[#D2B48C] mb-6 tracking-wide uppercase text-[12px]">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed font-light">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">99% Purity Guaranteed • Global Distribution</p>
                        <Button
                            onClick={onClose}
                            className="bg-[#D2B48C] text-black hover:bg-white rounded-full h-16 px-10 text-[10px] font-bold uppercase tracking-[0.3em]"
                        >
                            Return to Journey
                        </Button>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-12 right-12 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all transform hover:rotate-90"
                >
                    <X size={20} />
                </button>
            </motion.div>
        </motion.div>
    );
}


function OriginMarker({ x, y, label, delay }: { x: string, y: string, label: string, delay: number }) {
    return (
        <motion.div
            style={{ left: x, top: y }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/marker cursor-pointer"
        >
            <div className="relative flex items-center justify-center w-12 h-12">
                <div className="absolute inset-0 bg-[#D2B48C]/20 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-0 bg-[#D2B48C]/10 rounded-full border border-[#D2B48C]/30 transition-all duration-500 group-hover/marker:scale-150 group-hover/marker:bg-[#D2B48C]/20" />
                <MapPin size={16} className="text-[#D2B48C] relative z-10" />
            </div>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <span className="text-[#D2B48C] text-[9px] font-bold uppercase tracking-[0.2em] bg-black/80 px-3 py-1 rounded-full border border-white/10">
                    {label}
                </span>
            </div>
        </motion.div>
    );
}

function ProductModal({ product, onClose, onAddToCart }: { product: Product, onClose: () => void, onAddToCart?: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-[4rem] border border-white/10 overflow-hidden shadow-3xl"
            >
                <div className="p-16 md:p-24 flex flex-col md:grid md:grid-cols-2 gap-16">
                    <div>
                        <span className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">{product.grade} SPECIFICATION</span>
                        <h2 className="text-5xl font-serif text-white mb-8">{product.name}</h2>
                        <div className="space-y-6">
                            {product.features.map((feature: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 text-white/40 border-b border-white/5 pb-4">
                                    <ChevronRight size={14} className="text-[#D2B48C]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 flex flex-col gap-6">
                            <Button
                                onClick={onAddToCart}
                                className="w-full bg-[#D2B48C] text-black hover:bg-white rounded-full h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
                            >
                                <ShoppingCart size={18} className="mr-4" /> Add to Cart
                            </Button>
                            <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D2B48C] block mb-4">Price</span>
                                <span className="text-3xl font-serif text-white italic">${product.price ? product.price.toFixed(2) : "0.00"}</span>
                            </div>
                            <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D2B48C] block mb-4">Availability</span>
                                <span className="text-xl font-serif text-white italic">Direct Sovereign Supply</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-12 right-12 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all transform hover:rotate-90"
                >
                    <X size={20} />
                </button>
            </motion.div>
        </motion.div>
    );
}

function MoveRight({ className, size }: { className?: string, size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
        </svg>
    );
}
