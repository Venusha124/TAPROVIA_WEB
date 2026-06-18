"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
    { id: 1, title: "Sovereign Flora", category: "Harvest", image: "/gallery/gallery-1.jpg" },
    { id: 2, title: "Plantation Path", category: "Harvest", image: "/gallery/gallery-2.jpg" },
    { id: 3, title: "Distillery Vessel", category: "Artisans", image: "/gallery/gallery-3.jpg" },
    { id: 4, title: "Lush Foliage", category: "Harvest", image: "/gallery/gallery-4.jpg" },
    { id: 5, title: "Tropical Canopy", category: "Harvest", image: "/gallery/gallery-5.jpg" },
    { id: 6, title: "The Highland Ritual", category: "Harvest", image: "/hero-bg-3.png" },
    { id: 7, title: "Morning Harvest", category: "Harvest", image: "/hero-bg-2.png" },
    { id: 8, title: "Artisanal Quills", category: "Products", image: "/explore/quills.png" },
    { id: 9, title: "Steam Distillation", category: "Artisans", image: "/explore/alchemy.png" },
    { id: 10, title: "Sovereign Plantation", category: "Harvest", image: "/explore/plantation.png" },
    { id: 11, title: "Artisan at Work", category: "Artisans", image: "/explore/artisan.png" },
    { id: 12, title: "Premium Cinnamon Powder", category: "Products", image: "/products/cinnamon_powder_bowl.png" },
];

const categories = ["All", "Harvest", "Artisans", "Products"];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

    const filtered = activeCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans pb-24 pt-32">

            {/* Hero Section */}
            <div className="container px-4 mx-auto mb-16 text-center">
                <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Visual Archive
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                    Our Gallery
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                    A visual journey through our spice farms, artisan workshops, and premium product collection.
                </p>
            </div>

            {/* Category Filter */}
            <div className="container px-4 mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                                activeCategory === cat
                                    ? "bg-[#D2B48C] text-white border-[#D2B48C]"
                                    : "bg-white text-gray-500 border-gray-200 hover:border-[#D2B48C] hover:text-[#D2B48C]"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="container px-4 mx-auto">
                <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    <AnimatePresence>
                    {filtered.map((img) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={img.id}
                            className="relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group shadow-sm border border-gray-100"
                            onClick={() => setLightboxImage(img)}
                        >
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <Image
                                    src={img.image}
                                    alt={img.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-xs uppercase tracking-widest transition-opacity duration-300 bg-black/40 px-4 py-2 rounded-full">
                                        View Photo
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="font-bold text-gray-800 text-sm">{img.title}</h3>
                                <span className="text-xs text-[#D2B48C] uppercase tracking-widest font-bold">{img.category}</span>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        onClick={() => setLightboxImage(null)}
                    >
                        <X size={20} />
                    </button>
                    <div
                        className="relative max-w-5xl w-full aspect-video rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightboxImage.image}
                            alt={lightboxImage.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="absolute bottom-6 text-center">
                        <p className="text-white font-bold">{lightboxImage.title}</p>
                        <p className="text-[#D2B48C] text-xs uppercase tracking-widest">{lightboxImage.category}</p>
                    </div>
                </div>
            )}

        </div>
    );
}
