"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Discovery Chapters
const chapters = [
    {
        id: "origin",
        title: "The Sacred Highlands",
        subtitle: "CHAPTER 01: ORIGIN",
        description: "Our journey begins in the mist-shrouded peaks of Southern Sri Lanka, where the unique lateralite soil and persistent humidity create the perfect cradle for Cinnamomum zeylanicum.",
        image: "/explore/plantation.png",
        accent: "from-[#4A5D23]/20 to-transparent"
    },
    {
        id: "craft",
        title: "Mastery of the Quill",
        subtitle: "CHAPTER 02: THE CRAFT",
        description: "Generations of wisdom come together in the hands of our master peelers. Each sovereign quill is hand-rolled at the break of dawn, a delicate process that preserves the bark's precious essential oils.",
        image: "/explore/artisan.png",
        accent: "from-[#8B4513]/20 to-transparent"
    },
    {
        id: "alchemy",
        title: "Essence of Pure Gold",
        subtitle: "CHAPTER 03: THE ALCHEMY",
        description: "Through precise steam distillation and alchemical cold-milling, we capture the pure soul of the spice, delivering unparalleled aroma and wellness benefits.",
        image: "/explore/alchemy.png",
        accent: "from-[#D2B48C]/20 to-transparent"
    }
];

import { HeritageMap } from "@/components/layout/heritage-map";

export default function ExplorePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);
    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const springX = useSpring(x, physics);

    return (
        <div className="bg-[#050505] text-[#F3EFE9] selection:bg-[#D2B48C] selection:text-black font-sans overflow-x-hidden">

            {/* Horizontal Scroll Section */}
            <div ref={containerRef} className="relative h-[400vh]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                    {/* Progress Indicator HUD */}
                    <div className="fixed top-1/2 left-12 -translate-y-1/2 z-50 flex flex-col items-center gap-12 pointer-events-none">
                        <div className="h-40 w-px bg-white/5 relative">
                            <motion.div
                                style={{ scaleY: scrollYProgress, originY: 0 }}
                                className="absolute top-0 left-0 w-full bg-[#D2B48C]"
                            />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.8em] [writing-mode:vertical-lr] rotate-180 text-[#D2B48C]">
                            Discovery Journey
                        </span>
                    </div>

                    <motion.div
                        style={{ x: springX }}
                        className="flex h-full w-[300%]"
                    >
                        {chapters.map((chapter) => (
                            <section
                                key={chapter.id}
                                className="relative w-screen h-full flex flex-col justify-center px-12 md:px-32 lg:px-48 pt-96"
                            >
                                {/* Background Glow */}
                                <div className={cn("absolute inset-0 bg-gradient-to-tr transition-opacity duration-1000", chapter.accent)} />

                                {/* Background Large Text Label */}
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 0.05, x: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute top-1/2 right-12 -translate-y-1/2 text-[40vh] font-serif font-light uppercase pointer-events-none select-none italic text-white/5"
                                >
                                    {chapter.id}
                                </motion.div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
                                    {/* Visual Discovery Card */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative aspect-[4/5] rounded-[4rem] overflow-hidden group shadow-3xl border border-white/5"
                                    >
                                        <Image
                                            src={chapter.image}
                                            alt={chapter.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s] ease-out"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/20 to-transparent">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#D2B48C] flex items-center justify-center text-black shadow-lg">
                                                    <MapPin size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D2B48C] mb-1">Observation Pt</span>
                                                    <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none tracking-[0.2em]">Southern Highlands</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Narrative Content */}
                                    <div className="max-w-xl">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center gap-6 mb-12"
                                        >
                                            <span className="w-12 h-px bg-[#D2B48C]/30" />
                                            <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[10px]">
                                                {chapter.subtitle}
                                            </span>
                                        </motion.div>

                                        <motion.h2
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                            className="text-6xl md:text-8xl font-serif font-light leading-tight mb-12 italic"
                                        >
                                            {chapter.title}
                                        </motion.h2>

                                        <motion.p
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7, duration: 1 }}
                                            className="text-xl md:text-2xl text-white/40 font-light leading-relaxed mb-16 italic border-l border-[#D2B48C]/20 pl-8"
                                        >
                                            "{chapter.description}"
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 }}
                                            className="flex flex-col sm:flex-row items-center gap-10"
                                        >
                                            <Button className="w-full sm:w-auto h-20 px-12 rounded-full bg-[#D2B48C] text-black hover:bg-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all shadow-2xl hover:scale-105 active:scale-95 group">
                                                Enter Archive <ShoppingBag size={16} className="ml-4 group-hover:-translate-y-1 transition-transform" />
                                            </Button>
                                            <button className="flex items-center gap-4 group text-white/30 hover:text-white transition-colors">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">View Details</span>
                                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D2B48C] group-hover:translate-x-2 transition-all">
                                                    <ArrowRight size={16} />
                                                </div>
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* THE HERITAGE MAP SECTION */}
            <section className="py-60 border-t border-white/5 bg-[#050505] relative z-20">
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
            </section>

            {/* TRANSITION TO COMMERCE - DARK LUXURY VERSION */}
            <section className="py-60 relative z-20 overflow-hidden border-t border-white/5 bg-[#050505]">
                {/* Visual Anchor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D2B48C]/30 to-transparent" />

                <div className="container px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex justify-center gap-8 mb-16">
                            <Sparkles size={24} className="text-[#D2B48C] opacity-30" />
                        </div>
                        <h2 className="text-7xl md:text-[10rem] font-serif font-light mb-20 leading-none tracking-tighter">
                            From Soil <br /> To <span className="italic text-white/30">Sovereign.</span>
                        </h2>

                        <div className="mt-20">
                            <Button
                                asChild
                                className="bg-[#D2B48C] text-black hover:bg-white rounded-full h-24 px-20 text-[11px] font-bold uppercase tracking-[0.5em] transition-all hover:scale-105 shadow-3xl active:scale-95 group"
                            >
                                <a href="/products">
                                    Browse the Collection
                                    <MoveRight className="ml-6 group-hover:translate-x-2 transition-transform" size={20} />
                                </a>
                            </Button>
                            <p className="mt-12 text-white/20 text-[10px] font-bold uppercase tracking-[0.8em]">
                                The Undisputed Benchmark
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Background Text */}
                <div className="absolute bottom-20 right-10 text-[15vw] font-serif font-black text-white/[0.02] select-none pointer-events-none uppercase italic leading-none">
                    Purity.
                </div>
            </section>

            {/* Global Cinematic Filter HUD */}
            <div className="fixed bottom-12 right-12 z-50 text-white/5 select-none hidden xl:block pointer-events-none">
                <div className="flex gap-12 text-[9px] font-bold uppercase tracking-[0.8em] items-center">
                    <span>Ethically Harvested</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]/40" />
                    <span>Cold-Milled Process</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]/40" />
                    <span>Certified Export Quality</span>
                </div>
            </div>
        </div>
    );
}

// Fixed import for MoveRight if not in scope
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
