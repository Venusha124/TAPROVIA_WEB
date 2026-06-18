"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        text: "The Alba grade cinnamon we received from Taprovia has completely transformed our artisanal bakery line. The sweetness and purity are unmatched.",
        author: "Eleanor Vance",
        role: "Head Chef, Patisserie Lumiere"
    },
    {
        id: 2,
        text: "Finding a reliable B2B partner for authentic Ceylon spices was difficult until we found Taprovia. Their direct-to-farm approach ensures we get the freshest batch every time.",
        author: "Marcus Chen",
        role: "Procurement Director, Spice World Inc."
    },
    {
        id: 3,
        text: "We exclusively use their Cinnamon Bark Oil in our luxury skincare formulations. The aromatic profile is incredible and perfectly consistent.",
        author: "Sarah Jenkins",
        role: "Founder, Botanica Skincare"
    }
];

export function TestimonialCarousel() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-24 relative overflow-hidden bg-[url('/gallery/gallery-2.jpg')] bg-cover bg-center bg-fixed">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">What Our Partners Say</h2>
                </div>

                <div className="relative max-w-4xl mx-auto h-[350px] md:h-[250px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-full px-8 md:px-0"
                        >
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
                                <Quote className="absolute -top-6 -left-6 w-32 h-32 text-white/5 rotate-180 group-hover:scale-110 transition-transform duration-700" />
                                <p className="relative z-10 text-xl md:text-2xl text-gray-100 font-serif italic leading-relaxed text-center mb-8">
                                    "{testimonials[index].text}"
                                </p>
                                <div className="text-center relative z-10">
                                    <h4 className="text-white font-bold text-lg">{testimonials[index].author}</h4>
                                    <p className="text-[#D2B48C] text-sm uppercase tracking-widest mt-1">{testimonials[index].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button 
                        onClick={prev}
                        className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#D2B48C] border border-white/20 hover:border-[#D2B48C] text-white backdrop-blur transition-all z-20"
                    >
                        <ChevronLeft />
                    </button>
                    <button 
                        onClick={next}
                        className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#D2B48C] border border-white/20 hover:border-[#D2B48C] text-white backdrop-blur transition-all z-20"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
