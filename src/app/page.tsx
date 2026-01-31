"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence
} from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Award,
  Globe,
  ShieldCheck,
  Quote,
  Compass,
  Play,
  MoveRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainably Sourced",
    desc: "Direct partnerships with small-holder farms ensuring fair trade and eco-friendly harvesting.",
    image: "/explore/origin.png"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Certified Purity",
    desc: "Exceeding ISO 22000 and FDA standards for absolute safety and chemical-free assurance.",
    image: "/explore/alchemy.png"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "The Alba Peak",
    desc: "Exclusively dealing in the ultra-fine Alba grade, the absolute pinnacle of True Cinnamon.",
    image: "/explore/quills.png"
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-background text-[#F3EFE9] min-h-screen font-sans selection:bg-[#D2B48C] selection:text-background overflow-x-hidden">

      {/* --- 1. THE THRESHOLD HERO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 0.2], [0, 150]),
              opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.1])
            }}
            className="absolute inset-0 scale-105"
          >
            <Image
              src="/hero-bg.png"
              alt="Cinnamon Heartland"
              fill
              className="object-cover opacity-50 grayscale-[0.4]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          </motion.div>
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-8 text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D2B48C]/30" />
              Direct from Ceylon
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D2B48C]/30" />
            </span>
            <h1 className="text-[clamp(3.5rem,10vw,13rem)] font-serif font-light leading-[0.75] mb-12 md:mb-20 tracking-tighter">
              The Pure <br />
              <span className="italic text-white/20">Primal</span> Spice.
            </h1>
            <p className="text-[clamp(1.1rem,2vw,1.875rem)] text-white/40 max-w-4xl mx-auto font-light leading-relaxed mb-12 md:mb-24 italic font-serif px-4">
              Experience the world's most guarded artisanal secret, sustainably harvested from the sovereign highlands of Sri Lanka.
            </p>

            <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
              <Button size="lg" className="bg-[#D2B48C] hover:bg-white text-background font-bold h-24 px-16 rounded-full text-[11px] uppercase tracking-[0.5em] transition-all hover:scale-105 shadow-3xl group relative overflow-hidden">
                <span className="relative z-10">Explore the Showroom</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
              <Link href="/about" className="group flex items-center gap-8 text-white/20 hover:text-white transition-all duration-700">
                <span className="text-[10px] font-bold uppercase tracking-[0.6em]">Our Legacy</span>
                <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-[#D2B48C] group-hover:border-[#D2B48C] transition-all group-hover:rotate-12">
                  <Play size={20} className="fill-current group-hover:text-background" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-white/10"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.8em] vertical-text">Descend</span>
          <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
        </motion.div>
      </section>

      {/* --- 2. THE DISCOVERY TEASER --- */}
      <section className="py-24 md:py-60 bg-background relative overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-end mb-24 md:mb-40">
            <div className="flex-1">
              <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">The Narrative</span>
              <h2 className="text-[clamp(3rem,8vw,10rem)] font-serif font-light leading-none tracking-tighter">Behind the <br /><span className="italic text-white/20">Inner Bark.</span></h2>
            </div>
            <p className="max-w-xl text-white/30 text-2xl font-light leading-relaxed italic border-l border-[#D2B48C]/30 pl-12 font-serif">
              Every quill tells a story of geological perfection and generational intuition. Step into the heartland where alchemy meets nature.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="lg:col-span-8 relative aspect-[21/10] rounded-[5rem] overflow-hidden group border border-white/5 shadow-3xl"
            >
              <Image src="/explore/plantation.png" alt="Highlands" fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent p-20 flex flex-col justify-end">
                <h3 className="text-5xl font-serif text-white mb-8 tracking-tighter">The Matara Highlands</h3>
                <Link href="/explore" className="flex items-center gap-6 text-[#D2B48C] group/btn">
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Start Journey</span>
                  <MoveRight className="group-hover/btn:translate-x-4 transition-transform size-6" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="lg:col-span-4 relative aspect-[4/5] rounded-[5rem] overflow-hidden group border border-white/5 shadow-3xl"
            >
              <Image src="/explore/artisan.png" alt="Artisan" fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent p-16 flex flex-col justify-end">
                <span className="text-[#D2B48C] font-bold text-[10px] tracking-[0.6em] uppercase mb-4 block">Artisanal Mastery</span>
                <h3 className="text-4xl font-serif text-white uppercase font-light leading-none">The 45° <br /><span className="italic">Peel.</span></h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. ASYMMETRICAL AUTHORITY --- */}
      <section className="py-24 md:py-60 bg-secondary/30 relative border-y border-white/5">
        <div className="container px-4 text-center mb-24 md:mb-48">
          <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">The TAPROVIA Delta</span>
          <h2 className="text-[clamp(3rem,8vw,9rem)] font-serif font-light tracking-tighter">Why We Are <span className="italic text-white/20">Singular.</span></h2>
        </div>

        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className={cn(
                  "p-20 rounded-[5rem] bg-white/[0.02] border border-white/5 hover:border-[#D2B48C]/30 transition-all duration-1000 group relative overflow-hidden",
                  i === 1 && "lg:-mt-24 shadow-3xl"
                )}
              >
                <div className="w-20 h-20 rounded-[2rem] bg-white/[0.03] flex items-center justify-center mb-16 text-[#D2B48C] group-hover:bg-[#D2B48C] group-hover:text-background transition-all duration-700 group-hover:rotate-12">
                  {feature.icon}
                </div>
                <h3 className="text-4xl font-serif text-white mb-10 leading-tight font-light">{feature.title}</h3>
                <p className="text-white/30 text-xl font-light leading-relaxed mb-16 italic border-l border-white/5 pl-10 font-serif">
                  {feature.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-transparent via-[#D2B48C]/50 to-transparent group-hover:w-full transition-all duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. THE SOVEREIGN COLLECTION --- */}
      <section className="py-24 md:py-60 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 md:mb-40 border-b border-white/5 pb-24">
            <h2 className="text-[clamp(3rem,8vw,9rem)] font-serif font-light mb-12 md:mb-0 tracking-tighter">The Sovereign <br /><span className="italic text-white/20">Collection.</span></h2>
            <Link href="/products" className="group flex items-center gap-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/20 group-hover:text-[#D2B48C] transition-all">Observe All Grades</span>
              <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-[#D2B48C] group-hover:border-[#D2B48C] transition-all group-hover:rotate-12">
                <MoveRight size={32} className="text-white group-hover:text-background transition-colors" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-[6rem] overflow-hidden border border-white/10 shadow-3xl">
            <CollectionCard title="Rare Quills" grade="Alba Peak" image="/explore/quills.png" />
            <CollectionCard title="Liquid Gold" grade="Pure Bark Oil" image="/explore/alchemy.png" />
          </div>
        </div>
      </section>

      {/* --- 5. THE GLOBAL CALL --- */}
      <section className="py-24 md:py-60 relative overflow-hidden bg-background border-t border-white/5">
        <div className="absolute inset-0 bg-[#D2B48C]/[0.02] pointer-events-none" />

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="max-w-6xl mx-auto p-24 md:p-48 rounded-[7rem] border border-white/5 bg-background/40 backdrop-blur-3xl shadow-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent" />
            <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12 block">Global Trade Portal</span>
            <h2 className="text-[clamp(3rem,8vw,9rem)] font-serif font-light leading-none mb-16 italic tracking-tighter text-white/20">Partner with <br /><span className="text-white">Excellence.</span></h2>
            <p className="text-2xl text-white/40 font-light mb-24 max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-16 font-serif">
              Join the distinguished network of luxury distributors and high-end chefs who accept only the primordial grade of True Cinnamon.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button className="bg-[#D2B48C] hover:bg-white text-background font-bold h-24 px-20 rounded-full text-[11px] uppercase tracking-[0.5em] shadow-3xl transition-all hover:scale-105 group relative overflow-hidden">
                <span className="relative z-10">Request Wholesale Protocol</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CollectionCard({ title, grade, image }: { title: string, grade: string, image: string }) {
  return (
    <div className="relative aspect-square group cursor-pointer bg-card overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent p-20 flex flex-col justify-end">
        <span className="text-[#D2B48C] font-bold text-[10px] tracking-[0.8em] uppercase mb-6 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000">{grade}</span>
        <h3 className="text-6xl font-serif text-white uppercase mb-12 font-light tracking-tighter">{title}</h3>
        <div className="w-16 h-px bg-white/10 group-hover:w-full group-hover:bg-[#D2B48C]/40 transition-all duration-1000" />
      </div>
    </div>
  )
}

