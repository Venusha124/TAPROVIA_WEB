"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// --- GET INQUIRIES ---
export async function getInquiries() {
    const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching inquiries:", JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}

// --- DELETE INQUIRY ---
export async function deleteInquiry(id: string) {
    const { error } = await supabase.from("inquiries").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/inquiries");
}

// --- CREATE INQUIRY (For Contact Form) ---
export async function createInquiry(formData: FormData) {
    const appellation = formData.get("appellation") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const classification = formData.get("classification") as string;
    const narrative = formData.get("narrative") as string;

    const { error } = await supabase.from("inquiries").insert([
        {
            appellation,
            full_name: fullName,
            email,
            classification,
            narrative,
        },
    ]);

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

// --- TOGGLE INQUIRY STATUS ---
export async function markInquiryActioned(id: string, actioned: boolean) {
    const { error } = await supabase
        .from("inquiries")
        .update({ action_taken: actioned })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/inquiries");
    return { success: true };
}
