"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createCoupon } from "@/actions/marketing";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export default function NewCouponPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);

        try {
            const result = await createCoupon(formData);
            if (result && result.error) {
                setError(result.error);
                setIsLoading(false);
            } else {
                // Redirect is handled by server action or we can do it here if needed
                // But createCoupon calls redirect() which might throw an error in client component context usually? 
                // Wait, redirect() in server action works fine.
            }
        } catch (e) {
            console.error(e);
            setError("Something went wrong");
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/coupons"
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif text-white">New Coupon</h1>
                    <p className="text-white/40 text-sm">Create a new discount code.</p>
                </div>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="bg-[#050505] p-8 rounded-3xl border border-white/5 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Code</label>
                        <input
                            name="code"
                            required
                            type="text"
                            placeholder="e.g. SUMMER2024"
                            className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors placeholder:text-white/10 font-mono uppercase"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Type</label>
                            <select
                                name="discountType"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors appearance-none"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount ($)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Value</label>
                            <input
                                name="discountValue"
                                required
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors placeholder:text-white/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Min Purchase Amount</label>
                        <input
                            name="minPurchaseAmount"
                            type="number"
                            step="0.01"
                            defaultValue="0"
                            className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors placeholder:text-white/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Usage Limit</label>
                            <input
                                name="usageLimit"
                                type="number"
                                placeholder="Unlimited"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors placeholder:text-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Expiration Date</label>
                            <input
                                name="expirationDate"
                                type="datetime-local"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors placeholder:text-white/10 [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/admin/coupons"
                        className="px-6 py-3 rounded-xl text-white/40 hover:text-white transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-[#D2B48C] text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Coupon
                    </button>
                </div>
            </form>
        </div>
    );
}
