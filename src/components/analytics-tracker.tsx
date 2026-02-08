"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/actions/analytics";

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Check if we are in the browser
        if (typeof window === "undefined") return;

        // Do not track admin pages to avoid skewing data
        if (pathname.startsWith("/admin")) return;

        // Record the visit
        // Fire and forget - don't await to avoid blocking UI
        recordVisit(pathname);

    }, [pathname]);

    return null;
}
