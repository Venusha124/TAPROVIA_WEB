"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Heart,
    MessageCircle,
    ArrowRight,
    Share2,
    Star,
    Leaf,
    Sparkles,
    MoveRight,
    Layers,
    Compass,
    CheckCircle2,
    Quote,
    ShoppingCart,
    PhoneCall,
    X,
    ChevronRight,
    Minus,
    Plus,
    Trash2,
    MapPin,
    Info,
    ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
    {
        id: 1,
        name: "Ceylon Alba Sticks",
        badge: "Highest Grade",
        origin: "Southern Sri Lanka",
        grade: "Alba",
        image: "/products/cinnamon_powder_spoon.png",
        category: "Sticks",
        description: "The most prized grade of Ceylon cinnamon, known for its slender diameter and exceptional sweetness.",
        rating: 5.0,
        reviews: 48,
        scale: 1,
        parallax: 0,
        features: ["Ultra-Thin Quills", "Hand-Peeled", "Golden Hue"]
    },
    {
        id: 2,
        name: "Cinnamon Leaf Oil",
        badge: "Aromatic Essence",
        origin: "Matara Highlands",
        grade: "Pure Leaf Extract",
        image: "/products/oil.png",
        category: "Oils",
        description: "Steam-distilled from the leaves, this oil offers a rich, clove-like aroma perfect for wellness and culinary use.",
        rating: 4.9,
        reviews: 32,
        scale: 1,
        parallax: 0,
        features: ["High Eugenol", "Natural Distillation", "Sustainably Sourced"]
    },
    {
        id: 3,
        name: "Ceylon Cinnamon Powder",
        badge: "Kitchen Essential",
        origin: "Ratnapura",
        grade: "Extra Fine",
        image: "/products/cinnamon_powder_bowl.png",
        category: "Powders",
        description: "Finely ground premium quills, delivering the authentic warmth and sweetness of Ceylon in a versatile form.",
        rating: 4.8,
        reviews: 124,
        scale: 1,
        parallax: 0,
        features: ["Micro-milled", "No Additives", "Coumarin-free"]
    },
    {
        id: 4,
        name: "Ceylon Quills",
        badge: "Artisanal Classic",
        origin: "Galle District",
        grade: "Custom Lengths",
        image: "/products/cinnamon_powder_spoon.png",
        category: "Sticks",
        description: "Uniformly hand-filled quills that preserve the full aromatic profile of the inner bark.",
        rating: 4.9,
        reviews: 86,
        scale: 1,
        parallax: 0,
        features: ["Slow-Dried", "Hand-Filled", "Rich Aroma"]
    },
    {
        id: 5,
        name: "Cinnamon Powder (Export)",
        badge: "Global Standard",
        origin: "Multi-Region",
        grade: "Export Ready",
        image: "/products/cinnamon_powder_bowl.png",
        category: "Bulk & Exports",
        description: "Optimized for global distribution, maintaining potency and flavor for industrial and retail partners.",
        rating: 4.7,
        reviews: 15,
        scale: 1,
        parallax: 0,
        features: ["Standardized Quality", "Sealed for Export", "Bulk Availability"]
    },
    {
        id: 6,
        name: "Cinnamon Bark Oil",
        badge: "Rare Concentrate",
        origin: "Southern Sri Lanka",
        grade: "Premium Bark Extract",
        image: "/products/oil.png",
        category: "Oils",
        description: "Extracted from the bark itself, this oil represents the pinnacle of cinnamon potency and complexity.",
        rating: 5.0,
        reviews: 12,
        scale: 1,
        parallax: 0,
        features: ["Intense Aroma", "High Purity", "Exclusive Reserve"]
    },
    {
        id: 7,
        name: "Cinnamon Imperiale",
        badge: "Sovereign Gift",
        origin: "Matara Estate",
        grade: "Alba Special",
        image: "/products/cinnamon_powder_spoon.png",
        category: "Sticks",
        description: "A ceremonial selection of our finest Alba quills, presented in a handcrafted mahogany chest for the ultimate connoisseur.",
        rating: 5.0,
        reviews: 8,
        scale: 1,
        parallax: 0,
        features: ["Gift Presentation", "Limited Harvest", "Certificate of Origin"]
    },
    {
        id: 8,
        name: "Ceylon Cinnamon Chips",
        badge: "Rustic Infusion",
        origin: "Ratnapura Wilds",
        grade: "H2 Standard",
        image: "/products/cinnamon_powder_bowl.png",
        category: "Bulk & Exports",
        description: "Sun-dried unpeeled bark chips rich in essential oils, perfectly suited for heavy infusions, mulled wines, and distillation bases.",
        rating: 4.6,
        reviews: 42,
        scale: 1,
        parallax: 0,
        features: ["High Oil Content", "Rough Cut", "Intense Flavor"]
    }
];

