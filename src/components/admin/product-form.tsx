"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/actions/products";
import { ArrowLeft, Save, Loader2, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState(initialData?.images?.[0] || "");

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError(null);

        try {
            // Append image URL if set manually (since we don't have file upload yet)
            if (imageUrl) {
                formData.set("imageUrl", imageUrl);
            }

            const result = isEdit
                ? await updateProduct(initialData.id, formData)
                : await createProduct(formData);

            if (result?.error) {
                setError(result.error);
                setLoading(false);
            } else {
                // Success redirect handled in server action, but fail-safe here
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-serif text-white font-light">
                        {isEdit ? "Edit Protocol" : "New Entry"}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        disabled={loading}
                        className="bg-[#D2B48C] text-black hover:bg-white font-bold uppercase tracking-widest text-xs px-6 h-10 rounded-xl flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Save size={16} /> Save Product</>}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={initialData?.title}
                                required
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors"
                                placeholder="e.g. Ceylon Cinnamon Grade A"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Description</label>
                            <textarea
                                name="description"
                                defaultValue={initialData?.description}
                                rows={6}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors resize-none"
                                placeholder="Product details..."
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 space-y-4">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Media</label>
                        <div className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center hover:bg-white/[0.02] transition-colors cursor-pointer relative group">
                            {imageUrl ? (
                                <div className="relative w-full h-64">
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl("")}
                                        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D2B48C]">
                                        <UploadCloud size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-white/40 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                </>
                            )}
                            {/* Hidden generic file input for visual purposes, but we use URL input below for MVP */}
                            <input type="file" className="hidden" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Or Image URL</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors text-sm"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Status */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 space-y-4">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Status</label>
                        <select
                            name="status"
                            defaultValue={initialData?.status || "active"}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D2B48C]/30 appearance-none cursor-pointer"
                        >
                            <option value="active" className="bg-[#09090b]">Active</option>
                            <option value="draft" className="bg-[#09090b]">Draft</option>
                            <option value="archived" className="bg-[#09090b]">Archived</option>
                        </select>
                    </div>

                    {/* Pricing */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Pricing</h3>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    defaultValue={initialData?.price}
                                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Compare At Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                                <input
                                    type="number"
                                    name="compareAtPrice"
                                    step="0.01"
                                    defaultValue={initialData?.compare_at_price}
                                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Inventory</h3>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">SKU (Stock Keeping Unit)</label>
                            <input
                                type="text"
                                name="sku"
                                defaultValue={initialData?.sku}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors"
                                placeholder="CIN-001"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest pl-1">Quantity</label>
                            <input
                                type="number"
                                name="inventoryQuantity"
                                defaultValue={initialData?.inventory_quantity}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D2B48C]/30 transition-colors"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
