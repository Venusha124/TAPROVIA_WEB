"use client";

import React, { useState } from "react"
import Link from "next/link"
import { ShoppingBag, User, Search, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchOverlay } from "./search-overlay"

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <div className="relative z-[100] flex flex-col">
                {/* Sovereign Top Bar */}
                <div className="bg-[#D2B48C] text-black text-[9px] font-bold tracking-[0.4em] uppercase py-2 px-4 flex overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap">
                        <span className="mx-8">EST. 1924 | THE BENCHMARK OF CEYLON</span>
                        <span className="mx-8">•</span>
                        <span className="mx-8">GLOBAL LOGISTICS OPTIMIZED</span>
                        <span className="mx-8">•</span>
                        <span className="mx-8">SOVEREIGN PURITY GUARANTEED</span>
                        <span className="mx-8">•</span>
                        <span className="mx-8">CURATED ARCHIVE OF RARE GRADES</span>
                        <span className="mx-8">•</span>
                    </div>
                </div>

                <header className="w-full bg-black/40 backdrop-blur-3xl border-b border-white/5">
                    <div className="container relative flex flex-col py-8 px-4">

                        {/* TOP ROW: Search - Logo - Icons */}
                        <div className="flex items-center justify-between w-full mb-8">
                            {/* Left: Search */}
                            <div className="flex-1 flex justify-start hidden md:flex">
                                <Button
                                    onClick={() => setIsSearchOpen(true)}
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-white/5 text-white/40 hover:text-white transition-all"
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="md:hidden">
                                <Menu className="h-6 w-6 text-white" />
                            </div>

                            {/* Center: Logo */}
                            <div className="flex-0">
                                <Link href="/" className="flex flex-col items-center">
                                    <span className="font-serif text-4xl md:text-5xl font-light tracking-[-0.05em] text-white">
                                        TAPRO<span className="text-[#D2B48C] italic">VIA</span>
                                    </span>
                                    <span className="text-[8px] font-bold tracking-[1em] text-white/20 uppercase mt-2">Sovereign Collection</span>
                                </Link>
                            </div>

                            {/* Right: User & Cart */}
                            <div className="flex-1 flex justify-end items-center space-x-6">
                                <Button variant="ghost" size="icon" className="hover:bg-white/5 text-white/40 hover:text-white transition-all hidden md:flex">
                                    <User className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="relative hover:bg-white/5 text-white/40 hover:text-white transition-all">
                                    <ShoppingBag className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-[#D2B48C] rounded-full" />
                                </Button>
                            </div>
                        </div>

                        {/* BOTTOM ROW: Navigation */}
                        <nav className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Our Products", href: "/products" },
                                { name: "Explore Products", href: "/explore" },
                                { name: "Stories", href: "/stories" },
                                { name: "About Us", href: "/about" },
                                { name: "Contact Us", href: "/contact" }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 hover:text-[#D2B48C] transition-all relative group whitespace-nowrap"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#D2B48C] transition-all group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </header>
            </div>
        </>
    )
}