const testimonials = [
    {
        name: "Jean-Pierre Laurent",
        role: "Head Pastry Chef, Paris",
        content: "The aromatic complexity of TAPROVIA's Alba quills is unlike anything I've encountered in 20 years. It's not just a spice; it's a foundation for our desserts.",
        avatar: "/testimonials/chef1.png"
    },
    {
        name: "Sarah Chen",
        role: "Wellness Consultant, Singapore",
        content: "We use the Artisan Oil for our bespoke aromatherapy blends. The purity level is verified at 99%, which is essential for our clinical work.",
        avatar: "/testimonials/chef2.png"
    },
    {
        name: "Michael Ross",
        role: "Luxury Retail Buyer, London",
        content: "TAPROVIA is the Bentley of cinnamon. The packaging, the story, and the unparalleled quality make it our top-performing premium spice.",
        avatar: "/testimonials/chef3.png"
    }
];

const categories = ["All", "Sticks", "Oils", "Powders", "Bulk & Exports"];

type Product = (typeof products)[0];

const prologueSteps = [
    {
        id: "origin",
        title: "The Primordial Soil",
        subtitle: "CHAPTER I",
        description: "In the Southern Highlands of Sri Lanka, the red lateralite soil holds a secret—the highest concentration of Eugenol ever recorded in Cinnamomum zeylanicum.",
        image: "/explore/plantation.png"
    },
    {
        id: "timing",
        title: "The Dawn Rhythm",
        subtitle: "CHAPTER II",
        description: "The bark is most elastic at the break of dawn. Our artisans begin their work before the sun touches the hills, capturing the sap at its peak vitality.",
        image: "/explore/artisan.png"
    },
    {
        id: "purity",
        title: "The Alchemical Purity",
        subtitle: "CHAPTER III",
        description: "Beyond the harvest lies the vault. Through precise steam distillation, we extract the essence—a liquid gold that transcends mere spice.",
        image: "/explore/alchemy.png"
    }
];

const trustFeatures = [
    {
        title: "Batch Details",
        description: "Lot info, origin notes, and cinnamon type labeling.",
        icon: Layers
    },
    {
        title: "Quality Checks",
        description: "Consistency-focused checks before packing.",
        icon: CheckCircle2
    },
    {
        title: "Secure Packing",
        description: "Premium packaging designed for export shipping.",
        icon: ShoppingBag
    },
    {
        title: "Customer Care",
        description: "Fast responses and a premium buying experience.",
        icon: PhoneCall
    }
];

