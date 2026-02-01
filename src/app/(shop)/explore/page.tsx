"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag, ChevronRight, X, MessageCircle, Minus, Plus, ArrowRight, Trash2, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeritageMap } from "@/components/layout/heritage-map";

// Story Chapters
const storyChapters = [
    {
        id: "origin",
        title: "The Sacred Highlands",
        subtitle: "CHAPTER 01: ORIGIN",
        description: "Our journey begins in the mist-shrouded peaks of Southern Sri Lanka, where the unique lateralite soil and persistent humidity create the perfect cradle for Cinnamomum zeylanicum.",
        origin: "Southern Sri Lanka",
        image: "/explore/plantation.png",
        accent: "from-[#4A5D23]/30 to-transparent",
    },
    {
        id: "craft",
        title: "Mastery of the Quill",
        subtitle: "CHAPTER 02: THE CRAFT",
        description: "Generations of wisdom come together in the hands of our master peelers. Each sovereign quill is hand-rolled at the break of dawn, a delicate process that preserves the bark's precious essential oils.",
        origin: "Traditional Workshops",
        image: "/explore/artisan.png",
        accent: "from-[#8B4513]/30 to-transparent",
    },
    {
        id: "alchemy",
        title: "Essence of Pure Gold",
        subtitle: "CHAPTER 03: THE ALCHEMY",
        description: "Through precise steam distillation and alchemical cold-milling, we capture the pure soul of the spice, delivering unparalleled aroma and wellness benefits.",
        origin: "Distillation Vaults",
        image: "/explore/alchemy.png",
        accent: "from-[#D2B48C]/30 to-transparent",
    }
];

// Product Discovery Items
const products = [
    {
        id: "alba",
        name: "Ceylon Alba Sticks",
        grade: "ALBA",
        description: "The most prized grade of Ceylon cinnamon, known for its slender diameter and exceptional sweetness.",
        origin: "Southern Sri Lanka",
        image: "/products/cinnamon_powder_spoon.png",
        features: ["Ultra-Thin Quills", "Hand-Peeled", "Golden Hue"]
    },
    {
        id: "leaf-oil",
        name: "Cinnamon Leaf Oil",
        grade: "PURE LEAF",
        description: "Steam-distilled from the leaves, this oil offers a rich, clove-like aroma perfect for wellness and culinary use.",
        origin: "Matara Highlands",
        image: "/products/oil.png",
        features: ["High Eugenol", "Natural Distillation", "Sustainably Sourced"]
    },
    {
        id: "powder",
        name: "Ceylon Cinnamon Powder",
        grade: "EXTRA FINE",
        description: "Finely ground premium quills, delivering the authentic warmth and sweetness of Ceylon in a versatile form.",
        origin: "Ratnapura",
        image: "/products/cinnamon_powder_bowl.png",
        features: ["Micro-milled", "No Additives", "Coumarin-free"]
    },
    {
        id: "quills",
        name: "Ceylon Quills",
        grade: "CUSTOM",
        description: "Uniformly hand-filled quills that preserve the full aromatic profile of the inner bark.",
        origin: "Galle District",
        image: "/products/cinnamon_powder_spoon.png",
        features: ["Slow-Dried", "Hand-Filled", "Rich Aroma"]
    },
    {
        id: "export-powder",
        name: "Cinnamon Powder (Export)",
        grade: "EXPORT READY",
        description: "Optimized for global distribution, maintaining potency and flavor for industrial and retail partners.",
        origin: "Multi-Region",
        image: "/products/cinnamon_powder_bowl.png",
        features: ["Standardized Quality", "Sealed for Export", "Bulk Availability"]
    },
    {
        id: "bark-oil",
        name: "Cinnamon Bark Oil",
        grade: "PREMIUM BARK",
        description: "Extracted from the bark itself, this oil represents the pinnacle of cinnamon potency and complexity.",
        origin: "Southern Sri Lanka",
        image: "/products/oil.png",
        features: ["Intense Aroma", "High Purity", "Exclusive Reserve"]
    }
];

