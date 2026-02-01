import React from "react";
import { getInquiries } from "@/actions/inquiries";
import { formatDate } from "@/lib/utils";
import { Search, Filter, Mail, Trash2 } from "lucide-react";

export default async function InquiriesPage() {
    const inquiries = await getInquiries();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Inquiries</h1>
                    <p className="text-white/40 text-sm">Review incoming messages and quote requests.</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 bg-[#050505] p-2 rounded-2xl border border-white/5">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search inquiries..."
                        className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none text-sm"
                    />
                </div>
                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors border-l border-white/5">
                    <Filter size={18} />
                </button>
            </div>

            {/* Inquiries Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Appellation</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Full Name</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Registry Email</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Classification</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Narrative</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/20 text-sm">
                                        No inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                inquiries.map((inquiry: any) => (
                                    <tr key={inquiry.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 text-white/60 text-sm font-medium">
                                            {inquiry.appellation || "-"}
                                        </td>
                                        <td className="p-6 text-white font-serif italic text-lg">
                                            {inquiry.full_name}
                                        </td>
                                        <td className="p-6">
                                            <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 text-[#D2B48C] hover:underline text-sm font-medium">
                                                <Mail size={14} />
                                                {inquiry.email}
                                            </a>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/60 border border-white/10">
                                                {inquiry.classification || "General"}
                                            </span>
                                        </td>
                                        <td className="p-6 text-white/40 text-sm max-w-xs truncate" title={inquiry.narrative}>
                                            {inquiry.narrative || "-"}
                                        </td>
                                        <td className="p-6 text-right text-white/20 text-xs uppercase tracking-widest font-bold">
                                            {formatDate(inquiry.created_at)}
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
