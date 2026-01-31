"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    value?: string
    onValueChange?: (value: string) => void
}>({})

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple"
        collapsible?: boolean
        value?: string
        defaultValue?: string
        onValueChange?: (value: string) => void
    }
>(({ className, type, value: propValue, onValueChange, children, ...props }, ref) => {
    const [value, setValue] = React.useState<string | undefined>(propValue)

    const handleValueChange = (newValue: string) => {
        const nextValue = value === newValue ? undefined : newValue
        setValue(nextValue)
        if (onValueChange) onValueChange(nextValue || "")
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div ref={ref} className={className} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItemContext = React.createContext<{ value?: string }>({})

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} {...props} />
    </AccordionItemContext.Provider>
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(AccordionContext)
    const { value: itemValue } = React.useContext(AccordionItemContext)
    const isOpen = selectedValue === itemValue

    return (
        <div className="flex">
            <button
                ref={ref}
                onClick={() => onValueChange?.(itemValue || "")}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-[#D2B48C]",
                    isOpen && "text-[#D2B48C]", // Simple active state
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200 text-[#D2B48C]",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { value: selectedValue } = React.useContext(AccordionContext)
    const { value: itemValue } = React.useContext(AccordionItemContext)
    const isOpen = selectedValue === itemValue

    if (!isOpen) return null

    return (
        <div
            ref={ref}
            className={cn("overflow-hidden text-sm animate-accordion-down data-[state=closed]:animate-accordion-up", className)}
            {...props}
        >
            <div className={cn("pb-4 pt-0", className)}>{children}</div>
        </div>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
