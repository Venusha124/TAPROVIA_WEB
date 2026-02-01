"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen, Share2, MoveRight, X } from "lucide-react";
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
        readingTime: "8 min read",
        content: `
            <p>In the mist-shrouded highlands of Sri Lanka, a quiet revolution is taking root. For decades, the global cinnamon market has been flooded with Cassia—a cheaper, coarser substitute often mislabeled as true cinnamon. But as European and North American consumers become more discerning about provenance and health, the demand for authentic <em>Cinnamomum zeylanicum</em> is experiencing an unprecedented resurgence.</p>
            <br/>
            <h3>The Cassia Effect</h3>
            <p>The distinction is not merely botanical; it is a matter of health and flavor. Cassia contains high levels of coumarin, a compound that can be toxic in large doses. Ceylon cinnamon, by contrast, is virtually free of coumarin and possesses a delicate, complex flavor profile that has been prized by chefs and perfumers for centuries.</p>
            <br/>
            <h3>A Benefit for the Highlands</h3>
            <p>This shift in global preference is breathing new life into the communities of the Ratnapura and Galle districts. Smallholder farmers, who once struggled against industrial scaling, are now finding their artisanal methods—hand-rolling quills at dawn to preserve essential oils—valued at a premium. The rise of "single-origin" spices mirrors the specialty coffee movement, allowing these guardians of heritage to negotiate better prices and invest in sustainable farming practices.</p>
        `
    },
    {
        id: 2,
        title: "The Chemical Poetry of Scent",
        excerpt: "Decoding the differences between True Cinnamon and Cassia through the lens of coumarin content and aromatic volatile oils. A scientific dive for the refined palate.",
        date: "Jan 02, 2024",
        author: "Dr. Kamal Silva",
        image: "/explore/alchemy.png",
        category: "Science",
        readingTime: "5 min read",
        content: `
            <p>Scent is chemistry, and the chemistry of Ceylon Cinnamon is a masterpiece of nature. Unlike its rougher cousin Cassia, which is dominated by cinnamaldehyde alone, True Cinnamon contains a symphony of over 80 distinct chemical compounds, including eugenol and linalool, which give it floral and citrus notes.</p>
            <br/>
            <h3>The Coumarin Question</h3>
            <p>The most critical chemical distinction lies in coumarin. Cassia bark can contain up to 1% coumarin, a blood-thinning compound. Ceylon Cinnamon typically contains less than 0.004%. This stark difference makes Ceylon Cinnamon the only safe choice for daily wellness consumption.</p>
            <br/>
            <h3>Volatile Magic</h3>
            <p>Our recent gas chromatography analysis reveals that the "sweetness" of Ceylon Cinnamon comes not from sugar, but from the complex interaction of these volatile oils. It is a sensory trick, a chemical poem written by the soil and sun of Sri Lanka, leading the brain to perceive sweetness without a caloric cost.</p>
        `
    },
    {
        id: 3,
        title: "Daughters of the Southern Soil",
        excerpt: "Meet the master artisans of Matara. How our collective initiative is rewriting the narrative of female empowerment in the spice trade through fair wages and artisanal healthcare.",
        date: "Dec 20, 2023",
        author: "Shamalka Edirisinghe",
        image: "/explore/artisan.png",
        category: "Heritage",
        readingTime: "12 min read",
        content: `
            <p>In the cinnamon industry, the peeler is king—or historically, queen. The delicate art of separating the inner bark from the outer layer without breaking the quill requires a dexterity that has traditionally been maintained by the women of the Southern Province.</p>
            <br/>
            <h3>Rewriting the Narrative</h3>
            <p>For too long, this skilled labor was undervalued. The new "Southern Soil" collective initiative is changing that. By establishing fixed fair-trade wages and providing specialized healthcare for the repetitive strain issues common in peeling, we are ensuring that this ancient craft remains a viable and dignified livelihood for the next generation.</p>
            <br/>
            <h3>The Matara Standard</h3>
            <p>These women are not just workers; they are artisans. The "Alba" grade quill—no thicker than a pencil—is the ultimate test of a peeler's skill. It takes years to master. Today, the women of Matara are finally being recognized as the custodians of a UNESCO-worthy intangible cultural heritage.</p>
        `
    }
];

const featuredStory = {
    id: 0,
    title: "The Architecture of a Perfect Quill",
    excerpt: "A visual glossary of the grades. Understanding the structural integrity and peeling techniques that define the Alba, Continental, and Mexican grades of Ceylon Cinnamon.",
    date: "Jan 28, 2024",
    author: "Editorial Board",
    image: "/explore/plantation.png",
    category: "Featured Essay",
    readingTime: "15 min read",
    content: `
        <p>A cinnamon quill is not just a rolled piece of bark; it is a structural marvel. To the untrained eye, they appear similar, but to the connoisseur, the tightness of the scroll and the thinness of the bark tell a story of origin and skill.</p>
        <br/>
        <h3>The Alba: The Gold Standard</h3>
        <p>The Alba grade represents the pinnacle of the peeler's art. Sourced from the tenderest shoots, these quills are rolled so tightly they resemble a solid pencil. The bark is paper-thin, allowing for a quick release of flavor and a brittle snap that releases a burst of sweet aroma. It is the champagne of spices.</p>
        <br/>
        <h3>Technique as Tradition</h3>
        <p>Creating these quills involves a technique known as "telescoping," where smaller quills are inserted into larger ones to form a continuous, seamless tube. This prevents breakage and preserves the essential oils in the hollow center. It is a method unique to Sri Lanka, unchanged for centuries.</p>
    `
};

