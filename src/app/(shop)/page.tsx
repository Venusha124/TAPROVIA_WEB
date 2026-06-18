"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sun, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { HorizontalProcess } from "@/components/ui/HorizontalProcess";
import { CursorImageReveal } from "@/components/ui/CursorImageReveal";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-[#D2B48C]" />,
    title: "100% Pure & Natural",
    desc: "Sourced directly from organic farms in Sri Lanka with zero additives."
  },
  {
    icon: <Sun className="w-8 h-8 text-[#D2B48C]" />,
    title: "Sun-Dried Artisanal",
    desc: "Traditionally hand-peeled and slow-dried in the warm Sri Lankan sun."
  },
  {
    icon: <Award className="w-8 h-8 text-[#D2B48C]" />,
    title: "Premium Alba Grade",
    desc: "We specialize in the rarest, finest, and sweetest cinnamon grade."
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Ceylon Alba Sticks",
    image: "/products/cinnamon_powder_spoon.png",
    price: "From $24.99",
    rating: 5.0
  },
  {
    id: 2,
    name: "Pure Cinnamon Oil",
    image: "/products/oil.png",
    price: "From $19.99",
    rating: 4.9
  },
  {
    id: 3,
    name: "Premium Ground Powder",
    image: "/products/cinnamon_powder_bowl.png",
    price: "From $14.99",
    rating: 4.8
  },
  {
    id: 4,
    name: "Artisanal Gift Set",
    image: "/products/gift-set.png",
    price: "From $49.99",
    rating: 5.0
  }
];

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg-2.png" 
            alt="Ceylon Cinnamon Plantation" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6">
            Direct from Sri Lanka
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            The World's Finest <br /> Ceylon Cinnamon
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md">
            Experience the true, delicate sweetness of authentic Alba grade cinnamon, sustainably harvested from the highlands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" className="bg-[#D2B48C] hover:bg-[#b09673] text-white font-bold px-8 h-14 rounded-full text-sm uppercase tracking-widest transition-all">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md font-bold px-8 h-14 rounded-full text-sm uppercase tracking-widest transition-all">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Features Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} 
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#D2B48C]/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HorizontalProcess />

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-2 block">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Featured Products</h2>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-[#D2B48C] hover:text-gray-900 font-bold text-sm uppercase tracking-widest transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/products`} key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-[#D2B48C] text-[#D2B48C]" />
                    <span className="text-sm font-bold text-gray-600">{product.rating}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-[#D2B48C] font-bold mt-auto pt-4">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Teaser Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/gallery/gallery-2.jpg" 
                alt="Plantation Path" 
                fill 
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 lg:pl-10"
            >
              <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">The Taprovia Legacy</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">From Our Roots to Your Table</h2>
              
              <blockquote className="border-l-4 border-[#D2B48C] pl-6 py-2 my-8 italic font-serif text-xl md:text-2xl text-gray-300 bg-white/5 rounded-r-xl">
                "We still use the traditional 45-degree peel method to preserve the delicate inner bark, ensuring that every quill delivers maximum flavor."
              </blockquote>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-10 text-justify">
                For generations, our family has cultivated the finest cinnamon in the southern highlands of Sri Lanka. Our commitment to <CursorImageReveal imageSrc="/gallery/gallery-1.jpg">sustainable farming</CursorImageReveal> and <CursorImageReveal imageSrc="/gallery/gallery-3.jpg">artisanal harvesting</CursorImageReveal> ensures that every quill is a masterpiece of flavor and health benefits.
              </p>
              
              <Link href="/about">
                <Button className="bg-[#D2B48C] hover:bg-white hover:text-gray-900 text-white font-bold px-8 py-6 rounded-full text-sm uppercase tracking-widest transition-all">
                  Discover Our Story
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

    </div>
  );
}
