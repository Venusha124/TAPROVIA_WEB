import Link from "next/link"
import { ShoppingBag, User, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
    return (
        <div className="relative z-50 flex flex-col">
            {/* Top Info Bar */}
            <div className="bg-black text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase py-2 px-4 overflow-hidden flex">
                <div className="flex animate-marquee whitespace-nowrap">
                    <span className="mx-4">Payments Accepted Via Bank Transfers</span>
                    <span className="mx-4">|</span>
                    <span className="mx-4">Pay With Crypto</span>
                    <span className="mx-4">|</span>
                    <span className="mx-4">Worldwide Shipping</span>
                    <span className="mx-4">|</span>
                    <span className="mx-4">Authenticity Verified</span>
                    <span className="mx-4">|</span>
                    <span className="mx-4">Order With Us</span>
                    <span className="mx-4">|</span>
                </div>
            </div>

            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container relative flex flex-col py-4">

                    {/* TOP ROW: Search - Logo - Icons */}
                    <div className="flex items-center justify-between w-full mb-4 md:mb-6">
                        {/* Left: Search */}
                        <div className="flex-1 flex justify-start">
                            <Button variant="ghost" size="icon" aria-label="Search" className="hover:bg-transparent">
                                <Search className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                        </div>

                        {/* Center: Logo */}
                        <div className="flex-0">
                            <Link href="/" className="flex items-center justify-center">
                                {/* Using a serif font to match premium aesthetic */}
                                <span className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#1a1a1a]">
                                    TAPROVIA
                                </span>
                            </Link>
                        </div>

                        {/* Right: User & Cart */}
                        <div className="flex-1 flex justify-end items-center space-x-2">
                            <Button variant="ghost" size="icon" aria-label="User account" className="hover:bg-transparent">
                                <User className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Cart" className="hover:bg-transparent">
                                <ShoppingBag className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                                <span className="sr-only">Cart</span>
                            </Button>
                        </div>
                    </div>

                    {/* BOTTOM ROW: Navigation */}
                    <nav className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
                        <Link href="/" className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-black transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-black transition-colors">
                            Our Products
                        </Link>
                        <Link href="/explore" className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-black transition-colors">
                            Explore Products
                        </Link>
                        <Link href="/stories" className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-black transition-colors">
                            Stories
                        </Link>
                        <Link href="/about" className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-black transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-black transition-colors">
                            Contact Us
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}
