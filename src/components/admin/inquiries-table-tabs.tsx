"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Search, Filter, Mail, CheckCircle, Clock } from "lucide-react";
import { InquiryDetailsDialog } from "@/app/admin/(dashboard)/inquiries/inquiry-details-dialog";
import { cn } from "@/lib/utils";
import { markInquiryActioned } from "@/actions/inquiries";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const TABS = ["Pending", "Taken Action"];

export function InquiriesTableTabs({ initialInquiries }: { initialInquiries: any[] }) {
    const [activeTab, setActiveTab] = useState("Pending");
    const [searchQuery, setSearchQuery] = useState("");
    const [inquiries, setInquiries] = useState(initialInquiries);

    // Update local state when server action is called (optimistic update vibe)
    // Actually, since server action revalidates path, props might update, but local state might persist if not synchronized.
    // For simplicity, we can rely on the prop update or just optimistic toggle.
    // Let's rely on props update if parent passes new data, but better to sync prop -> state.
    // Effect to sync prop to state?
    React.useEffect(() => {
        setInquiries(initialInquiries);
    }, [initialInquiries]);

    const filteredInquiries = inquiries.filter((inquiry) => {
        const matchesTab = activeTab === "Pending"
            ? !inquiry.action_taken
            : inquiry.action_taken;

        const matchesSearch =
            (inquiry.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (inquiry.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (inquiry.subject?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (inquiry.phone?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (inquiry.narrative?.toLowerCase() || "").includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const handleToggleAction = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        const newStatus = !currentStatus;
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, action_taken: newStatus } : i));

        const result = await markInquiryActioned(id, newStatus);

        if (result.error) {
            toast.error("Failed to update status");
            // Revert
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, action_taken: currentStatus } : i));
        } else {
            toast.success(newStatus ? "Marked as Action Taken" : "Marked as Pending");
        }
    };

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-1">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-3 text-sm font-bold uppercase tracking-widest rounded-t-xl transition-all relative",
                            activeTab === tab
                                ? "text-[#D2B48C] bg-white/[0.02]"
                                : "text-white/40 hover:text-white hover:bg-white/[0.01]"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D2B48C]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 bg-[#050505] p-2 rounded-2xl border border-white/5">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search inquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none text-sm"
                    />
                </div>
                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors border-l border-white/5">
                    <Filter size={18} />
                </button>
            </div>

            {/* Inquiries Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Full Name</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Registry Email</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Mobile</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Classification</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Date</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredInquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-white/20 text-sm">
                                        No inquiries found in this category.
                                    </td>
                                </tr>
                            ) : (
                                filteredInquiries.map((inquiry: any) => (
                                    <tr key={inquiry.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <button
                                                onClick={() => handleToggleAction(inquiry.id, inquiry.action_taken)}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors border",
                                                    inquiry.action_taken
                                                        ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 hover:bg-emerald-400/20"
                                                        : "text-amber-400 bg-amber-400/10 border-amber-400/20 hover:bg-amber-400/20"
                                                )}
                                                title="Toggle status"
                                            >
                                                {inquiry.action_taken ? (
                                                    <>
                                                        <CheckCircle size={12} /> Action Taken
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clock size={12} /> Pending
                                                    </>
                                                )}
                                            </button>
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
                                        <td className="p-6 text-white/60 text-sm">
                                            {inquiry.phone || "-"}
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/60 border border-white/10">
                                                {inquiry.classification || "General"}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right text-white/20 text-xs uppercase tracking-widest font-bold">
                                            {formatDate(inquiry.created_at)}
                                        </td>
                                        <td className="p-6 text-right flex justify-end gap-2">
                                            <InquiryDetailsDialog inquiry={inquiry} />
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
