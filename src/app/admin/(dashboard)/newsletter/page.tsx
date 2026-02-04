import React from "react";
import Link from "next/link";
import { getNewsletterSubscribers, deleteSubscriber, getNewsletters, sendNewsletter } from "@/actions/marketing";
import { Search, Filter, Trash2, Mail, Calendar, Send, FilePlus, RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function NewsletterPage() {
    const subscribers = await getNewsletterSubscribers();
    const newsletters = await getNewsletters();

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Newsletter Management</h1>
                    <p className="text-white/40 text-sm">Manage subscribers and email campaigns.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/admin/newsletter/create"
                        className="flex items-center justify-center gap-2 bg-[#D2B48C] text-black hover:bg-[#C1A278] transition-colors px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
                    >
                        <FilePlus size={16} />
                        New Campaign
                    </Link>
                </div>
            </div>

            {/* Campaigns Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-[#D2B48C]">Campaigns</h2>
                    <span className="bg-white/5 text-white/40 text-[10px] font-bold px-2 py-1 rounded-full">{newsletters.length}</span>
                </div>

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
                                    <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${newsletter.status === 'sent'
                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        }`}>
                                        {newsletter.status}
                                    </div>
                                    <span className="text-white/20 text-xs font-mono">{formatDate(newsletter.created_at)}</span>
                                </div>
                                <h3 className="text-white font-medium text-lg mb-2 line-clamp-1" title={newsletter.subject}>{newsletter.subject}</h3>
                                <p className="text-white/40 text-sm mb-6 line-clamp-2">{newsletter.content}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    {newsletter.status === 'sent' ? (
                                        <span className="text-xs text-white/30 flex items-center gap-2">
                                            <Send size={12} />
                                            Sent on {formatDate(newsletter.sent_at)}
                                        </span>
                                    ) : (
                                        <form action={async () => {
                                            "use server";
                                            await sendNewsletter(newsletter.id);
                                        }}>
                                            <button className="flex items-center gap-2 text-[#D2B48C] text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                                                Send Now <Send size={14} />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Subscribers Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-[#D2B48C]">Subscribers</h2>
                    <span className="bg-white/5 text-white/40 text-[10px] font-bold px-2 py-1 rounded-full">{subscribers.length}</span>
                </div>

                <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
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
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${sub.is_active
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                    }`}>
                                                    {sub.is_active ? 'Active' : 'Unsubscribed'}
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
            </section>
        </div>
    );
}
