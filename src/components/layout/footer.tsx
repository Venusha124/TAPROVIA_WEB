"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 font-sans">
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="relative w-8 h-8">
                                <Image 
                                    src="/logo.png" 
                                    alt="Taprovia Logo" 
                                    fill 
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-serif font-bold text-xl text-gray-900 tracking-tight">TAPROVIA</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Premium Ceylon Spices sourced directly from the highlands of Sri Lanka. Hand-harvested, ethically sourced, and globally trusted.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400">
                            <a href="#" className="hover:text-[#D2B48C] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-[#D2B48C] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-[#D2B48C] transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/products" className="text-sm hover:text-[#D2B48C] transition-colors">Our Products</Link></li>
                            <li><Link href="/about" className="text-sm hover:text-[#D2B48C] transition-colors">Our Story</Link></li>
                            <li><Link href="/gallery" className="text-sm hover:text-[#D2B48C] transition-colors">Gallery</Link></li>
                            <li><Link href="/contact" className="text-sm hover:text-[#D2B48C] transition-colors">Contact Us</Link></li>
                            <li><Link href="/wholesale" className="text-sm hover:text-[#D2B48C] transition-colors">Wholesale Inquiry</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-6">Customer Care</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/faq" className="text-sm hover:text-[#D2B48C] transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-sm hover:text-[#D2B48C] transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="text-sm hover:text-[#D2B48C] transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:text-[#D2B48C] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm hover:text-[#D2B48C] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-6">Contact Us</h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#D2B48C] shrink-0 mt-0.5" />
                                <span className="text-sm">Matara District,<br />Southern Province, Sri Lanka</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#D2B48C] shrink-0" />
                                <span className="text-sm">+94 77 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#D2B48C] shrink-0" />
                                <span className="text-sm">info@taprovia.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Taprovia. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Image src="/payment-icons.png" alt="Payment Methods" width={150} height={24} className="opacity-50 grayscale" unoptimized />
                    </div>
                </div>
            </div>
        </footer>
    );
}
