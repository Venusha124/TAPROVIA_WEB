import React from "react";
import Link from "next/link";
import { getProducts } from "@/actions/products";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Inventory</h1>
                    <p className="text-white/40 text-sm">Manage your global export catalog.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center justify-center gap-2 bg-[#D2B48C] text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 bg-[#050505] p-2 rounded-2xl border border-white/5">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none text-sm"
                    />
                </div>
                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors border-l border-white/5">
                    <Filter size={18} />
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Product</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Inventory</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Category</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Price</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/20 text-sm">
                                        No products found in the catalog.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product: any) => (
                                    <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 relative">
                                                    {product.images && product.images[0] ? (
                                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/10 text-xs">IMG</div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-white">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <StatusBadge status={product.status} />
                                        </td>
                                        <td className="p-6">
                                            <span className={product.inventory_quantity <= 0 ? "text-red-400" : "text-white/60"}>
                                                {product.inventory_quantity} in stock
                                            </span>
                                        </td>
                                        <td className="p-6 text-white/40 text-sm">
                                            {/* Category placeholder - add column if needed */}
                                            Export
                                        </td>
                                        <td className="p-6 text-right font-medium text-[#D2B48C]">
                                            {formatCurrency(product.price)}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="p-2 text-white/20 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        active: "bg-green-500/10 text-green-400 border-green-500/20",
        draft: "bg-white/5 text-white/40 border-white/10",
        archived: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    // Default to draft style if status is unknown
    const style = styles[status as keyof typeof styles] || styles.draft;

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style}`}>
            {status}
        </span>
    );
}
