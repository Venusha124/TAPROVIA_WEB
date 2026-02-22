"use client";

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, User, Search, Menu, LogOut, LayoutDashboard } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchOverlay } from "./search-overlay"
import { getCustomerUser, logoutCustomer } from "@/actions/customer-auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
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

    return (
        <>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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

                        {/* TOP ROW: Search - Logo - Icons */}
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
                                <Menu className="h-6 w-6 text-white" />
                            </div>

                            {/* Center: Logo */}
                            <div className="flex-0">
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
                                        <span className="absolute top-0 right-0 w-2 h-2 bg-[#D2B48C] rounded-full" />
                                    </Button>
                                </Link>
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
                </motion.header>
            </motion.div>
        </>
    )
}
