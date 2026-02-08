"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { registerAdmin } from "@/actions/auth";

export default function AdminRegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await registerAdmin(formData);
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] border border-white/5 p-8 md:p-10 rounded-[2rem] backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5">
                <Shield size={120} />
            </div>

            <h2 className="text-2xl font-serif text-white mb-6 text-center relative z-10">New Clearance</h2>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center relative z-10">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest pl-2">Operative Name</label>
                    <input
                        type="text"
                        name="fullName"
                        required
                        className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/50 transition-colors"
                        placeholder="Agent Name"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest pl-2">Access ID (Email)</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/50 transition-colors"
                        placeholder="new.admin@taprovia.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest pl-2">Set Passkey</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/50 transition-colors"
                        placeholder="Minimum 6 characters"
                    />
                </div>

                <Button
                    disabled={loading}
                    className="w-full h-12 bg-[#D2B48C] text-black hover:bg-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl mt-4"
                >
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Initialize Protocol"}
                </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center relative z-10">
                <Link href="/admin/login" className="text-white/20 hover:text-[#D2B48C] text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <ArrowLeft size={12} /> Return to Login
                </Link>
            </div>
        </motion.div>
    );
}
