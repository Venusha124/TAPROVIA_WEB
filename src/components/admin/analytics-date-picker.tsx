"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function AnalyticsDatePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Initialize state from URL params
    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        const from = searchParams.get("from")
        const to = searchParams.get("to")
        if (from && to) {
            return {
                from: new Date(from),
                to: new Date(to),
            }
        }
        return undefined
    })

    // Update URL when date changes
    React.useEffect(() => {
        if (date?.from && date?.to) {
            const params = new URLSearchParams(searchParams.toString())
            params.set("from", format(date.from, "yyyy-MM-dd"))
            params.set("to", format(date.to, "yyyy-MM-dd"))
            router.push(`${pathname}?${params.toString()}`)
        } else if (!date) {
            // Clear params if cleared (optional, maybe reset to default)
        }
    }, [date, router, pathname, searchParams])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        id="date"
                        className={cn(
                            "w-[300px] justify-start text-left font-normal flex items-center gap-2 bg-[#050505] border border-white/10 px-4 py-2 rounded-xl text-sm transition-colors hover:bg-white/5",
                            !date && "text-white/40"
                        )}
                    >
                        <CalendarIcon className="h-4 w-4 text-[#D2B48C]" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Filter by Date</span>
                        )}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
