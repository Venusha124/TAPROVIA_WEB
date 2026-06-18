"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const cards = [
    {
        id: 1,
        title: "1. Hand Harvesting",
        description: "Our skilled farmers carefully select the mature cinnamon trees and harvest them by hand to ensure optimal quality.",
        image: "/gallery/gallery-1.jpg"
    },
    {
        id: 2,
        title: "2. Artisanal Peeling",
        description: "The delicate inner bark is peeled using traditional brass tools passed down through generations.",
        image: "/gallery/gallery-2.jpg"
    },
    {
        id: 3,
        title: "3. Sun Drying",
        description: "The quills are slowly dried in the warm Sri Lankan sun, allowing the natural oils and sweet flavors to concentrate.",
        image: "/gallery/gallery-3.jpg"
    },
    {
        id: 4,
        title: "4. Global Export",
        description: "Packaged with care, our premium Alba grade cinnamon is ready to be shipped fresh to your doorstep.",
        image: "/gallery/gallery-1.jpg"
    }
];

export function HorizontalProcess() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-gray-900 text-white">
            <div className="sticky top-0 flex flex-col h-screen justify-center overflow-hidden pt-24 md:pt-32">
                <div className="px-4 md:px-20 mb-8 md:mb-12 shrink-0">
                    <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-2 block">Our Process</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold">Farm to Table Journey</h2>
                </div>
                
                <motion.div style={{ x }} className="flex gap-8 px-4 md:px-20">
                    {cards.map((card) => (
                        <div key={card.id} className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[450px] overflow-hidden bg-gray-800 rounded-3xl shrink-0 border border-white/10">
                            <Image src={card.image} alt={card.title} fill className="object-cover opacity-60 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-10">
                                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{card.title}</h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
