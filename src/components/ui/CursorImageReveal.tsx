"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function CursorImageReveal({ children, imageSrc, className }: { children: React.ReactNode, imageSrc: string, className?: string }) {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (isHovered) {
            window.addEventListener("mousemove", updateMousePosition);
            // set initial position to avoid jumping from 0,0
        }

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, [isHovered, mouseX, mouseY]);

    const handleMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <>
            <span 
                className={`relative inline-block cursor-pointer underline decoration-[#D2B48C]/50 decoration-4 underline-offset-8 transition-colors hover:text-[#D2B48C] ${className || ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </span>
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        style={{ 
                            position: "fixed",
                            top: 0,
                            left: 0,
                            x: mouseX, 
                            y: mouseY,
                            pointerEvents: "none",
                            zIndex: 9999,
                            translateX: "-50%",
                            translateY: "-50%"
                        }}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative w-72 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image src={imageSrc} alt="Reveal" fill className="object-cover" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
