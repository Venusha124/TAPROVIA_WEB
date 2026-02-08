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

export async function getAnalyticsSummary(period: string = "24h") {
    // Determine time window
    let startTime = new Date();
    const endTime = new Date().toISOString();
    let isHistorical = period !== "24h";

    switch (period) {
        case "7d":
            startTime.setDate(startTime.getDate() - 7);
            break;
        case "30d":
            startTime.setDate(startTime.getDate() - 30);
            break;
        case "24h":
        default:
            startTime.setHours(startTime.getHours() - 24);
            break;
    }

    const { data: recentTraffic, error } = await supabase
        .from("web_traffic")
        .select("visitor_id, country, page_path, created_at")
        .gte("created_at", startTime.toISOString())
        .lte("created_at", endTime);

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

    return { activeUsers, topCountries, topPages, isHistorical };
}
