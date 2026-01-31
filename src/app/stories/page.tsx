"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen, Share2, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
    {
        id: 1,
        title: "The Silent Rise of Ceylon Quills",
        excerpt: "An in-depth analysis of the 2024 export trends. Why the European market is pivoting back to authentic Cinnamomum zeylanicum and the impact on local mountain communities.",
        date: "Jan 15, 2024",
        author: "Sarah Van Dort",
        image: "/explore/plantation.png",
        category: "Market Insights",
        readingTime: "8 min read"
    },
    {
        id: 2,
        title: "The Chemical Poetry of Scent",
        excerpt: "Decoding the differences between True Cinnamon and Cassia through the lens of coumarin content and aromatic volatile oils. A scientific dive for the refined palate.",
        date: "Jan 02, 2024",
        author: "Dr. Kamal Silva",
        image: "/explore/alchemy.png",
        category: "Science",
        readingTime: "5 min read"
    },
    {
        id: 3,
        title: "Daughters of the Southern Soil",
        excerpt: "Meet the master artisans of Matara. How our collective initiative is rewriting the narrative of female empowerment in the spice trade through fair wages and artisanal healthcare.",
        date: "Dec 20, 2023",
        author: "Shamalka Edirisinghe",
        image: "/explore/artisan.png",
        category: "Heritage",
        readingTime: "12 min read"
    }
];

export default function StoriesPage() {
    return (
        <div className="relative min-h-screen bg-[#050505] text-[#F3EFE9] selection:bg-[#D2B48C] selection:text-black font-sans overflow-x-hidden">

            {/* --- 1. EDITORIAL HERO --- */}
            <section className="relative pt-64 pb-24 overflow-hidden">
                <div className="container px-4">
                    <div className="max-w-5xl border-l border-white/5 pl-8 md:pl-20">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12"
                        >
                            The Sovereign Journal
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-7xl md:text-[10rem] font-serif font-light leading-[0.8] mb-16 tracking-tighter"
                        >
                            Essays from <br />
                            <span className="italic text-white/20">the Heartland.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-3xl text-white/40 font-light max-w-3xl leading-relaxed italic border-x border-white/5 px-12"
                        >
                            A curated collection of observations, scientific research, and artisanal portraits from the epicenter of the world's finest spice.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* --- 2. FEATURED STORY --- */}
            <section className="py-24">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-[5rem] overflow-hidden bg-black aspect-[21/10] group cursor-pointer shadow-3xl border border-white/5"
                    >
                        <Image
                            src="/explore/plantation.png"
                            alt="The Art of the Perfect Quill"
                            fill
                            className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-12 md:p-32 flex flex-col justify-end">
                            <div className="max-w-4xl">
                                <div className="flex items-center gap-8 mb-12">
                                    <span className="px-6 py-2 rounded-full border border-white/10 backdrop-blur-3xl text-[#D2B48C] text-[10px] font-bold uppercase tracking-[0.4em]">
                                        Featured Essay
                                    </span>
                                    <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] leading-none">
                                        15 Min Read
                                    </span>
                                </div>
                                <h2 className="text-5xl md:text-8xl font-serif font-light text-white mb-16 leading-[0.9] tracking-tighter">
                                    The Architecture of <br /> a <span className="italic text-white/20">Perfect Quill.</span>
                                </h2>
                                <button className="group flex items-center gap-8 text-white">
                                    <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#D2B48C] transition-all duration-700">
                                        <BookOpen size={24} />
                                    </div>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] group-hover:translate-x-4 transition-transform">Begin Reading</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 3. STAGGERED JOURNAL GRID --- */}
            <section className="py-40 relative">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-40">
                        {stories.map((story, index) => (
                            <motion.article
                                key={story.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className={cn(
                                    "relative flex flex-col group",
                                    index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-64"
                                )}
                            >
                                <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden mb-16 shadow-3xl bg-[#080808] border border-white/5">
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-10 left-10">
                                        <span className="bg-[#050505]/60 backdrop-blur-3xl px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] text-[#D2B48C] border border-white/10 italic">
                                            {story.category}
                                        </span>
                                    </div>
                                    {/* Action Reveal */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center gap-6">
                                        <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/10 flex items-center justify-center hover:bg-[#D2B48C] transition-all duration-500">
                                            <Share2 size={20} className="text-white" />
                                        </button>
                                        <button className="h-16 px-10 rounded-full bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#D2B48C] transition-all duration-500">
                                            Read Story
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 mb-8 text-[9px] font-bold uppercase tracking-[0.6em] text-white/20">
                                    <span className="flex items-center gap-3">
                                        <Calendar size={14} className="text-[#D2B48C]/40" /> {story.date}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/5" />
                                    <span className="flex items-center gap-3">
                                        <User size={14} className="text-[#D2B48C]/40" /> {story.author}
                                    </span>
                                </div>

                                <h3 className="text-4xl md:text-6xl font-serif font-light mb-8 leading-[0.9] tracking-tighter group-hover:text-[#D2B48C] transition-colors">
                                    {story.title}
                                </h3>

                                <p className="text-white/40 font-light leading-relaxed mb-12 text-xl border-l border-white/5 pl-10 italic">
                                    {story.excerpt}
                                </p>

                                <div className="flex justify-between items-center py-8 border-t border-white/5 mt-auto">
                                    <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em] leading-none">{story.readingTime}</span>
                                    <button className="text-[11px] font-bold uppercase tracking-[0.4em] flex items-center gap-4 group-hover:translate-x-4 transition-transform">
                                        Full Article <MoveRight size={20} className="text-[#D2B48C]" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. EDITORIAL CALL --- */}
            <section className="py-60 relative overflow-hidden bg-[#050505] border-t border-white/5">
                <div className="absolute inset-0 bg-[#D2B48C]/[0.02] pointer-events-none" />
                <div className="container px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="max-w-6xl mx-auto p-24 md:p-40 rounded-[6rem] border border-white/5 bg-black/40 backdrop-blur-3xl shadow-3xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent" />
                        <h2 className="text-5xl md:text-[8rem] font-serif font-light mb-16 leading-none tracking-tighter italic text-white/20">Capture the <br /> <span className="text-white">whole story.</span></h2>
                        <p className="text-2xl text-white/40 font-light mb-20 max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
                            Subscribe to the Sovereign Journal for monthly deep-dives into the spice trade, sustainability, and artisanal culture.
                        </p>
                        <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-6">
                            <input
                                type="email"
                                placeholder="REGISTRY EMAIL ADDRESS"
                                className="flex-1 bg-white/[0.02] border border-white/10 rounded-full h-24 px-12 text-[11px] font-bold tracking-[0.5em] focus:outline-none focus:border-[#D2B48C] transition-all"
                            />
                            <Button className="bg-[#D2B48C] hover:bg-white text-black font-bold h-24 px-16 rounded-full text-[11px] uppercase tracking-[0.5em] shadow-3xl transition-all group overflow-hidden relative">
                                <span className="relative z-10">Subscribe</span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
