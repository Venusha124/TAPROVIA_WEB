"use client";

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, User, Search, Menu, X, LayoutDashboard, LogOut } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchOverlay } from "./search-overlay"
import { useCart } from "@/providers/cart-provider"
import { getCustomerUser, logoutCustomer } from "@/actions/customer-auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
    const { cartCount } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const { scrollY } = useScroll();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCustomerUser();
            setUser(userData);
        };
        fetchUser();
    }, []);

    // Transform values for marquee collapse
    const marqueeHeight = useTransform(scrollY, [0, 50], ["auto", "0px"]);
    const marqueeOpacity = useTransform(scrollY, [0, 30], [1, 0]);
    const headerBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0,0,0,0.4)", "rgba(5,5,5,0.8)"]
    );
    const headerBorder = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255,255,255,0.05)", "rgba(210,180,140,0.1)"] // Goldish hint on scroll
    );

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Our Products", href: "/products" },
        { name: "Explore Products", href: "/explore" },
        { name: "Stories", href: "/stories" },
        { name: "Gallery", href: "/gallery" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" }
    ];

    return (
        <>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Cinematic Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex flex-col p-8 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-24">
                            <span className="font-serif text-3xl font-light tracking-[-0.05em] text-white">
                                TAPRO<span className="text-[#D2B48C] italic">VIA</span>
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white/40 hover:text-white bg-white/5 rounded-full w-14 h-14"
                            >
                                <X className="h-8 w-8" />
                            </Button>
                        </div>

                        <nav className="flex flex-col space-y-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-4xl font-serif font-light text-white/40 hover:text-[#D2B48C] transition-all italic active:text-[#D2B48C]"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-auto pt-12 border-t border-white/5">
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D2B48C] mb-6 block">Registry Desk</span>
                            <div className="space-y-2">
                                <p className="text-white/40 text-sm font-light italic">exports@taprovia.com</p>
                                <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase mt-4">Matara Highlands, Sri Lanka</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 right-0 z-[100] flex flex-col"
            >
                {/* Sovereign Top Bar - Collapsible */}
                <motion.div
                    style={{ height: marqueeHeight, opacity: marqueeOpacity }}
                    className="bg-[#D2B48C] text-black text-[9px] font-bold tracking-[0.4em] uppercase overflow-hidden"
                >
                    <div className="py-2 px-4 flex">
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
                </motion.div>

                <motion.header
                    style={{ backgroundColor: headerBackground, borderColor: headerBorder }}
                    className="w-full backdrop-blur-3xl border-b transition-colors duration-500"
                >
                    <div className="container relative flex flex-col py-4 md:py-6 px-4">
                        <div className="flex items-center justify-between w-full mb-4 md:mb-6">
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
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMenuOpen(true)}
                                    className="text-white hover:bg-white/5 active:scale-95 transition-all"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Center: Logo */}
                            <div className="flex-0 flex flex-col items-center">
                                <Link href="/" className="flex flex-col items-center">
                                    <span className="font-serif text-3xl md:text-4xl font-light tracking-[-0.05em] text-white">
                                        TAPRO<span className="text-[#D2B48C] italic">VIA</span>
                                    </span>
                                    <span className="text-[6px] md:text-[8px] font-bold tracking-[1em] text-white/20 uppercase mt-2 hidden md:block">Sovereign Collection</span>
                                </Link>
                            </div>

                            {/* Right: User & Cart */}
                            <div className="flex-1 flex justify-end items-center space-x-6">
                                <div className="hidden md:flex">
                                    {user ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="hover:bg-white/5 text-white/40 hover:text-white transition-all outline-none">
                                                    <User className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-[#0A0A0A] border-white/10 text-white">
                                                <div className="px-2 py-2 flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{user.full_name}</p>
                                                    <p className="text-xs text-white/50 leading-none truncate">{user.email}</p>
                                                </div>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <Link href="/account">
                                                    <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white">
                                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                                        <span>My Account</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-400 focus:bg-red-400/10 focus:text-red-400 flex items-center"
                                                    onClick={async () => {
                                                        await logoutCustomer();
                                                        window.location.href = '/login';
                                                    }}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    <span>Log out</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Link href="/login">
                                            <Button variant="ghost" size="icon" className="hover:bg-white/5 text-white/40 hover:text-white transition-all">
                                                <User className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                <Link href="/cart">
                                    <Button variant="ghost" size="icon" className="relative hover:bg-white/5 text-white/40 hover:text-white transition-all">
                                        <ShoppingBag className="h-5 w-5" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#D2B48C] text-black text-[10px] font-bold flex items-center justify-center rounded-full px-1">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* BOTTOM ROW: Navigation */}
                        <nav className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
                            {navLinks.map((link) => (
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
                </motion.header>
            </motion.div>
        </>
    )
}
