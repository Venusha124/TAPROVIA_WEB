import React from "react";
import Link from "next/link";
import { getCoupons, deleteCoupon, toggleCouponStatus } from "@/actions/marketing";
import { Plus, Search, Filter, Trash2, Tag, CheckCircle, XCircle } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

export default async function CouponsPage() {
    const coupons = await getCoupons();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Coupons</h1>
                    <p className="text-white/40 text-sm">Manage discount codes and promotions.</p>
                </div>
                <Link
                    href="/admin/coupons/new"
                    className="flex items-center justify-center gap-2 bg-[#D2B48C] text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                    <Plus size={16} /> Create Coupon
                </Link>
            </div>

            {/* Coupons Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Code</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Discount</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Usage</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Expires</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {coupons.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/20 text-sm">
                                        No coupons found.
                                    </td>
                                </tr>
                            ) : (
                                coupons.map((coupon: any) => (
                                    <tr key={coupon.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#D2B48C]">
                                                    <Tag size={14} />
                                                </div>
                                                <span className="font-mono text-white/80">{coupon.code}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-white/70">
                                            {coupon.discount_type === 'percentage'
                                                ? `${coupon.discount_value}% OFF`
                                                : formatCurrency(coupon.discount_value) + ' OFF'}
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${coupon.is_active
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }`}>
                                                {coupon.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-white/40 text-sm">
                                            {coupon.usage_count} / {coupon.usage_limit || '∞'}
                                        </td>
                                        <td className="p-6 text-white/40 text-sm">
                                            {coupon.expiration_date ? formatDate(coupon.expiration_date) : 'Never'}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <form action={async () => {
                                                    "use server";
                                                    await toggleCouponStatus(coupon.id, !coupon.is_active);
                                                }}>
                                                    <button className="p-2 text-white/20 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                                        {coupon.is_active ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                                    </button>
                                                </form>
                                                <form action={async () => {
                                                    "use server";
                                                    await deleteCoupon(coupon.id);
                                                }}>
                                                    <button className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </form>
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
