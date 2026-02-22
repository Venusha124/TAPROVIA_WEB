"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, MoveRight, Leaf, Sparkles, Droplets, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RotatingBackground } from "@/components/layout/RotatingBackground";
import { cn } from "@/lib/utils";
import { WalaaKuluLogo } from "@/components/ui/WalaaKuluLogo";

const galleryImages = [
    {
        id: 10,
        title: "The Highland Ritual",
        category: "Harvest",
        image: "/hero-bg-3.png",
        span: "md:col-span-2 md:row-span-2"
    },
    {
        id: 1,
        title: "Artisanal Quills",
        category: "Products",
        image: "/explore/quills.png",
        span: "md:col-span-1 md:row-span-1"
    },
    {
        id: 4,
        title: "The Golden Drop",
        category: "Products",
        image: "/explore/oil-pour.png",
        span: "md:col-span-1 md:row-span-2"
    },
    {
        id: 2,
        title: "Steam Distillation",
        category: "Artisans",
        image: "/explore/alchemy.png",
        span: "md:col-span-1 md:row-span-1"
    },
    {
        id: 5,
        title: "Sovereign Estate",
        category: "Harvest",
        image: "/explore/plantation.png",
        span: "md:col-span-2 md:row-span-1"
    },
    {
        id: 3,
        title: "Morning Harvest",
        category: "Harvest",
        image: "/explore/artisan.png",
        span: "md:col-span-1 md:row-span-1"
    },
    {
        id: 6,
        title: "Cinnamon Rituals",
        category: "Artisans",
        image: "/explore/oil-lifestyle.png",
        span: "md:col-span-1 md:row-span-1"
    },
    {
        id: 9,
        title: "Traditional Extraction",
        category: "Artisans",
        image: "/explore/alchemy.png",
        span: "md:col-span-1 md:row-span-1"
    }
];

const tourLocations = [
    {
        id: "highlands",
        title: "The Highlands",
        image: "/hero-bg-2.png",
        altitude: "420m",
        terroir: "Laterite",
        desc: "Sovereign Harvest Zone"
    },
    {
        id: "distillery",
        title: "The Distillery",
        image: "/explore/alchemy.png",
        altitude: "0m",
        terroir: "Controlled",
        desc: "Alchemy of Essence"
    },
    {
        id: "collection",
        title: "The Collection",
        image: "/explore/quills.png",
        altitude: "2m",
        terroir: "Archival",
        desc: "The Sovereign Gallery"
    }
];

