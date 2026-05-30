"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingBackgroundProps {
    images: string[];
    interval?: number;
    opacity?: number;
    className?: string;
    priority?: boolean;
    grayscale?: boolean;
    showGradient?: boolean;
    showOverlay?: boolean;
}

export function RotatingBackground({
    images,
    interval = 6000,
    opacity = 0.4,
    className,
    priority = true,
    grayscale = false,
    showGradient = true,
    showOverlay = false,
    activeIndex,
}: RotatingBackgroundProps & { activeIndex?: number }) {
    const [internalIndex, setInternalIndex] = useState(0);
    const index = activeIndex !== undefined ? activeIndex : internalIndex;

    useEffect(() => {
        if (activeIndex !== undefined || !images || images.length <= 1) return;

        const timer = setInterval(() => {
            setInternalIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images?.length, interval, activeIndex]);

    return (
        <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: opacity, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index]}
                        alt="Background"
                        fill
                        className={cn("object-cover", grayscale && "grayscale")}
                        priority={priority}
                    />
                </motion.div>
            </AnimatePresence>

            {showGradient && (
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
            )}

            {showOverlay && (
                <div className="absolute inset-0 bg-[#050505]/60 z-[2]" />
            )}
        </div>
    );
}
