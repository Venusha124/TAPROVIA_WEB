import React from "react";
import Link from "next/link";
import { getNewsletterSubscribers, deleteSubscriber } from "@/actions/marketing";
import { Search, Filter, Trash2, Mail, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function NewsletterPage() {
    const subscribers = await getNewsletterSubscribers();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Newsletter</h1>
                    <p className="text-white/40 text-sm">Manage your mailing list subscribers.</p>
                </div>
                <div className="flex gap-2">
                    {/* Export button could go here */}
                    <button disabled className="flex items-center justify-center gap-2 bg-white/5 text-white/40 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs cursor-not-allowed">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* List Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Email</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Subscribed Date</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
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
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-white/20" />
                                                {formatDate(sub.subscribed_at)}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${sub.is_active
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }`}>
                                                {sub.is_active ? 'Subscribed' : 'Unsubscribed'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <form action={async () => {
                                                "use server";
                                                await deleteSubscriber(sub.id);
                                            }}>
                                                <button className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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
        </div>
    );
}
