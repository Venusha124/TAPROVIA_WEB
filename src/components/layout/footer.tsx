import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-8 md:py-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">TAPROVIA</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium curated goods from Ceylon to the world.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
                            <li><Link href="/collections" className="text-muted-foreground hover:text-foreground">Collections</Link></li>
                            <li><Link href="/new" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                            <li><Link href="/shipping" className="text-muted-foreground hover:text-foreground">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="text-muted-foreground hover:text-foreground">Returns</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Stay Updated</h4>
                        <div className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} TAPROVIA. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
