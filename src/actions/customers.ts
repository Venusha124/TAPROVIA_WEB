"use server";

import { supabase } from "@/lib/supabase";

export async function getCustomers() {
    const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching customers:", JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}
