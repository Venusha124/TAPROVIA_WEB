"use client";

import React from "react";
import { motion } from "framer-motion";

const marqueeText = "✦ 100% ORGANIC ✦ SINGLE ORIGIN ✦ TRUE CEYLON CINNAMON ✦ SUSTAINABLY HARVESTED ✦ PREMIUM ALBA GRADE ";

export function Marquee() {
    return (
        <div className="w-full bg-[#D2B48C] text-white py-3 overflow-hidden flex whitespace-nowrap items-center">
            <motion.div
                className="flex font-bold text-sm uppercase tracking-[0.2em]"
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                    },
                }}
            >
                {/* Duplicate text multiple times to ensure seamless infinite scrolling */}
                <span>{marqueeText}</span>
                <span>{marqueeText}</span>
                <span>{marqueeText}</span>
                <span>{marqueeText}</span>
            </motion.div>
        </div>
    );
}