export default function ProductsPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    const toggleFavorite = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    return (
        <div ref={containerRef} className="relative bg-[#050505] text-[#F3EFE9] min-h-screen font-sans selection:bg-[#D2B48C] selection:text-black overflow-x-hidden">
            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

            {/* --- 1. THE SOVEREIGN PROLOGUE (CAROUSEL) --- */}
            <PrologueCarousel />

            {/* --- 2. THE SOVEREIGN GALLERY (ASYMMETRICAL) --- */}
            <div className="relative z-20 bg-[#050505]">
                {/* Gallery Hero */}
                <section className="relative py-60 overflow-hidden border-t border-white/5">
                    <div className="container px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="flex justify-center gap-6 mb-12">
                                <span className="w-12 h-px bg-[#D2B48C]/30 my-auto" />
                                <span className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px]">The Archive</span>
                                <span className="w-12 h-px bg-[#D2B48C]/30 my-auto" />
                            </div>
                            <h2 className="text-7xl md:text-[10rem] font-serif font-light leading-none mb-12 tracking-tighter">
                                The <span className="italic text-white/40">Gallery.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
                                "Observations of geological perfection, curated for the refined palate."
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filter Bar (Sticky) */}
                <section className="sticky top-0 z-[60] py-8 border-y border-white/5 backdrop-blur-3xl bg-black/60">
                    <div className="container px-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "relative px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all",
                                        activeCategory === cat ? "text-black bg-[#D2B48C]" : "text-white/30 hover:text-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Asymmetrical Gallery Grid */}
                <section className="py-20 relative">
                    <div className="container px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <GalleryItem
                                        key={product.id}
                                        product={product}
                                        index={index}
                                        isFavorite={favorites.includes(product.id)}
                                        onToggleFavorite={toggleFavorite}
                                        onSelect={() => setSelectedProduct(product)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Testimonials Segment */}
                <TestimonialsSection />

                {/* Trust & Transparency Feature */}
                <TrustAndTransparency />

                {/* The Sommelier's Note */}
                <section className="py-60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D2B48C]/5 to-transparent pointer-events-none" />
                    <div className="container px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="max-w-5xl mx-auto p-24 rounded-[5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D2B48C]/30 to-transparent" />

                            <span className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Sensory Analysis</span>
                            <h2 className="text-5xl md:text-7xl font-serif font-light mb-12 italic">The Sommelier's Note.</h2>
                            <p className="text-xl text-white/40 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
                                "Defined by a delicate sweetness and a complex, warm aroma. The 'True Cinnamon' signature features hints of citrus, clove, and a lingering floral finish."
                            </p>

                            {/* Tasting Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto">
                                {[
                                    { label: "Sweetness", val: 92 },
                                    { label: "Warmth", val: 96 },
                                    { label: "Complexity", val: 98 }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-4">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#D2B48C]">
                                            <span>{item.label}</span>
                                            <span>{item.val}/100</span>
                                        </div>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.val}%` }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-[#D2B48C]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* --- 3. THE VAULT (DETAIL EXPANSION) --- */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/98 backdrop-blur-3xl cursor-pointer"
                        />

                        <motion.div
                            layoutId={`gallery-${selectedProduct.id}`}
                            className="relative w-full max-w-7xl aspect-[16/9] bg-[#0A0A0A] rounded-[4rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                        >
                            {/* Left: Cinematic Image with Zoom */}
                            <div className="w-full md:w-1/2 relative overflow-hidden group">
                                <motion.div
                                    layoutId={`image-${selectedProduct.id}`}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
                                    />
                                </motion.div>
                                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                                    <div className="flex items-center gap-2 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={cn("fill-[#D2B48C] text-[#D2B48C]", i >= Math.floor(selectedProduct.rating) && "opacity-20")} />
                                        ))}
                                        <span className="text-xs font-bold text-white ml-2">{selectedProduct.rating} / 5.0</span>
                                        <span className="text-white/20 text-xs ml-2">({selectedProduct.reviews} reviews)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedProduct.features.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                                <CheckCircle2 size={12} className="text-[#D2B48C]" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: The Data Vault */}
                            <div className="w-full md:w-1/2 p-16 md:p-24 flex flex-col justify-center relative">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-12 right-12 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#D2B48C] transition-all"
                                >
                                    <ArrowRight className="rotate-180" size={24} />
                                </button>

                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block"
                                >
                                    {selectedProduct.badge} • {selectedProduct.category}
                                </motion.span>
                                <h2 className="text-6xl md:text-8xl font-serif font-light text-white mb-10">{selectedProduct.name}</h2>
                                <p className="text-xl text-white/30 font-light leading-relaxed mb-12 italic border-l-2 border-[#D2B48C]/20 pl-8">
                                    "{selectedProduct.description}"
                                </p>

                                <div className="grid grid-cols-1 gap-12 mb-16 border-t border-white/5 pt-12">
                                    <div>
                                        <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Availability</span>
                                        <span className="text-2xl font-serif text-white uppercase">Sovereign Direct</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Button
                                        onClick={() => router.push('/contact')}
                                        className="w-full bg-[#D2B48C] hover:bg-white text-black font-bold h-24 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all group shadow-xl"
                                    >
                                        <MessageCircle size={18} className="mr-4 group-hover:-translate-y-1 transition-transform" />
                                        Enquire
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}

function PrologueCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % prologueSteps.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % prologueSteps.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + prologueSteps.length) % prologueSteps.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background Transition */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={prologueSteps[currentIndex].image}
                        alt={prologueSteps[currentIndex].title}
                        fill
                        className="object-cover opacity-60 grayscale-[0.3]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </motion.div>
            </AnimatePresence>

            <div className="container relative z-10 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-[#D2B48C] font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">
                                {prologueSteps[currentIndex].subtitle}
                            </span>
                            <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white mb-10 leading-none tracking-tighter">
                                {prologueSteps[currentIndex].title}
                            </h2>
                            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed italic">
                                "{prologueSteps[currentIndex].description}"
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation & Progress */}
            <div className="absolute bottom-12 right-12 flex items-center gap-12 z-20">
                <div className="flex gap-4">
                    <button onClick={prevSlide} className="text-white/30 hover:text-[#D2B48C] transition-colors">
                        <ArrowRight className="rotate-180" size={24} />
                    </button>
                    <button onClick={nextSlide} className="text-white/30 hover:text-[#D2B48C] transition-colors">
                        <ArrowRight size={24} />
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-[12px] font-bold text-[#D2B48C] tabular-nums">
                        {currentIndex + 1} <span className="text-white/20 mx-2">/</span> {prologueSteps.length}
                    </span>
                    <div className="w-24 h-px bg-white/10 relative overflow-hidden">
                        <motion.div
                            key={currentIndex}
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="absolute inset-0 bg-[#D2B48C]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function GalleryItem({ product, index, isFavorite, onToggleFavorite, onSelect }: {
    product: Product,
    index: number,
    isFavorite: boolean,
    onToggleFavorite: (e: React.MouseEvent, id: number) => void,
    onSelect: () => void
}) {
    const router = useRouter();
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    return (
        <motion.div
            ref={itemRef}
            layoutId={`gallery-${product.id}`}
            className="relative group cursor-pointer"
            onClick={onSelect}
        >
            <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden bg-white/5 border border-white/5 shadow-3xl">
                <motion.div layoutId={`image-${product.id}`} className="w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
                    />
                </motion.div>

                {/* Visual Feedback Badges */}
                <div className="absolute top-12 left-12 flex flex-col gap-3">
                    <span className="px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                        {product.badge}
                    </span>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2B48C]/10 backdrop-blur-md border border-[#D2B48C]/30 self-start">
                        <Star size={10} className="fill-[#D2B48C] text-[#D2B48C]" />
                        <span className="text-[9px] font-bold text-[#D2B48C] tracking-widest">{product.rating}</span>
                    </div>
                </div>

                {/* Interaction Overlay */}
                <div className="absolute top-12 right-12 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button
                        onClick={(e) => onToggleFavorite(e, product.id)}
                        className={cn(
                            "w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all",
                            isFavorite ? "bg-red-500/20 border-red-500 text-red-500" : "bg-black/40 border-white/10 text-white hover:border-[#D2B48C]"
                        )}
                    >
                        <Heart size={18} className={cn(isFavorite && "fill-current")} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:border-[#D2B48C] transition-all">
                        <Share2 size={18} />
                    </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="w-8 h-px bg-[#D2B48C]/50" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D2B48C]">
                            {product.grade}
                        </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 transform group-hover:translate-x-4 transition-transform duration-700">
                        {product.name}
                    </h3>

                    <div className="flex flex-col gap-4 py-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Sovereign Reserve</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Examine Detail</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                                    <MoveRight size={14} />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push('/contact');
                            }}
                            className="w-full bg-[#D2B48C] hover:bg-white text-black font-bold h-14 rounded-full text-[9px] uppercase tracking-[0.3em] transition-all group"
                        >
                            <MessageCircle size={14} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
                            Enquire Now
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function TestimonialsSection() {
    return (
        <section className="py-60 relative overflow-hidden bg-white/[0.01]">
            <div className="container px-4">
                <div className="text-center mb-40">
                    <span className="text-[#D2B48C] font-bold tracking-[0.6em] uppercase text-[11px] mb-8 block">Voice of Connoisseurs</span>
                    <h2 className="text-6xl md:text-[8rem] font-serif font-light text-white leading-none tracking-tighter italic">Global Credibility.</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0 hidden lg:block" />
                    {testimonials.map((test, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-black/40 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/5 relative z-10 hover:bg-white/[0.03] transition-colors group"
                        >
                            <Quote className="text-[#D2B48C] mb-12 opacity-30 group-hover:opacity-100 transition-opacity" size={40} />
                            <p className="text-2xl text-white/50 font-light leading-relaxed mb-16 italic">
                                "{test.content}"
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D2B48C]/50 to-transparent border border-white/10 flex items-center justify-center relative grayscale group-hover:grayscale-0 transition-all">
                                    <span className="text-xl font-serif text-white">{test.name[0]}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-serif text-xl">{test.name}</span>
                                    <span className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-widest mt-1 opacity-60">{test.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TrustAndTransparency() {
    const router = useRouter();
    return (
        <section className="py-40 bg-black text-[#F3EFE9] border-y border-white/5 relative overflow-hidden mt-40 rounded-[4rem] mx-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.2]">
                <div className="absolute inset-0 bg-[url('/explore/plantation.png')] bg-cover bg-fixed grayscale pointer-events-none" />
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <div className="container relative z-10 px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
                    <div>
                        <span className="text-[#D2B48C] font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Our Commitment</span>
                        <h2 className="text-6xl md:text-8xl font-serif font-light mb-8 tracking-tighter text-white">Trust & <br />Transparency</h2>
                        <p className="text-xl md:text-2xl font-light text-white/50 max-w-2xl leading-relaxed italic border-l-2 border-[#D2B48C]/50 pl-8">
                            Clear product information, careful handling, and premium export readiness.
                        </p>
                    </div>
                    <Button onClick={() => router.push('/contact')} className="bg-[#D2B48C] hover:bg-white text-black font-bold h-20 px-12 rounded-full text-[11px] uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(210,180,140,0.2)]">
                        Ask for Specifications
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustFeatures.map((feature, i) => (
                        <div key={i} className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2.5rem] hover:bg-white/[0.05] transition-all duration-500 border border-white/5 group hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-full bg-[#D2B48C]/10 border border-[#D2B48C]/20 flex items-center justify-center text-[#D2B48C] mb-8 group-hover:bg-[#D2B48C] group-hover:text-black transition-all">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-2xl font-serif mb-4 text-white group-hover:text-[#D2B48C] transition-colors">{feature.title}</h3>
                            <p className="font-sans font-light text-white/40 leading-relaxed text-sm group-hover:text-white/60 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