export default function ExplorePage() {
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
    const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);

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

            {/* Stage 1: The Narrative Arc (Vertical Scroll) */}
            <div className="relative z-20">
                {storyChapters.map((chapter, index) => (
                    <NarrativeSection key={chapter.id} chapter={chapter} index={index} />
                ))}
            </div>

            {/* Stage 2: The Sovereign Archive (Grid Layout) */}
            <div className="relative bg-[#050505] z-30 border-t border-white/5">
                <section className="py-40 text-center">
                    <div className="container px-4">
                        <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Stage II</span>
                        <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white leading-none tracking-tighter">
                            The <span className="italic text-white/30">Archive.</span>
                        </h2>
                    </div>
                </section>

                <div className="container px-4 pb-60">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelect={() => setSelectedProduct(product)}
                                onAddToCart={() => router.push('/contact')}
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
                        <section className="relative w-full h-full flex flex-col justify-center items-center py-32">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D2B48C]/20 to-transparent transition-opacity duration-1000" />

                            {/* Background Large Text Label */}
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 0.05, x: 0 }}
                                transition={{ duration: 1.5 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-serif font-light uppercase pointer-events-none select-none italic text-white/5 whitespace-nowrap"
                            >
                                Request Bulk Quote <ArrowRight size={48} className="inline ml-8 opacity-50" />
                            </motion.div>

                            <Button
                                onClick={() => setIsQualityModalOpen(true)}
                                variant="outline"
                                className="relative z-10 border-white/10 text-white/50 hover:bg-white/5 hover:text-white rounded-full h-20 px-12 text-[11px] font-bold uppercase tracking-[0.3em] bg-transparent transition-all"
                            >
                                Our Quality Process
                            </Button>
                        </section>

                        {/* Decorative cinematic light flare */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D2B48C]/10 via-transparent to-transparent pointer-events-none opacity-50" />
                        <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-[#D2B48C]/5 rounded-full blur-[120px] pointer-events-none" />
                    </motion.div>
                </div>
            </div >

            {/* THE HERITAGE MAP SECTION */}
            < section className="py-60 border-t border-white/5 bg-[#050505] relative z-20" >
                <div className="container px-4">
                    <div className="max-w-4xl border-l border-[#D2B48C]/30 pl-12 mb-32">
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">Geographic Provenance</span>
                        <h2 className="text-5xl md:text-8xl font-serif font-light mb-12 tracking-tighter">The Heartland <br /><span className="italic text-white/20">of Purity.</span></h2>
                        <p className="text-xl text-white/40 font-light italic font-serif leading-relaxed">
                            TAPROVIA cinnamon is cultivated exclusively within the humid micro-climates of the Southern Highlands, where the soil is enriched by centuries of organic sediment.
                        </p>
                    </div>
                    <HeritageMap />
                </div>
            </section >

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
                                setSelectedProduct(null);
                                router.push('/contact');
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

function NarrativeSection({ chapter, index }: { chapter: typeof storyChapters[0], index: number }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
                <Image src={chapter.image} alt={chapter.title} fill className="object-cover opacity-60 grayscale-[0.3]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className={cn("absolute inset-0 bg-gradient-to-tr", chapter.accent)} />
            </motion.div>

            <div className="container relative z-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
                    <motion.div style={{ y }}>
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">{chapter.subtitle}</span>
                        <h2 className="text-6xl md:text-8xl font-serif font-light text-white mb-10 leading-none tracking-tighter italic">{chapter.title}</h2>
                        <p className="text-xl md:text-2xl text-white/40 max-w-xl font-light leading-relaxed italic border-l border-[#D2B48C]/30 pl-8">
                            "{chapter.description}"
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                        className="hidden lg:flex flex-col items-center gap-6"
                    >
                        <div className="w-px h-64 bg-gradient-to-b from-transparent via-[#D2B48C]/30 to-transparent" />
                        <div className="flex items-center gap-4 text-[#D2B48C]">
                            <MapPin size={20} />
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">{chapter.origin}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product, onSelect, onAddToCart }: { product: typeof products[0], onSelect: () => void, onAddToCart?: () => void }) {
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
                    <MessageCircle size={14} className="mr-2" /> Enquire
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
                    <div className="bg-[#D2B48C]/20 border border-[#D2B48C]/30 rounded-full w-10 h-10 flex items-center justify-center text-[#D2B48C] text-[10px] font-bold">
                        ★ 5.0
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-[#D2B48C]" />
                        <span className="text-[#D2B48C] text-[9px] font-bold uppercase tracking-[0.4em]">{product.grade}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight tracking-tighter italic">
                        {product.name.split(' ').map((word, i) => (
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

function ProductModal({ product, onClose, onAddToCart }: { product: typeof products[0], onClose: () => void, onAddToCart?: () => void }) {
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
                            {product.features.map((feature, i) => (
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
                                <MessageCircle size={18} className="mr-4" /> Enquire
                            </Button>
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
