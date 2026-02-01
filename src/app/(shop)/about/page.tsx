"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Globe, Award, ShieldCheck, MapPin, ArrowRight, Eye, Target, CheckCircle2, Star, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
    {
        year: "1924",
        title: "The Soil Discovery",
        description: "Our ancestors identified the unique iron-rich lateralite soil of the Matara Highlands as the primordial foundation for ultra-premium cinnamon.",
        image: "/explore/plantation.png"
    },
    {
        year: "1968",
        title: "Generational Mastery",
        description: "The proprietary '45-degree angle' peeling technique was perfected, becoming the gold standard for preserving the fragile inner bark layers.",
        image: "/explore/artisan.png"
    },
    {
        year: "2012",
        title: "The Visionary Leap",
        description: "TAPROVIA was formalised as a boutique export house, bridging the gap between isolated highland farms and global luxury markets.",
        image: "/explore/alchemy.png"
    },
    {
        year: "2024",
        title: "Modern Heritage",
        description: "Standardizing the benchmark for 100% pure Ceylon Cinnamon across 40+ countries with state-of-the-art traceability.",
        image: "/hero-bg.png"
    }
];

const virtues = [
    {
        icon: <Leaf className="w-6 h-6" />,
        title: "Biotic Purity",
        description: "Absolute refusal of Cassia. Every quill is DNA-verified for the highest eugenol and lowest coumarin content.",
        color: "bg-[#D2B48C]"
    },
    {
        icon: <Award className="w-6 h-6" />,
        title: "Sovereign Grade",
        description: "Custom harvesting for Alba and C5 Special grades, reserved for those who demand the pinnacle of spices.",
        color: "bg-[#A1824A]"
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Ethical Custodians",
        description: "Direct-to-farm trade ensuring our artisans receive 3x the market rate, sustaining the craft and the community.",
        color: "bg-white/10"
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Global Benchmark",
        description: "Exceeding international export regulations (ISO 22000, FDA) to deliver a truly world-class luxury spice.",
        color: "bg-[#D2B48C]/20"
    }
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative bg-[#050505] text-[#F3EFE9] min-h-screen font-sans selection:bg-[#D2B48C] selection:text-black overflow-x-hidden">

            {/* --- 1. THE GENESIS HERO --- */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/explore/plantation.png"
                        alt="Heritage"
                        fill
                        className="object-cover opacity-30 grayscale-[0.5] scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                </div>

                <div className="container relative z-10 px-4 text-center pt-48">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12 block">Est. 1924 | The Benchmark</span>
                        <h1 className="text-7xl md:text-[12rem] font-serif font-light leading-[0.8] mb-16 tracking-tighter">
                            The <span className="italic block text-white/20">Legacy.</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed mb-20 italic font-serif">
                            "True heritage isn't preserved in books; it's tasted in the sap, smelled in the air, and felt in the soil."
                        </p>
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-6 text-white/10"
                        >
                            <span className="text-[9px] font-bold uppercase tracking-[0.6em]">Descend into Origin</span>
                            <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. THE LEGACY TIMELINE --- */}
            <section className="py-60 relative overflow-hidden">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
                        <div className="lg:col-span-4 sticky top-40 h-fit">
                            <span className="text-[#D2B48C] font-bold tracking-[0.4em] uppercase text-[9px] mb-8 block">Archive: Centuries of Grit</span>
                            <h2 className="text-6xl md:text-8xl font-serif font-light leading-none mb-10 tracking-tighter">
                                A Century <br /><span className="italic text-white/20">Refined.</span>
                            </h2>
                            <p className="text-white/30 text-xl font-light leading-relaxed border-l border-[#D2B48C]/30 pl-10 italic">
                                From a single plantation in 1924 to a global vanguard of luxury spices. Our journey is paved with persistence.
                            </p>
                        </div>

                        <div className="lg:col-span-8 space-y-60">
                            {timelineEvents.map((event, index) => (
                                <TimelineBlock key={event.year} event={event} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. MISSION & VISION --- */}
            <section className="py-40 relative">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-3xl">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-20 md:p-32 bg-[#050505] group transition-all duration-1000"
                        >
                            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center mb-16 group-hover:bg-[#D2B48C] group-hover:border-[#D2B48C] transition-all duration-1000 group-hover:rotate-12">
                                <Eye className="w-10 h-10 text-white group-hover:text-black transition-colors" />
                            </div>
                            <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[9px] mb-8 block">Future State</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white mb-10 leading-none font-light">The Global <br /><span className="italic text-white/20">Standard.</span></h3>
                            <p className="text-white/40 text-xl font-light leading-relaxed italic border-l border-white/5 pl-8">
                                To be the global standard for Ceylon Cinnamon, recognized not only for the purity of our product but for the uncompromising integrity of our entire supply chain.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-20 md:p-32 bg-[#080808] group transition-all duration-1000"
                        >
                            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center mb-16 group-hover:bg-[#D2B48C] group-hover:border-[#D2B48C] transition-all duration-1000 group-hover:-rotate-12">
                                <Target className="w-10 h-10 text-white group-hover:text-black transition-colors" />
                            </div>
                            <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[9px] mb-8 block">Our Daily Pulse</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white mb-10 leading-none font-light">Uncompromising <br /><span className="italic text-[#D2B48C]">Purity.</span></h3>
                            <p className="text-white/40 text-xl font-light leading-relaxed italic border-l border-white/5 pl-8">
                                To export the finest certified Ceylon Cinnamon while empowering small-holder farmers through direct trade, fair pricing, and generational knowledge sharing.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 4. LEADERSHIP --- */}
            <section className="py-60 relative overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,180,140,0.03),transparent)] pointer-events-none" />

                <div className="container px-4 relative z-10">
                    <div className="text-center mb-40">
                        <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">The Architects</span>
                        <h2 className="text-6xl md:text-9xl font-serif font-light text-white leading-none tracking-tighter">Vision & <span className="italic text-white/20">Heritage.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center mb-60">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="relative aspect-[4/5] rounded-[5rem] overflow-hidden group border border-white/5 shadow-3xl"
                        >
                            <Image src="/hero-bg.png" alt="Founder" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-20 left-20">
                                <span className="text-[#D2B48C] font-bold text-[10px] tracking-[0.6em] uppercase mb-6 block">Founder</span>
                                <h3 className="text-5xl lg:text-6xl font-serif text-white uppercase font-light">Shamalka Edirisinghe</h3>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                            className="relative aspect-[4/5] rounded-[5rem] overflow-hidden group border border-white/5 md:mt-40 shadow-3xl"
                        >
                            <Image src="/hero-bg.png" alt="CEO" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-20 left-20">
                                <span className="text-[#D2B48C] font-bold text-[10px] tracking-[0.6em] uppercase mb-6 block">Chief Executive Officer</span>
                                <h3 className="text-5xl lg:text-6xl font-serif text-white uppercase font-light">Yohan Randy</h3>
                            </div>
                        </motion.div>
                    </div>

                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="space-y-12 text-white/60 text-2xl md:text-4xl font-light leading-[1.3] font-serif italic"
                        >
                            <p>"We didn't set out to build a company; we set out to restore a legacy. Ceylon Cinnamon is a global treasure that was being lost to industrial shortcuts. TAPROVIA is the sanctuary for those who value time over speed."</p>
                            <p className="text-lg opacity-40 font-sans font-bold tracking-[0.4em] uppercase">— THE DIRECTORY</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 5. THE GLOBAL CALL --- */}
            <section className="py-60 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#D2B48C]/[0.02]" />
                <div className="container px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-6xl mx-auto p-24 md:p-40 rounded-[6rem] border border-white/5 bg-black/40 backdrop-blur-3xl relative overflow-hidden shadow-3xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent" />
                        <h2 className="text-5xl md:text-[8rem] font-serif font-light mb-16 leading-none tracking-tighter italic text-white/20">Become the <br /><span className="text-white">Legacy.</span></h2>
                        <p className="text-2xl text-white/40 font-light mb-20 max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
                            Join our inner circle of distributors and chefs who accept only the primordial grade of Ceylon Cinnamon.
                        </p>
                        <Button className="bg-[#D2B48C] hover:bg-white text-black font-bold h-24 px-20 rounded-full text-[11px] uppercase tracking-[0.5em] shadow-3xl transition-all hover:scale-105 group">
                            Connect with Exports Desk <MoveRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function TimelineBlock({ event, index }: { event: typeof timelineEvents[0], index: number }) {
    const blockRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -120 : 120]);
    const springY = useSpring(y, { damping: 25, stiffness: 50 });

    return (
        <motion.div
            ref={blockRef}
            style={{ y: springY }}
            className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center"
        >
            <div className={cn("relative aspect-square rounded-[5rem] overflow-hidden border border-white/5 shadow-3xl", index % 2 !== 0 && "md:order-2")}>
                <Image src={event.image} alt={event.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" />
                <div className="absolute top-12 left-12 bg-black/40 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10">
                    <span className="text-[#D2B48C] font-bold tracking-[0.4em] text-xs leading-none">{event.year}</span>
                </div>
            </div>
            <div className={index % 2 !== 0 ? "md:order-1 md:text-right" : ""}>
                <span className="text-[#D2B48C]/50 font-bold tracking-[0.6em] text-[9px] uppercase mb-8 block">Milestone</span>
                <h3 className="text-5xl font-serif text-white mb-8 italic">{event.title}</h3>
                <p className="text-white/40 text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0 border-l border-white/5 pl-8 italic">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );
}
