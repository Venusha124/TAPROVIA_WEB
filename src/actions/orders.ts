"use server";

import { supabase } from "@/lib/supabase";

export async function getOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            customer:customers(full_name, email)
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching orders:", JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}