export default function StoriesPage() {
    const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0.1]);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-[#F3EFE9] selection:bg-[#D2B48C] selection:text-black font-sans overflow-x-hidden">

            {/* --- 1. EDITORIAL HERO --- */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
                {/* Cinematic Background */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ y: backgroundY, opacity: backgroundOpacity }}
                        className="absolute inset-0 scale-110"
                    >
                        <Image
                            src="/stories-hero-bg.png"
                            alt="The Sovereign Journal Background"
                            fill
                            className="object-cover grayscale-[0.2]"
                            priority
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505] z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent z-20" />
                </div>

                <div className="container relative z-30 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            <span className="inline-block text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-12">
                                The Sovereign Journal
                            </span>
                            <h1 className="text-[clamp(3rem,10vw,11rem)] font-serif font-light leading-[0.8] mb-16 tracking-tighter">
                                Essays from <br />
                                <span className="italic text-white/20">the Heartland.</span>
                            </h1>
                            <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-white/40 font-light max-w-4xl mx-auto leading-relaxed italic border-x border-white/5 px-12 font-serif">
                                A curated collection of observations, scientific research, and artisanal portraits from the epicenter of the world's finest spice.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Vertical Descriptor Layer */}
                <div className="absolute left-10 bottom-20 z-30 hidden xl:block">
                    <div className="flex items-center gap-6 rotate-90 origin-left">
                        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/10 whitespace-nowrap">Volume IV / Issue I</span>
                        <div className="w-12 h-px bg-white/5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#D2B48C]/30 whitespace-nowrap">Heritage & Science</span>
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
                        onClick={() => setSelectedStory(featuredStory)}
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
                                <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden mb-16 shadow-3xl bg-[#080808] border border-white/5 cursor-pointer" onClick={() => setSelectedStory(story)}>
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-10 left-10 z-10">
                                        <span className="bg-[#050505]/60 backdrop-blur-3xl px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] text-[#D2B48C] border border-white/10 italic">
                                            {story.category}
                                        </span>
                                    </div>
                                    {/* Action Reveal */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center gap-6 z-20">
                                        <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/10 flex items-center justify-center hover:bg-[#D2B48C] transition-all duration-500">
                                            <Share2 size={20} className="text-white" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedStory(story);
                                            }}
                                            className="h-16 px-10 rounded-full bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#D2B48C] transition-all duration-500"
                                        >
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

                                <h3 className="text-4xl md:text-6xl font-serif font-light mb-8 leading-[0.9] tracking-tighter group-hover:text-[#D2B48C] transition-colors cursor-pointer" onClick={() => setSelectedStory(story)}>
                                    {story.title}
                                </h3>

                                <p className="text-white/40 font-light leading-relaxed mb-12 text-xl border-l border-white/5 pl-10 italic">
                                    {story.excerpt}
                                </p>

                                <div className="flex justify-between items-center py-8 border-t border-white/5 mt-auto">
                                    <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em] leading-none">{story.readingTime}</span>
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="text-[11px] font-bold uppercase tracking-[0.4em] flex items-center gap-4 group-hover:translate-x-4 transition-transform hover:text-[#D2B48C]"
                                    >
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

            <AnimatePresence>
                {selectedStory && (
                    <StoryModal
                        story={selectedStory}
                        onClose={() => setSelectedStory(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function StoryModal({ story, onClose }: { story: typeof stories[0], onClose: () => void }) {
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
                className="relative w-full max-w-5xl bg-[#0A0A0A] rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl my-auto"
            >
                <div className="relative h-96 w-full">
                    <Image src={story.image} alt={story.title} fill className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:rotate-90 z-20"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-12 left-12 md:left-24 right-12">
                        <span className="text-[#D2B48C] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block bg-black/50 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/10">{story.category}</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white leading-none tracking-tighter">{story.title}</h2>
                    </div>
                </div>

                <div className="p-12 md:p-24 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    <div className="flex items-center gap-8 mb-16 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-8">
                        <span className="flex items-center gap-3">
                            <Calendar size={14} className="text-[#D2B48C]" /> {story.date}
                        </span>
                        <span className="flex items-center gap-3">
                            <User size={14} className="text-[#D2B48C]" /> {story.author}
                        </span>
                        <span className="ml-auto text-[#D2B48C]">
                            {story.readingTime}
                        </span>
                    </div>

                    <div
                        className="prose prose-invert prose-lg max-w-none text-white/50 font-light font-serif leading-loose"
                        dangerouslySetInnerHTML={{ __html: story.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-white/5 flex justify-center">
                        <Button
                            onClick={onClose}
                            className="bg-[#D2B48C]/10 text-[#D2B48C] hover:bg-[#D2B48C] hover:text-black rounded-full h-16 px-12 text-[10px] font-bold uppercase tracking-[0.3em] transition-all"
                        >
                            Back to Journal
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
