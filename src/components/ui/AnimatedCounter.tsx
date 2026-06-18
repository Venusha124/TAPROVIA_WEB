"use client";

import React, { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function AnimatedCounter({ 
    value, 
    suffix = "", 
    prefix = "", 
    duration = 2 
}: { 
    value: number, 
    suffix?: string, 
    prefix?: string, 
    duration?: number 
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (inView) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => setDisplay(Math.floor(latest)),
            });
            return controls.stop;
        }
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="inline-block">
            {prefix}{display}{suffix}
        </span>
    );
}
