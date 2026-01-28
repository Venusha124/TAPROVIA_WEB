import Link from "next/link"
import { ShoppingBag, User, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight">TAPROVIA</span>
                </Link>
                <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/shop"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Shop
                    </Link>
                    <Link
                        href="/collections"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Collections
                    </Link>
                    <Link
                        href="/about"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        About
                    </Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search can go here */}
                    </div>
                    <nav className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" aria-label="Search">
                            <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="User account">
                            <User className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Cart">
                            <ShoppingBag className="h-4 w-4" />
                            <span className="sr-only">Cart</span>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
