"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight
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
    icon: <Globe className="w-6 h-6" />,
    title: "Geographic Provenance",
    desc: "Exclusively cultivated within the specific micro-climates of Matara, capturing the soul of the Southern Highlands.",
    image: "/explore/alchemy.png"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "The Alba Peak",
    desc: "Exclusively dealing in the ultra-fine Alba grade, the absolute pinnacle of True Cinnamon.",
    image: "/explore/quills.png"
  }
];

const testimonials = [
  {
    quote: "The definitive source for Alba grade. Their consistency is unmatched in the global market.",
    author: "Elena R.",
    role: "Head Buyer, Le Jardin Épicé, Paris"
  },
  {
    quote: "Taprovia has restored the lost art of true cinnamon. An essential partner for our seasonal menu.",
    author: "Chef Marco D.",
    role: "Executive Chef, The Obsidian Table"
  },
  {
    quote: "A masterclass in logistics and purity. The aroma tells you everything before you even taste it.",
    author: "Sarah J.",
    role: "Sourcing Director, Organic Origins UK"
  }
];

const heroImages = [
  "/hero-bg.png",
  "/hero-bg-2.png",
  "/hero-bg-3.png"
];

export default function Home() {
  const router = useRouter();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState<{ title: string, images: string[], currentIndex: number } | null>(null);

  const nextCollectionImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCollection) {
      setSelectedCollection({
        ...selectedCollection,
        currentIndex: (selectedCollection.currentIndex + 1) % selectedCollection.images.length
      });
    }
  };

  const prevCollectionImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCollection) {
      setSelectedCollection({
        ...selectedCollection,
        currentIndex: (selectedCollection.currentIndex - 1 + selectedCollection.images.length) % selectedCollection.images.length
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Faster rotation (6s) to verify 3 images
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-[#050505] text-[#F3EFE9] min-h-screen font-sans selection:bg-[#D2B48C] selection:text-black overflow-x-hidden">

      {/* --- 1. THE THRESHOLD HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div
                style={{
                  y: useTransform(scrollYProgress, [0, 0.2], [0, 150]),
                }}
                className="absolute inset-0 scale-105"
              >
                <Image
                  src={heroImages[currentHeroIndex]}
                  alt="Cinnamon Heartland"
                  fill
                  className="object-cover opacity-50 grayscale-[0.4]"
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] z-10" />
        </div>

        <div className="container relative z-10 px-4 text-center pt-48 pb-32">
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
            <h1 className="text-[clamp(3.5rem,10vw,11rem)] font-serif font-light leading-[0.75] mb-10 md:mb-16 tracking-tighter">
              The Pure <br />
              <span className="italic text-[#D2B48C]">Primal</span> Spice.
            </h1>
            <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-white/40 max-w-4xl mx-auto font-light leading-relaxed mb-12 italic font-serif px-4">
              Experience the world's most guarded artisanal secret, sustainably harvested from the sovereign highlands of Sri Lanka.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button size="lg" className="bg-[#D2B48C] hover:bg-white text-black font-bold h-16 px-10 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all hover:scale-105 shadow-3xl group relative overflow-hidden">
                <span className="relative z-10">Explore the Showroom</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
              <Link href="/about" className="group flex items-center gap-6 text-white/20 hover:text-white transition-all duration-700">
                <span className="text-[9px] font-bold uppercase tracking-[0.5em]">Our Legacy</span>
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-[#D2B48C] group-hover:border-[#D2B48C] transition-all group-hover:rotate-12">
                  <Play size={16} className="fill-current group-hover:text-black" />
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
      <section className="py-24 md:py-60 bg-[#050505] relative overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-end mb-24 md:mb-40">
            <div className="flex-1">
              <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">The Narrative</span>
              <h2 className="text-[clamp(3rem,8vw,10rem)] font-serif font-light leading-none tracking-tighter">Behind the <br /><span className="italic text-[#D2B48C]">Inner Bark.</span></h2>
            </div>
            <p className="max-w-xl text-white/30 text-2xl font-light leading-relaxed italic border-l border-[#D2B48C]/30 pl-12 font-serif">
              Every quill tells a story of geological perfection and generational intuition. Step into the heartland where alchemy meets nature.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="lg:col-span-8 relative h-[24rem] lg:h-[28rem] rounded-[5rem] overflow-hidden group border border-white/5 shadow-3xl"
            >
              <Image src="/explore/plantation.png" alt="Highlands" fill className="object-cover group-hover:scale-110 transition-all duration-[3s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-20 flex flex-col justify-end">
                <h3 className="text-5xl font-serif text-white mb-8 tracking-tighter">The Matara Highlands</h3>
                <Link href="/explore" className="flex items-center gap-6 text-[#D2B48C] group/btn">
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Start Journey</span>
                  <MoveRight className="group-hover/btn:translate-x-4 transition-transform size-6" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="lg:col-span-4 relative h-[24rem] lg:h-[28rem] rounded-[5rem] overflow-hidden group border border-white/5 shadow-3xl"
            >
              <Image src="/explore/artisan.png" alt="Artisan" fill className="object-cover group-hover:scale-110 transition-all duration-[3s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-16 flex flex-col justify-end">
                <span className="text-[#D2B48C] font-bold text-[10px] tracking-[0.6em] uppercase mb-4 block">Artisanal Mastery</span>
                <h3 className="text-4xl font-serif text-white uppercase font-light leading-none">The 45° <br /><span className="italic">Peel.</span></h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. ASYMMETRICAL AUTHORITY --- */}
      <section className="py-24 md:py-60 bg-[#080808] relative border-y border-white/5">
        <div className="container px-4 text-center mb-24 md:mb-48">
          <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">The TAPROVIA Delta</span>
          <h2 className="text-[clamp(3rem,8vw,9rem)] font-serif font-light tracking-tighter">Why We Are <span className="italic text-[#D2B48C]">Singular.</span></h2>
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
                <div className="w-20 h-20 rounded-[2rem] bg-white/[0.03] flex items-center justify-center mb-16 text-[#D2B48C] group-hover:bg-[#D2B48C] group-hover:text-black transition-all duration-700 group-hover:rotate-12">
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
      <section className="py-24 md:py-60 bg-[#050505]">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 md:mb-40 border-b border-white/5 pb-24">
            <h2 className="text-[clamp(3rem,8vw,9rem)] font-serif font-light mb-12 md:mb-0 tracking-tighter">The Sovereign <br /><span className="italic text-[#D2B48C]">Collection.</span></h2>
            <Link href="/products" className="group flex items-center gap-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/20 group-hover:text-[#D2B48C] transition-all">Observe All Grades</span>
              <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-[#D2B48C] group-hover:border-[#D2B48C] transition-all group-hover:rotate-12">
                <MoveRight size={32} className="text-white group-hover:text-black transition-colors" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-[6rem] overflow-hidden border border-white/10 shadow-3xl">
            <CollectionCard
              title="Rare Quills"
              grade="Alba Peak"
              image="/explore/quills.png"
              onSelect={() => setSelectedCollection({
                title: "Rare Quills",
                images: ["/explore/quills.png", "/explore/quills-macro.png", "/explore/quills-bundle.png"],
                currentIndex: 0
              })}
            />
            <CollectionCard
              title="Liquid Gold"
              grade="Pure Bark Oil"
              image="/explore/alchemy.png"
              onSelect={() => setSelectedCollection({
                title: "Liquid Gold",
                images: ["/explore/alchemy.png", "/explore/oil-lifestyle.png", "/explore/oil-pour.png"],
                currentIndex: 0
              })}
            />
          </div>
        </div>

        <AnimatePresence>
          {selectedCollection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelectedCollection(null)}
            >
              <div className="relative max-w-7xl w-full flex items-center justify-center gap-4 md:gap-12">
                {/* Previous Button */}
                <button
                  onClick={prevCollectionImage}
                  className="hidden md:flex w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white/30 hover:text-white hover:bg-[#D2B48C] hover:text-black transition-all group shrink-0"
                >
                  <ChevronLeft size={40} className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative flex-1 aspect-square md:aspect-video rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-white/10 shadow-3xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCollection.currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedCollection.images[selectedCollection.currentIndex]}
                        alt={selectedCollection.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 inset-x-0 p-12 md:p-20 flex justify-between items-end">
                    <div className="max-w-2xl">
                      <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-6 block">Sovereign Collection</span>
                      <h3 className="text-4xl md:text-8xl font-serif text-white tracking-tighter leading-none">{selectedCollection.title}</h3>
                    </div>
                    <div className="flex gap-4 md:hidden">
                      <button onClick={prevCollectionImage} className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextCollectionImage} className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCollection(null)}
                    className="absolute top-12 right-12 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#D2B48C] hover:text-black transition-all transform hover:rotate-90 z-20"
                  >
                    <X size={32} />
                  </button>

                  <div className="absolute top-12 left-12 bg-black/40 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full">
                    <span className="text-[#D2B48C] font-bold text-xs tracking-[0.4em] tabular-nums">
                      {selectedCollection.currentIndex + 1} <span className="text-white/20 mx-2">/</span> {selectedCollection.images.length}
                    </span>
                  </div>
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={nextCollectionImage}
                  className="hidden md:flex w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white/30 hover:text-white hover:bg-[#D2B48C] hover:text-black transition-all group shrink-0"
                >
                  <ChevronRight size={40} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* --- TESTIMONIALS: THE VERDICT --- */}
      <section className="py-24 md:py-60 bg-[#050505] relative overflow-hidden">
        <div className="container px-4">
          <div className="mb-12 md:mb-20 text-center">
            <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">The Verdict</span>
            <h2 className="text-[clamp(3rem,6vw,6rem)] font-serif font-light tracking-tighter">Voices of <span className="italic text-[#D2B48C]">Authority.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 border-t border-white/5 pt-12">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="flex flex-col justify-between"
              >
                <Quote className="w-12 h-12 text-[#D2B48C] mb-8 opacity-50" />
                <p className="text-2xl text-white/60 font-serif font-light leading-relaxed mb-12 italic">
                  "{item.quote}"
                </p>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-2">{item.author}</h4>
                  <span className="text-[#D2B48C] text-[10px] tracking-[0.1em] uppercase opacity-60">{item.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. THE GLOBAL CALL --- */}
      <section className="py-24 md:py-60 relative overflow-hidden bg-[#050505] border-t border-white/5">
        <div className="absolute inset-0 bg-[#D2B48C]/[0.02] pointer-events-none" />

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="max-w-6xl mx-auto p-24 md:p-48 rounded-[7rem] border border-white/5 bg-black/40 backdrop-blur-3xl shadow-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#D2B48C] to-transparent" />
            <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12 block">Global Trade Portal</span>
            <h2 className="text-[clamp(3rem,8vw,9rem)] font-serif font-light leading-none mb-16 italic tracking-tighter text-white/20">Partner with <br /><span className="text-white">Excellence.</span></h2>
            <p className="text-2xl text-white/40 font-light mb-24 max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-16 font-serif">
              Join the distinguished network of luxury distributors and high-end chefs who accept only the primordial grade of True Cinnamon.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button className="bg-[#D2B48C] hover:bg-white text-black font-bold h-16 px-12 rounded-full text-[10px] uppercase tracking-[0.4em] shadow-3xl transition-all hover:scale-105 group relative overflow-hidden">
                <span className="relative z-10">Request Wholesale Protocol</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div >
  );
}

function CollectionCard({ title, grade, image, onSelect }: { title: string, grade: string, image: string, onSelect: () => void }) {
  return (
    <div
      className="relative aspect-square group cursor-pointer bg-black overflow-hidden"
      onClick={onSelect}
    >
      <Image src={image} alt={title} fill className="object-cover group-hover:scale-110 transition-all duration-[3s]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-20 flex flex-col justify-end">
        <span className="text-[#D2B48C] font-bold text-[10px] tracking-[0.8em] uppercase mb-6 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000">{grade}</span>
        <h3 className="text-6xl font-serif text-white uppercase mb-12 font-light tracking-tighter">{title}</h3>
        <div className="w-16 h-px bg-white/10 group-hover:w-full group-hover:bg-[#D2B48C]/40 transition-all duration-1000" />
      </div>
    </div>
  )
}

