"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Scale, Eye, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

const grades = [
    {
        id: "alba",
        title: "Alba Peak",
        subtitle: "The Primordial Standard",
        description: "The thinnest, most delicate grade of True Cinnamon. Hand-rolled to a diameter of 6mm, it offers a sweet, complex aroma with citrus undertones.",
        stats: [
            { label: "Diameter", value: "6mm - 8mm" },
            { label: "Texture", value: "Paper-thin layers" },
            { label: "Profile", value: "Subtle & Floral" }
        ],
        image: "/explore/quills.png"
    },
    {
        id: "c5",
        title: "C5 Special",
        subtitle: "The Masterpiece",
        description: "Slightly thicker than Alba, the C5 Special is prized for its golden color and balanced essential oil content. The choice of Michelin-starred pastry chefs.",
        stats: [
            { label: "Diameter", value: "10mm - 12mm" },
            { label: "Texture", value: "Sturdy & Crisp" },
            { label: "Profile", value: "Sweet & Earthy" }
        ],
        image: "/explore/quills.png"
    },
    {
        id: "bark-oil",
        title: "Sovereign Oil",
        subtitle: "Liquid Gold",
        description: "Steam-distilled from the inner-bark, this oil contains the highest concentrations of cinnamaldehyde and eugenol for unmatched potency.",
        stats: [
            { label: "Purity", value: "100% Organic" },
            { label: "Potency", value: "Ultra-High" },
            { label: "Aroma", value: "Intense & Primal" }
        ],
        image: "/explore/alchemy.png"
    }
];

export default function GradingPage() {
    return (
        <div className="relative min-h-screen bg-[#050505] text-[#F3EFE9] selection:bg-[#D2B48C] selection:text-black font-sans overflow-x-hidden pt-40">

            {/* Hero Section */}
            <section className="container px-4 py-24 border-l border-white/5 ml-4 md:ml-12 overflow-hidden">
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12"
                >
                    Educational Deep-Dive
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl md:text-[10rem] font-serif font-light leading-[0.8] mb-16 tracking-tighter"
                >
                    The Anatomy <br />
                    <span className="italic text-white/20">of a Quill.</span>
                </motion.h1>
            </section>

            {/* Grade Comparison Grid */}
            <section className="container px-4 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
                    {grades.map((grade, idx) => (
                        <motion.div
                            key={grade.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 1 }}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden mb-12 border border-white/5 shadow-3xl">
                                <Image
                                    src={grade.image}
                                    alt={grade.title}
                                    fill
                                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <span className="text-[#D2B48C] font-bold text-[9px] tracking-[0.6em] uppercase mb-4 block">{grade.subtitle}</span>
                                    <h3 className="text-4xl font-serif text-white tracking-tighter">{grade.title}</h3>
                                </div>
                            </div>

                            <p className="text-white/40 font-light leading-relaxed mb-12 text-lg italic border-l border-white/5 pl-8 font-serif">
                                {grade.description}
                            </p>

                            <div className="space-y-4 mb-12">
                                {grade.stats.map((stat) => (
                                    <div key={stat.label} className="flex justify-between items-center py-4 border-b border-white/5">
                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-sm font-light text-[#D2B48C] italic">{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <Button variant="ghost" className="p-0 hover:bg-transparent text-[#D2B48C] group/btn flex items-center gap-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Inquiry Protocol</span>
                                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover/btn:bg-[#D2B48C] group-hover/btn:border-[#D2B48C] transition-all">
                                    <ArrowRight size={16} className="text-white group-hover/btn:text-black" />
                                </div>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sensory Analysis Section */}
            <section className="py-60 bg-[#080808] border-y border-white/5">
                <div className="container px-4">
                    <div className="max-w-4xl border-l border-[#D2B48C]/30 pl-12 mb-32">
                        <h2 className="text-5xl md:text-8xl font-serif font-light mb-12 tracking-tighter">Beyond the <br /><span className="italic text-white/20">Visible.</span></h2>
                        <p className="text-2xl text-white/40 font-light italic font-serif leading-relaxed">
                            True Cinnamon is graded not just by its appearance, but by the potency of its aromatic compounds—Cinnamaldehyde and Eugenol.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: <Scale size={24} />, title: "Density", desc: "Mineral content from the Matara sub-soil." },
                            { icon: <Eye size={24} />, title: "Luster", desc: " Golden hue indicating optimal drying time." },
                            { icon: <Thermometer size={24} />, title: "Volatility", desc: "The speed at which aroma fills a room." },
                            { icon: <Sparkles size={24} />, title: "Purity", desc: "Zero chemical agents or synthetic additives." }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#D2B48C]/10 text-[#D2B48C] flex items-center justify-center mb-8">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-serif text-white mb-4 italic">{item.title}</h4>
                                <p className="text-white/30 text-sm font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
