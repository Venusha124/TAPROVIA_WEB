import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans pb-24 pt-32">
            
            {/* Hero Section */}
            <div className="container px-4 mx-auto mb-20 text-center max-w-4xl">
                <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Our Story
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                    A Legacy of Purity
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Rooted in the lush highlands of Sri Lanka, Taprovia is dedicated to cultivating and sharing the finest Ceylon Cinnamon with the world. Our commitment to sustainable farming and artisanal harvesting ensures that every quill is a masterpiece of flavor and aroma.
                </p>
            </div>

            {/* Image Banner */}
            <div className="container px-4 mx-auto mb-24">
                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-lg">
                    <Image 
                        src="/hero-bg-3.png" 
                        alt="Cinnamon Harvesting" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Spices History */}
            <div className="container px-4 mx-auto mb-24">
                <div className="bg-[#D2B48C]/5 rounded-3xl p-10 md:p-16 border border-[#D2B48C]/20 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">The Origins</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold">A History Woven in Spice</h2>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl mb-10 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-[#D2B48C] first-letter:float-left first-letter:mr-4 first-letter:mt-1 text-justify">
                            For millennia, Ceylon Cinnamon—often referred to as "True Cinnamon"—has been a highly coveted treasure. Ancient Egyptian monarchs and Roman emperors prized this delicate spice above gold. Its sweet, warm aroma fueled the age of discovery, drawing explorers and merchants from across the globe to the shores of Taprobane, the ancient Greek name for Sri Lanka.
                        </p>
                        
                        <blockquote className="border-l-4 border-[#D2B48C] pl-8 py-4 my-12 italic font-serif text-2xl md:text-3xl text-gray-900 bg-gradient-to-r from-[#D2B48C]/10 to-transparent rounded-r-2xl shadow-sm">
                            "Unlike the common, harsher Cassia variety found elsewhere, Ceylon Cinnamon is unique to the island's perfect combination of tropical sun, monsoon rains, and rich soil."
                        </blockquote>
                        
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify">
                            At Taprovia, we are proud to continue this ancient legacy, preserving the exact same artisanal harvesting methods that have been passed down through generations of Sri Lankan farmers. Every quill tells the story of our heritage.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values / Details */}
            <div className="container px-4 mx-auto mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">The Taprovia Difference</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            We don't just sell spices; we curate an experience. Unlike standard cassia often sold as cinnamon, True Ceylon Cinnamon (Cinnamomum verum) is delicate, complex, and boasts profound health benefits with minimal coumarin levels.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            Our artisans use the traditional 45-degree peeling technique, an ancestral method that meticulously strips the fragile inner bark without damaging its essential oils.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-gray-900 text-xl mb-2">100%</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Organic Origin</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-xl mb-2">Zero</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Additives</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg">
                        <Image 
                            src="/gallery/gallery-4.jpg" 
                            alt="Lush Foliage" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="container px-4 mx-auto text-center bg-gray-50 rounded-3xl p-16 border border-gray-100">
                <h2 className="text-3xl font-serif font-bold mb-6">Taste the Authenticity</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Explore our collection of premium Alba-grade quills, pure essential oils, and finely ground powders.
                </p>
                <Link href="/products">
                    <Button className="bg-[#D2B48C] hover:bg-[#b09673] text-white font-bold px-10 py-6 rounded-full text-sm uppercase tracking-widest transition-all">
                        Shop Collection
                    </Button>
                </Link>
            </div>

        </div>
    );
}