export default function GalleryPage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isTourActive, setIsTourActive] = useState(false);
    const [currentTourIndex, setCurrentTourIndex] = useState(0);
    const [mouseX, setMouseX] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isTourActive) return;
        const { clientX } = e;
        const { innerWidth } = window;
        // Map mouse position to a percentage (-50% to 50%)
        const xPos = (clientX / innerWidth - 0.5) * 100;
        setMouseX(xPos);
    };

    const selectedImage = galleryImages.find(img => img.id === selectedId);

    return (
        <div className="bg-[#050505] text-[#F3EFE9] min-h-screen selection:bg-[#D2B48C] selection:text-black">
            {/* Cinematic Filmgrain Overlay - Reduced opacity for performance */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

            {/* --- HERO SECTION --- (Adjusted height to prevent clipping) */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <RotatingBackground
                    images={["/hero-bg-3.png", "/explore/plantation.png"]}
                    opacity={0.3}
                    showGradient={true}
                />
                <div className="container relative z-10 px-4 text-center pt-32 md:pt-48">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-flex items-center gap-8 text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12">
                            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D2B48C]/30" />
                            Visual Archive
                            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D2B48C]/30" />
                        </span>
                        <h1 className="text-7xl md:text-[12rem] font-serif font-light leading-none mb-12 tracking-tighter">
                            The <span className="italic text-white/40 hover:text-[#D2B48C] transition-colors duration-500 cursor-default">Observations.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
                            "A cinematic observation of geological perfection and artisanal ritual."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- ASYMMETRICAL GRID --- */}
            <section className="py-24 md:py-40">
                <div className="container max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-flow-row-dense gap-6 md:gap-10">
                        <AnimatePresence mode="popLayout">
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.02 }}
                                    className={cn(
                                        "relative group cursor-pointer overflow-hidden bg-white/[0.02] border border-white/[0.03] transition-all duration-700",
                                        img.span
                                    )}
                                    onClick={() => setSelectedId(img.id)}
                                >
                                    <div className="relative w-full h-full min-h-[400px] aspect-auto">
                                        <Image
                                            src={img.image}
                                            alt={img.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                                        />

                                        {/* Subtle Vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                                        {/* Minimal Indicator */}
                                        <div className="absolute inset-x-8 bottom-8 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                            <div className="flex items-center gap-4">
                                                <div className="h-px w-8 bg-[#D2B48C]" />
                                                <p className="text-[9px] text-white/50 uppercase tracking-[0.4em] font-bold">
                                                    Perspective 0{idx + 1}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                                            <Maximize2 size={14} className="text-white/40" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* --- LIGHTBOX / VIEWER (SIMPLIFIED) --- */}
            <AnimatePresence>
                {selectedId && selectedImage && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
                            layoutId={`gallery-item-${selectedId}`}
                            className="relative w-full max-w-6xl aspect-[4/5] md:aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-8 right-8 z-[110] w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:rotate-90"
                            >
                                <X size={24} />
                            </button>

                            <Image
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                fill
                                className="object-contain md:object-cover"
                                priority
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- CALL TO ACTION (360 VIRTUAL TOUR) --- */}
            <section
                className="relative h-screen flex items-center justify-center overflow-hidden border-t border-white/5 cursor-crosshair"
                onMouseMove={handleMouseMove}
            >
                {/* 360 Panorama Image - Wide-screen panning logic */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tourLocations[currentTourIndex].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-[200%] h-full flex"
                    >
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            animate={{ x: isTourActive ? `${-mouseX * 0.5}%` : "0%" }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        >
                            <Image
                                src={tourLocations[currentTourIndex].image}
                                alt={tourLocations[currentTourIndex].title}
                                fill
                                className={cn(
                                    "object-cover transition-all duration-[2s]",
                                    isTourActive ? "opacity-60 scale-110 grayscale-0" : "opacity-40 grayscale scale-100"
                                )}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Cinematic Gradient Overlays */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />

                <div className="container relative z-20 px-4 text-center">
                    <AnimatePresence mode="wait">
                        {!isTourActive ? (
                            <motion.div
                                key="static"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-12"
                            >
                                <WalaaKuluLogo className="scale-125 mb-12" />
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsTourActive(true)}
                                    className="group h-auto py-6 px-12 rounded-full border border-white/10 hover:border-[#D2B48C] hover:bg-[#D2B48C]/5 transition-all duration-700"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <Compass className="w-8 h-8 text-[#D2B48C] group-hover:rotate-[360deg] transition-transform duration-[2s]" />
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D2B48C]">Begin Exploration</span>
                                            <span className="text-[7px] uppercase tracking-[0.2em] text-[#D2B48C]/50 italic">360° Virtual Experience</span>
                                        </div>
                                    </div>
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="active"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-between py-20 pointer-events-none"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#D2B48C]">Observation Point 0{currentTourIndex + 1}</span>
                                        <h3 className="text-2xl md:text-3xl font-serif italic text-white">{tourLocations[currentTourIndex].title}</h3>
                                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent" />
                                    </div>

                                    {/* Location Switcher */}
                                    <div className="flex gap-4 pointer-events-auto mt-4">
                                        {tourLocations.map((loc, idx) => (
                                            <button
                                                key={loc.id}
                                                onClick={() => setCurrentTourIndex(idx)}
                                                className={cn(
                                                    "w-12 h-1 rounded-full transition-all duration-700",
                                                    currentTourIndex === idx ? "bg-[#D2B48C]" : "bg-white/10 hover:bg-white/30"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex items-center gap-12 text-white/40">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[8px] uppercase tracking-widest font-bold">Altitude</span>
                                            <span className="font-serif italic text-lg text-white">{tourLocations[currentTourIndex].altitude}</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[8px] uppercase tracking-widest font-bold">Azimuth</span>
                                            <span className="font-serif italic text-lg text-white">{Math.round((mouseX + 50) * 3.6)}°</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[8px] uppercase tracking-widest font-bold">Terroir</span>
                                            <span className="font-serif italic text-lg text-white">{tourLocations[currentTourIndex].terroir}</span>
                                        </div>
                                    </div>
                                    <p className="text-[9px] uppercase tracking-[0.6em] text-white/20">{tourLocations[currentTourIndex].desc}</p>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsTourActive(false);
                                    }}
                                    className="pointer-events-auto h-auto py-4 px-8 rounded-full border border-white/10 hover:border-white transition-all text-[8px] font-bold uppercase tracking-[0.4em] text-white/50"
                                >
                                    Exit Expedition
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Compass HUD decoration (Active mode) */}
                {isTourActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 border-[40px] border-black/20 pointer-events-none z-30"
                    >
                        <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-8 opacity-20">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1 h-px bg-white" />
                            ))}
                        </div>
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-8 opacity-20">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1 h-px bg-white" />
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
