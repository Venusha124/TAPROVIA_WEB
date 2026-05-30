"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitInquiry(prevState: any, formData: FormData) {
    const fullName = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const country = formData.get("country") as string;
    const subject = formData.get("subject") as string;
    const preferredContact = formData.get("preferred_contact") as string;
    const timeframe = formData.get("timeframe") as string;
    const narrative = formData.get("narrative") as string;
    const classification = formData.get("classification") as string;

    if (!fullName || !email || !narrative) {
        return { error: "Name, email, and message are required." };
    }

    try {
        const { error } = await supabase
            .from("inquiries")
            .insert([
                {
                    full_name: fullName,
                    email,
                    phone,
                    country,
                    subject,
                    preferred_contact: preferredContact,
                    timeframe,
                    narrative,
                    classification
                }
            ]);

        if (error) {
            console.error("Supabase Error:", error);
            return { error: "Failed to save inquiry. Please try again." };
        }

        revalidatePath("/contact");
        return { success: "Message sent! Our desk will contact you shortly." };

    } catch (err) {
        console.error("Server Error:", err);
        return { error: "An unexpected error occurred." };
    }
}
