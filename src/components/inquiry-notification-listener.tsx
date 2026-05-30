"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function InquiryNotificationListener() {
    const router = useRouter();

    useEffect(() => {
        const channel = supabase
            .channel('inquiries-realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'inquiries' },
                (payload) => {
                    const newInquiry = payload.new as any;
                    toast.info("New Inquiry Received", {
                        description: `From: ${newInquiry.full_name} - ${newInquiry.subject || "No Subject"}`,
                        action: {
                            label: "View",
                            onClick: () => router.push("/admin/inquiries")
                        },
                        duration: 8000,
                    });
                    // Optional: Play a sound
                    // const audio = new Audio('/sounds/notification.mp3');
                    // audio.play().catch(e => console.error("Audio play failed", e));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [router]);

    return null; // This component renders nothing
}
