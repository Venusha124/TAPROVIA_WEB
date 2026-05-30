"use client";

import { useState, useEffect } from "react";
import { Bell, Inbox } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Notification {
    id: string;
    full_name: string;
    subject: string | null;
    created_at: string;
    read: boolean;
}

export function AdminNotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Initial setup - you might want to fetch unread count from DB if you persist read status
        // For now, we start with 0 session-based notifications

        const channel = supabase
            .channel('inquiries-bell-realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'inquiries' },
                (payload) => {
                    const newInquiry = payload.new as any;

                    const newNotification: Notification = {
                        id: newInquiry.id,
                        full_name: newInquiry.full_name,
                        subject: newInquiry.subject,
                        created_at: new Date().toISOString(),
                        read: false
                    };

                    setNotifications(prev => [newNotification, ...prev].slice(0, 10)); // Keep last 10
                    setUnreadCount(prev => prev + 1);

                    // Show toast as well
                    toast.info("New Inquiry Received", {
                        description: `From: ${newInquiry.full_name}`,
                        action: {
                            label: "View",
                            onClick: () => router.push("/admin/inquiries")
                        },
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [router]);

    const handleViewAll = () => {
        router.push("/admin/inquiries");
        setUnreadCount(0); // Reset count on view all
    };

    const handleItemClick = () => {
        router.push("/admin/inquiries");
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button suppressHydrationWarning className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full relative outline-none focus:bg-white/5 transition-all">
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#D2B48C] rounded-full animate-pulse ring-2 ring-[#09090b]" />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 bg-[#09090b] border-white/10">
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-white">Notifications</h4>
                    {unreadCount > 0 && (
                        <span className="text-[10px] bg-[#D2B48C] text-black px-2 py-0.5 rounded-full font-bold">
                            {unreadCount} New
                        </span>
                    )}
                </div>

                <div className="max-h-[300px] overflow-y-auto py-2">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-white/20 text-sm flex flex-col items-center gap-2">
                            <Inbox size={24} className="opacity-50" />
                            <span>No new notifications</span>
                        </div>
                    ) : (
                        notifications.map((notification, i) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="px-4 py-3 cursor-pointer hover:bg-white/5 focus:bg-white/5 border-b border-white/5 last:border-0"
                                onClick={handleItemClick}
                            >
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between items-start">
                                        <span className="font-medium text-white text-sm">{notification.full_name}</span>
                                        <span className="text-[10px] text-white/20">Just now</span>
                                    </div>
                                    <p className="text-xs text-white/60 truncate w-full">
                                        {notification.subject || "New Inquiry received"}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>

                <div className="p-2 border-t border-white/5 bg-white/[0.02]">
                    <button
                        onClick={handleViewAll}
                        className="w-full py-2 text-xs font-medium text-white/40 hover:text-white transition-colors text-center"
                    >
                        View All Inquiries
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
