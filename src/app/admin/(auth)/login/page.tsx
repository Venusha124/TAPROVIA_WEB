"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/actions/auth";

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await loginAdmin(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] border border-white/5 p-8 md:p-10 rounded-[2rem] backdrop-blur-xl shadow-2xl"
        >
            <h2 className="text-2xl font-serif text-white mb-6 text-center">Identity Verification (Custom)</h2>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest pl-2">Access ID (Email)</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/50 transition-colors"
                        placeholder="admin@taprovia.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest pl-2">Passkey</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/50 transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <Button
                    disabled={loading}
                    className="w-full h-12 bg-[#D2B48C] text-black hover:bg-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl mt-4"
                >
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Authenticate"}
                </Button>
            </form>

        </motion.div>
    );
}
