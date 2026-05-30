"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Loader2, Send, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { createNewsletter } from "@/actions/marketing"

export default function CreateCampaignPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await createNewsletter(formData)
            if (result.success) {
                toast.success("Campaign draft created!")
                router.push("/admin/newsletter")
            } else {
                toast.error(result.error || "Failed to create campaign.")
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/newsletter"
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif text-white font-light">New Campaign</h1>
                    <p className="text-white/40 text-sm">Draft a new email newsletter to your subscribers.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-[#D2B48C]">Subject Line</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        required
                        placeholder="e.g. November Harvest Report"
                        className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="text-xs font-bold uppercase tracking-widest text-[#D2B48C]">Cover Image</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                            <ImageIcon size={20} />
                        </div>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            className="w-full bg-[#050505] border border-white/5 rounded-xl py-3 pl-12 text-white/60 focus:outline-none focus:border-[#D2B48C]/50 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#D2B48C] file:text-black hover:file:bg-[#C1A278]"
                        />
                    </div>
                    <p className="text-[10px] text-white/30">Recommended size: 1200x600px. formats: jpg, png, webp.</p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-[#D2B48C]">Content</label>
                    <textarea
                        name="content"
                        id="content"
                        required
                        rows={12}
                        placeholder="Write your newsletter content here..."
                        className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/50 transition-colors font-mono text-sm leading-relaxed"
                    />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
                    <Link href="/admin/newsletter" className="text-white/40 hover:text-white text-sm px-4 py-2">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 bg-[#D2B48C] text-black hover:bg-[#C1A278] disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
                    >
                        {isPending ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Save Draft
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
