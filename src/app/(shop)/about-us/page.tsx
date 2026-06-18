"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function AboutUsPage() {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);
    
    const coreValues = [
        { title: "Uncompromising Purity", content: "We never blend our spices with lower-grade alternatives. What you get is 100% pure Ceylon Cinnamon." },
        { title: "Sustainable Harvesting", content: "Our partner farms use traditional methods that protect the soil and surrounding ecosystems for generations to come." },
        { title: "Empowering Farmers", content: "We ensure fair trade practices, paying our farmers above market rates to support their families and communities." }
    ];

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans pb-24 pt-32">
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container px-4 mx-auto mb-20 text-center max-w-4xl"
            >
                <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Company
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8">
                    About Us
                </h1>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-[#D2B48C] first-letter:float-left first-letter:mr-4 first-letter:mt-1 text-justify">
                    At Taprovia, we are driven by a singular purpose: to bring the authentic taste and unmatched health benefits of True Ceylon Cinnamon to the world. Our journey began in the lush highlands, inspired by generations of artisanal heritage.
                </p>
            </motion.div>

            {/* Impact Stats */}
            <div className="container px-4 mx-auto mb-24 border-y border-gray-100 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    <div>
                        <h4 className="text-4xl md:text-5xl font-serif font-bold text-[#D2B48C] mb-2">
                            <AnimatedCounter value={50} suffix="+" />
                        </h4>
                        <p className="text-gray-600 font-bold text-sm uppercase tracking-widest">Partner Farms</p>
                    </div>
                    <div>
                        <h4 className="text-4xl md:text-5xl font-serif font-bold text-[#D2B48C] mb-2">
                            <AnimatedCounter value={100} suffix="%" />
                        </h4>
                        <p className="text-gray-600 font-bold text-sm uppercase tracking-widest">Organic</p>
                    </div>
                    <div>
                        <h4 className="text-4xl md:text-5xl font-serif font-bold text-[#D2B48C] mb-2">
                            <AnimatedCounter value={15} suffix="+" />
                        </h4>
                        <p className="text-gray-600 font-bold text-sm uppercase tracking-widest">Countries</p>
                    </div>
                    <div>
                        <h4 className="text-4xl md:text-5xl font-serif font-bold text-[#D2B48C] mb-2">
                            <AnimatedCounter value={3} suffix="x" />
                        </h4>
                        <p className="text-gray-600 font-bold text-sm uppercase tracking-widest">Quality Checked</p>
                    </div>
                </div>
            </div>

            {/* Parallax Image Grid */}
            <div className="container px-4 mx-auto mb-32 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px] md:h-[500px]">
                    <motion.div 
                        className="relative h-full rounded-3xl overflow-hidden shadow-md"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image src="/gallery/gallery-1.jpg" alt="Farm" fill className="object-cover" />
                    </motion.div>
                    <motion.div 
                        className="relative h-full rounded-3xl overflow-hidden shadow-lg md:-mt-12"
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: -48, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <Image src="/gallery/gallery-2.jpg" alt="Harvest" fill className="object-cover" />
                    </motion.div>
                    <motion.div 
                        className="relative h-full rounded-3xl overflow-hidden shadow-md md:mt-12"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 48, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Image src="/gallery/gallery-3.jpg" alt="Spices" fill className="object-cover" />
                    </motion.div>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="container px-4 mx-auto mb-24 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#D2B48C]/10 flex items-center justify-center shadow-sm border border-[#D2B48C]/20 mb-6">
                            <span className="text-[#D2B48C] font-bold text-xl font-serif">V</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            To be the global gold standard for pure, unadulterated Ceylon spices, recognized for our unwavering commitment to quality, sustainability, and the preservation of Sri Lanka's rich agricultural heritage.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#D2B48C]/10 flex items-center justify-center shadow-sm border border-[#D2B48C]/20 mb-6">
                            <span className="text-[#D2B48C] font-bold text-xl font-serif">M</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            To ethically source and deliver the highest quality Ceylon Cinnamon directly from our partner farms to the world, empowering local artisan communities while providing our customers with unparalleled flavor and health benefits.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Core Values Accordion */}
            <div className="container px-4 mx-auto mb-32 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">Our DNA</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold">Core Values</h2>
                </div>
                <div className="space-y-4">
                    {coreValues.map((value, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
                            <button 
                                onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-xl font-serif font-bold text-gray-900">{value.title}</h3>
                                <span className="text-[#D2B48C]">
                                    {openAccordion === idx ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openAccordion === idx && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 text-gray-600 leading-relaxed text-justify">
                                            {value.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leadership / Founders */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container px-4 mx-auto mb-32"
            >
                <div className="text-center mb-16">
                    <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">Leadership</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold">Meet the Founders</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
                    <div className="text-center group">
                        <div className="w-32 h-32 mx-auto rounded-full bg-white flex items-center justify-center mb-6 border border-gray-100 shadow-sm group-hover:border-[#D2B48C]/50 group-hover:shadow-md transition-all">
                            <span className="text-4xl font-serif text-gray-300 group-hover:text-[#D2B48C] transition-colors">SE</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Shamalka Edirisinghe</h4>
                        <p className="text-[#D2B48C] uppercase tracking-widest text-xs font-bold">Co-Founder</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-32 h-32 mx-auto rounded-full bg-white flex items-center justify-center mb-6 border border-gray-100 shadow-sm group-hover:border-[#D2B48C]/50 group-hover:shadow-md transition-all">
                            <span className="text-4xl font-serif text-gray-300 group-hover:text-[#D2B48C] transition-colors">WR</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Wilhelm Yohan Randy</h4>
                        <p className="text-[#D2B48C] uppercase tracking-widest text-xs font-bold">Co-Founder</p>
                    </div>
                </div>
            </motion.div>

            {/* Call to Action */}
            <div className="container px-4 mx-auto text-center bg-gray-50 rounded-3xl p-16 border border-gray-100">
                <h2 className="text-3xl font-serif font-bold mb-6">Join Our Journey</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Discover the history and heritage behind our spices on the Our Story page.
                </p>
                <Link href="/about">
                    <MagneticButton className="bg-[#D2B48C] hover:bg-[#b09673] text-white font-bold px-10 py-6 rounded-full text-sm uppercase tracking-widest transition-all shadow-lg">
                        Read Our Story
                    </MagneticButton>
                </Link>
            </div>

        </div>
    );
}
