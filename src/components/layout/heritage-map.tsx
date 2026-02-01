"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Info, Wind, Waves, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const regions = [
    { id: "nilwala", name: "Nilwala Basin", x: "40%", y: "60%", type: "Moist Zone", icon: <Waves size={16} /> },
    { id: "deniyaya", name: "Deniyaya Foothills", x: "30%", y: "40%", type: "Highland", icon: <Wind size={16} /> },
    { id: "matara", name: "Coastal Belt", x: "60%", y: "80%", type: "Sea-Spray Zone", icon: <Sun size={16} /> }
];

export function HeritageMap() {
    return (
        <div className="relative w-full aspect-[16/9] bg-white/[0.02] rounded-[4rem] border border-white/5 overflow-hidden group">
            {/* SVG Stylized Map Background */}
            <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-[2s]">
                <path
                    d="M 150 100 Q 200 50 250 100 T 350 150 T 450 100 T 550 150 T 650 100 T 750 150"
                    fill="none"
                    stroke="#D2B48C"
                    strokeWidth="0.5"
                    strokeDasharray="5 5"
                />
                <path
                    d="M 100 350 Q 200 400 300 350 T 500 400 T 700 350"
                    fill="none"
                    stroke="#D2B48C"
                    strokeWidth="0.5"
                    strokeDasharray="5 5"
                />
                {/* Stylized Island Shape */}
                <path
                    d="M 400 50 Q 550 100 600 250 T 450 400 T 250 350 T 200 200 T 400 50"
                    fill="none"
                    stroke="#D2B48C"
                    strokeWidth="1"
                    className="animate-pulse"
                />
            </svg>

            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none opacity-[0.03]">
                {Array.from({ length: 72 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white" />
                ))}
            </div>

            {/* Region Hotspots */}
            {regions.map((region) => (
                <motion.div
                    key={region.id}
                    className="absolute"
                    style={{ left: region.x, top: region.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="relative group/hotspot cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[#D2B48C] flex items-center justify-center text-black z-10 relative shadow-2xl group-hover/hotspot:scale-125 transition-all">
                            <MapPin size={16} />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#D2B48C] animate-ping opacity-20" />

                        {/* Tooltip */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 p-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl opacity-0 group-hover/hotspot:opacity-100 translate-y-4 group-hover/hotspot:translate-y-0 transition-all pointer-events-none">
                            <span className="text-[8px] font-bold text-[#D2B48C] uppercase tracking-[0.4em] mb-2 block">{region.type}</span>
                            <h4 className="text-white font-serif text-lg mb-2 italic">{region.name}</h4>
                            <div className="flex items-center gap-2 text-white/30 text-[9px] font-bold uppercase tracking-widest">
                                {region.icon} Optimal Humidity
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* HUD Info */}
            <div className="absolute top-12 left-12 flex items-center gap-6">
                <div className="w-16 h-1 bg-[#D2B48C]/30" />
                <span className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-[0.6em]">Origin Intelligence</span>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
                <h3 className="text-4xl font-serif text-white/10 italic leading-none select-none">Matara <br /> Highlands.</h3>
            </div>
        </div>
    );
}
