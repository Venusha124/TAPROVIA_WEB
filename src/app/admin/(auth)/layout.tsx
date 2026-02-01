"use client";

import React from "react";
import Image from "next/image";

export default function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] text-[#F3EFE9] font-sans selection:bg-[#D2B48C] selection:text-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png" // Fallback to hero-bg if specific admin bg not available
                    alt="Background"
                    fill
                    className="object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-12">
                    <span className="text-3xl font-serif font-bold tracking-wider text-[#D2B48C]">TAPROVIA</span>
                    <p className="text-white/30 text-xs uppercase tracking-[0.3em] mt-4">Command Center</p>
                </div>
                {children}
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-[10px] text-white/20 uppercase tracking-widest">Secured by Sovereign Protocols</p>
            </div>
        </div>
    );
}
