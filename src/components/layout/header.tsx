"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Story", href: "/about" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" }
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-6xl xl:max-w-7xl z-[100] transition-all duration-500 rounded-full border",
                isScrolled 
                    ? "top-4 bg-white/70 backdrop-blur-md shadow-xl border-white/30 py-2" 
                    : "top-6 bg-white/95 backdrop-blur-sm shadow-sm border-gray-100 py-3"
            )}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-8 h-8 md:w-10 md:h-10">
                            <Image 
                                src="/logo.png" 
                                alt="Taprovia Logo" 
                                fill 
                                className="object-contain"
                            />
                        </div>
                        <span className="font-serif font-bold text-xl md:text-2xl text-gray-900 tracking-tight">TAPROVIA</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-[11px] xl:text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#D2B48C]",
                                        isActive ? "text-[#D2B48C]" : "text-gray-600"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link href="/contact" className="p-2 text-gray-600 hover:text-[#D2B48C] transition-colors">
                            <User size={20} />
                        </Link>
                        <Link href="/contact">
                            <Button className="bg-[#D2B48C] hover:bg-[#b09673] text-white rounded-full px-6 uppercase text-xs tracking-widest font-bold">
                                Get a Quote
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg py-4 rounded-b-3xl">
                    <nav className="flex flex-col container mx-auto px-4 gap-4">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "py-2 text-sm font-bold uppercase tracking-widest transition-colors",
                                        isActive ? "text-[#D2B48C]" : "text-gray-600"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                            <Link href="/contact">
                                <Button variant="outline" className="w-full uppercase text-xs tracking-widest font-bold text-gray-600">
                                    <User size={16} className="mr-2" /> Login
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="w-full bg-[#D2B48C] hover:bg-[#b09673] text-white uppercase text-xs tracking-widest font-bold">
                                    Get a Quote
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
