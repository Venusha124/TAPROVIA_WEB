"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const PERIODS = [
    { label: "24h", value: "24h", name: "24 Hours" },
    { label: "7d", value: "7d", name: "7 Days" },
    { label: "30d", value: "30d", name: "30 Days" },
]

export function AnalyticsPeriodFilter({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentPeriod = searchParams.get("period") || "24h"

    // Update URL when period changes
    const handlePeriodChange = (period: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("period", period)
        // Clear legacy date params if they exist
        params.delete("from")
        params.delete("to")

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className={cn("flex items-center gap-1 bg-[#050505] border border-white/10 p-1 rounded-xl", className)}>
            {PERIODS.map((period) => (
                <button
                    key={period.value}
                    onClick={() => handlePeriodChange(period.value)}
                    className={cn(
                        "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                        currentPeriod === period.value
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                    title={period.name}
                >
                    {period.label}
                </button>
            ))}
        </div>
    )
}
