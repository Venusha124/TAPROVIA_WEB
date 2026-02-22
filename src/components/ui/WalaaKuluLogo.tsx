import React from 'react';
import { cn } from '@/lib/utils';

interface WalaaKuluLogoProps {
    className?: string;
    showText?: boolean;
}

export const WalaaKuluLogo: React.FC<WalaaKuluLogoProps> = ({ className, showText = true }) => {
    return (
        <div className={cn("flex flex-col items-center gap-6", className)}>
            {/* The Swirl Icon */}
            <svg
                viewBox="0 0 100 80"
                className="w-24 h-24 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Main Cloud Swirl - 3 Tiers */}
                <path d="M70 60 C85 60 95 45 95 30 C95 15 80 5 65 5 C50 5 35 15 35 30" />
                <path d="M55 60 C70 60 80 50 80 35 C80 20 65 10 55 10 C45 10 35 18 35 30" />
                <path d="M40 60 C50 60 60 55 60 40 C60 25 50 15 40 15 C30 15 25 25 25 35 C25 45 35 50 45 45" />

                {/* Waves below */}
                <path d="M20 50 Q25 45 30 50 Q35 55 40 50" strokeWidth="1.5" opacity="0.6" />
                <path d="M22 60 Q27 55 32 60 Q37 65 42 60" strokeWidth="1.5" opacity="0.4" />
                <path d="M24 70 Q29 65 34 70 Q39 75 44 70" strokeWidth="1.5" opacity="0.2" />
            </svg>

            {showText && (
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-white">
                        TAPROVIA
                    </h2>
                    <div className="w-full h-[1px] bg-white opacity-40 my-4" />
                    <p className="text-[10px] md:text-[12px] tracking-[0.6em] text-white/60 uppercase font-light">
                        Sovereign Collection
                    </p>
                </div>
            )}
        </div>
    );
};
