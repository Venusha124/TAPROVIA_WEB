import React from "react";
import { getInquiries } from "@/actions/inquiries";
import { InquiriesTableTabs } from "@/components/admin/inquiries-table-tabs";

export default async function InquiriesPage() {
    // Fetch all inquiries from the server (fresh data)
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

            {/* Client Component handling Tabs & Filtering */}
            <InquiriesTableTabs initialInquiries={inquiries} />
        </div>
    );
}
