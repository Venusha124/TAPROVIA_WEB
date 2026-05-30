"use client"

import { useState, useTransition } from "react"
import { ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import { subscribeToNewsletter } from "@/actions/marketing"

export function NewsletterForm() {
    const [email, setEmail] = useState("")
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            toast.error("Please enter your email address")
            return
        }

        startTransition(async () => {
            const formData = new FormData()
            formData.append("email", email)

            const result = await subscribeToNewsletter(formData)

            if (result.success) {
                toast.success("Successfully subscribed to our newsletter!")
                setEmail("")
            } else {
                toast.error(result.error || "Failed to subscribe. Please try again.")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="relative group">
            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                required
                className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D2B48C] transition-colors disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={isPending}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#D2B48C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowUpRight size={20} />
            </button>
        </form>
    )
}
