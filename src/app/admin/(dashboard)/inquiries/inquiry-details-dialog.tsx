"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Calendar, Globe, User, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Inquiry {
    id: string;
    appellation: string | null;
    full_name: string;
    email: string;
    phone: string | null;
    country: string | null;
    classification: string | null;
    subject: string | null;
    narrative: string | null;
    preferred_contact: string | null;
    timeframe: string | null;
    created_at: string;
}

export function InquiryDetailsDialog({ inquiry }: { inquiry: Inquiry }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button suppressHydrationWarning variant="ghost" size="icon" className="hover:bg-white/10 text-white/60 hover:text-[#D2B48C] transition-colors">
                    <Eye size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-[#080808] border-white/10">
                <DialogHeader className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D2B48C]/10 text-[#D2B48C] border border-[#D2B48C]/20">
                            {inquiry.classification || "General"}
                        </span>
                        <span className="text-white/40 text-xs italic">
                            Received {formatDate(inquiry.created_at)}
                        </span>
                    </div>
                    <DialogTitle className="text-2xl font-serif italic text-white">
                        {inquiry.subject || "No Subject"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-8">
                    {/* Contact Details Grid */}
                    <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4">Contact Info</h4>

                            <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-[#D2B48C]" />
                                <div>
                                    <p className="text-white font-medium text-sm">
                                        {inquiry.appellation ? `${inquiry.appellation} ` : ""}{inquiry.full_name}
                                    </p>
                                </div>
                            </div>

                            <a href={`mailto:${inquiry.email}`} className="flex items-center gap-3 group">
                                <Mail className="w-4 h-4 text-[#D2B48C] group-hover:text-white transition-colors" />
                                <span className="text-white/60 text-sm group-hover:text-white transition-colors">{inquiry.email}</span>
                            </a>

                            {inquiry.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#D2B48C]" />
                                    <span className="text-white/60 text-sm">{inquiry.phone}</span>
                                </div>
                            )}

                            {inquiry.country && (
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-[#D2B48C]" />
                                    <span className="text-white/60 text-sm">{inquiry.country}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4">Preferences</h4>

                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-white/40 text-xs">Preferred Contact</span>
                                <span className="text-white text-sm">{inquiry.preferred_contact || "-"}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-white/40 text-xs">Timeframe</span>
                                <span className="text-white text-sm">{inquiry.timeframe || "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Narrative Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#D2B48C] mb-2">
                            <MessageSquare size={16} />
                            <h4 className="text-[10px] font-bold uppercase tracking-widest">Message Narrative</h4>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-white/80 font-serif italic leading-relaxed text-sm">
                            "{inquiry.narrative}"
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white/60" onClick={() => window.open(`mailto:${inquiry.email}`)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Reply via Email
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
