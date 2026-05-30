"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Search, Filter, Trash2, Mail, Send, FilePlus, RefreshCw } from "lucide-react";
import { deleteSubscriber, sendNewsletter, deleteNewsletter } from "@/actions/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TABS = ["Campaigns", "Subscribers"];

export function NewsletterTabs({
    initialNewsletters,
    initialSubscribers
}: {
    initialNewsletters: any[],
    initialSubscribers: any[]
}) {
    const [activeTab, setActiveTab] = useState("Campaigns");
    const [subscribers, setSubscribers] = useState(initialSubscribers);
    const [newsletters, setNewsletters] = useState(initialNewsletters);

    // Sync state with props when server revalidates
    React.useEffect(() => {
        setNewsletters(initialNewsletters);
        setSubscribers(initialSubscribers);
    }, [initialNewsletters, initialSubscribers]);

    const handleDeleteCampaign = async (id: string) => {
        // Optimistic update
        const previousNewsletters = [...newsletters];
        setNewsletters(prev => prev.filter(n => n.id !== id));

        const result = await deleteNewsletter(id);

        if (result.error) {
            // Revert on failure
            setNewsletters(previousNewsletters);
            console.error(result.error);
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

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === "Campaigns" && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newsletters.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-white/20 border border-dashed border-white/10 rounded-2xl">
                                    No campaigns created yet.
                                </div>
                            ) : (
                                newsletters.map((newsletter: any) => (
                                    <div key={newsletter.id} className="bg-[#050505] border border-white/5 rounded-2xl p-6 hover:border-[#D2B48C]/30 transition-all group overflow-hidden">
                                        {newsletter.image_url && (
                                            <div className="mb-4 rounded-xl overflow-hidden h-32 w-full relative">
                                                <img src={newsletter.image_url} alt={newsletter.subject} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={cn(
                                                "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                                newsletter.status === 'sent'
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                            )}>
                                                {newsletter.status}
                                            </div>
                                            <span className="text-white/20 text-xs font-mono">{formatDate(newsletter.created_at)}</span>
                                        </div>
                                        <h3 className="text-white font-medium text-lg mb-2 line-clamp-1" title={newsletter.subject}>{newsletter.subject}</h3>
                                        <p className="text-white/40 text-sm mb-6 line-clamp-2">{newsletter.content}</p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                            {newsletter.status === 'sent' ? (
                                                <span className="text-xs text-white/30 flex items-center gap-2">
                                                    <Send size={12} />
                                                    Sent on {formatDate(newsletter.sent_at)}
                                                </span>
                                            ) : (
                                                <form action={async () => {
                                                    await sendNewsletter(newsletter.id);
                                                }}>
                                                    <button className="flex items-center gap-2 text-[#D2B48C] text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                                                        Send Now <Send size={14} />
                                                    </button>
                                                </form>
                                            )}

                                            <button
                                                onClick={() => handleDeleteCampaign(newsletter.id)}
                                                className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete Campaign"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "Subscribers" && (
                    <div className="animate-in fade-in zoom-in-95 duration-200 bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Email</th>
                                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Joined</th>
                                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {subscribers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-12 text-center text-white/20 text-sm">
                                                No subscribers found.
                                            </td>
                                        </tr>
                                    ) : (
                                        subscribers.map((sub: any) => (
                                            <tr key={sub.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#D2B48C]">
                                                            <Mail size={14} />
                                                        </div>
                                                        <span className="font-mono text-white/80">{sub.email}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-white/40 text-sm">
                                                    {formatDate(sub.subscribed_at)}
                                                </td>
                                                <td className="p-6">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                                        sub.is_active
                                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                                    )}>
                                                        {sub.is_active ? 'Active' : 'Unsubscribed'}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <form action={async () => {
                                                        await deleteSubscriber(sub.id);
                                                    }}>
                                                        <button
                                                            className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Delete Subscriber"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
