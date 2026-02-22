"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Globe, Award, ShieldCheck, MapPin, ArrowRight, Eye, Target, CheckCircle2, Star, MoveRight, X, Quote } from "lucide-react";
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

const teamMembers = [
    {
        name: "Shamalka Edirisinghe",
        role: "Founder",
        image: "/hero-bg.png",
        delay: 0,
        thoughts: "We are not just selling a spice; we are guarding a heritage. Every quill that leaves our shores carries the story of three generations of soil, sun, and silence. My vision is to see Ceylon Cinnamon reclaim its throne as the 'True Gold' of the ancient world."
    },
    {
        name: "Wihelm Yohan Randy",
        role: "Chief Executive Officer",
        image: "/hero-bg.png",
        delay: 0.2,
        thoughts: "The global market demands transparency, but the luxury market demands soul. At TAPROVIA, we bridge this gap by marrying cutting-edge supply chain traceability with the artisanal reverence this product deserves. We define the standard."
    },
    {
        name: "Vihandu Edirisinghe",
        role: "Marketing & Social Media Coordinator",
        image: "/hero-bg.png",
        delay: 0.4,
        thoughts: "In a noisy digital world, authenticity is the only currency. Our story doesn't need embellishment—it just needs to be told. I capture the raw, unfiltered beauty of the highlands to show the world the hands behind the harvest."
    },
    {
        name: "Venusha Weerasinghe",
        role: "IT Consultant",
        image: "/hero-bg.png",
        delay: 0.6,
        thoughts: "Technology in agriculture isn't about replacing the artisan; it's about empowering them. By digitizing our inventory and export logistics, we ensure that the freshness of the harvest is preserved from the estate to the global port."
    },
    {
        name: "Thilina Weerasinghe",
        role: "IT Supervisor",
        image: "/hero-bg.png",
        delay: 0.8,
        thoughts: "Precision is our protocol. From the temperature of the drying rooms to the security of our data, every system I oversee is designed to protect the integrity of the sovereign grade. Excellence is a series of executed details."
    }
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

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

                    <div className="flex flex-wrap justify-center gap-10 lg:gap-16 mb-60 max-w-7xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: member.delay }}
                                className="relative w-full md:w-[calc(50%-2rem)] lg:w-[calc(30%-2rem)] aspect-[4/5] rounded-[4rem] overflow-hidden group border border-white/10 shadow-3xl bg-[#080808] cursor-pointer"
                                onClick={() => setSelectedMember(member)}
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale active:grayscale-0 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out opacity-60 group-hover:opacity-100"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

                                {/* Content */}
                                <div className="absolute bottom-0 inset-x-0 p-10 flex flex-col justify-end text-center">
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-[#D2B48C] font-bold text-[9px] tracking-[0.4em] uppercase mb-4 border border-[#D2B48C]/30 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            {member.role}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-serif text-white uppercase font-light leading-none tracking-tight group-hover:text-[#D2B48C] transition-colors duration-500">
                                        {member.name.split(" ").map((n, i) => (
                                            <span key={i} className="block">{n}</span>
                                        ))}
                                    </h3>
                                    <div className="h-0 group-hover:h-8 transition-all duration-500 overflow-hidden flex justify-center items-end opacity-0 group-hover:opacity-100">
                                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">Click to view vision</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
                        <Link href="/contact">
                            <Button className="bg-[#D2B48C] hover:bg-white text-black font-bold h-24 px-20 rounded-full text-[11px] uppercase tracking-[0.5em] shadow-3xl transition-all hover:scale-105 group">
                                Connect with Exports Desk <MoveRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedMember && (
                    <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
                )}
            </AnimatePresence>
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

function TeamModal({ member, onClose }: { member: typeof teamMembers[0], onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 overflow-y-auto"
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-[4rem] border border-white/10 overflow-hidden shadow-3xl my-auto flex flex-col md:flex-row"
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:rotate-90 z-20"
                >
                    <X size={20} />
                </button>

                <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
                    <Image src={member.image} alt={member.name} fill className="object-cover grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0A0A0A]" />
                </div>

                <div className="p-12 md:p-20 md:w-1/2 flex flex-col justify-center text-left relative">
                    <Quote className="absolute top-12 right-12 text-[#D2B48C]/10 w-40 h-40 -rotate-12" />

                    <span className="text-[#D2B48C] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block border border-[#D2B48C]/20 px-4 py-2 rounded-full w-fit">
                        {member.role}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-12 leading-none uppercase tracking-wide">
                        {member.name}
                    </h2>

                    <div className="relative z-10">
                        <p className="text-xl md:text-2xl text-white/60 font-serif font-light leading-relaxed italic border-l-2 border-[#D2B48C] pl-8">
                            "{member.thoughts}"
                        </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">Connect</span>
                        {/* Placeholder for social links if needed */}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

