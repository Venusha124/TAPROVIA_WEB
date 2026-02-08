import React from "react";
import Link from "next/link";
import { getNewsletterSubscribers, getNewsletters } from "@/actions/marketing";
import { FilePlus } from "lucide-react";
import { NewsletterTabs } from "@/components/admin/newsletter-tabs";

export default async function NewsletterPage() {
    const subscribers = await getNewsletterSubscribers();
    const newsletters = await getNewsletters();

    return (
        <div className="space-y-8">
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

            {/* Tabs for Campaigns & Subscribers */}
            <NewsletterTabs
                initialNewsletters={newsletters}
                initialSubscribers={subscribers}
            />
        </div>
    );
}
