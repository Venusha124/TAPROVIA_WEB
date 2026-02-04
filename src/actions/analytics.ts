"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

function getDeviceType(userAgent: string) {
    if (/mobile/i.test(userAgent)) return "mobile";
    if (/tablet/i.test(userAgent)) return "tablet";
    return "desktop";
}

export async function recordVisit(path: string) {
    try {
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "";
        const ip = headersList.get("x-forwarded-for") || "unknown";
        const country = headersList.get("x-vercel-ip-country") || "Unknown";
        const city = headersList.get("x-vercel-ip-city") || "Unknown";

        // Simple visitor ID based on IP and UA (Privacy: This is minimal and resets often on dynamic IPs)
        // ideally, use a hashed cookie for better tracking, but this is server-side only for now.
        const visitorId = Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 20);

        const { error } = await supabase.from("web_traffic").insert([
            {
                page_path: path,
                country: country,
                city: city,
                device_type: getDeviceType(userAgent),
                visitor_id: visitorId
            }
        ]);

        if (error) {
            console.error("Analytics Error:", error);
        }
    } catch (err) {
        console.error("Analytics Exception:", err);
    }
}

export async function getAnalyticsSummary() {
    // 1. Get Live Users (Last 15 minutes) - Approximate by unique visitor_id
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

    // Note: This is an aggregation. Ideally, we use Supabase RPC or advanced queries.
    // For simplicity, we fetch recent records and process in JS (ok for small traffic).

    const { data: recentTraffic, error } = await supabase
        .from("web_traffic")
        .select("visitor_id, country, page_path, created_at")
        .gte("created_at", fifteenMinutesAgo);

    if (error) {
        // Table might not exist yet
        return { activeUsers: 0, topCountries: [], topPages: [] };
    }

    const uniqueVisitors = new Set(recentTraffic.map(t => t.visitor_id));
    const activeUsers = uniqueVisitors.size;

    // 2. Top Countries
    const countryCounts: Record<string, number> = {};
    recentTraffic.forEach(t => {
        const c = t.country || "Unknown";
        countryCounts[c] = (countryCounts[c] || 0) + 1;
    });

    const topCountries = Object.entries(countryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([code, count]) => ({ code, count }));

    // 3. Top Pages
    const pageCounts: Record<string, number> = {};
    recentTraffic.forEach(t => {
        pageCounts[t.page_path] = (pageCounts[t.page_path] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([path, count]) => ({ path, count }));

    return { activeUsers, topCountries, topPages };
}
