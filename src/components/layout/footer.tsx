import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white border-t border-white/10">
            <div className="container py-16 md:py-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-20">
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl font-bold tracking-tight text-white">TAPROVIA</h3>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            The gold standard of Ceylon Cinnamon. Delivering the finest artisanal spices from Sri Lanka's heartlands to the world.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Placeholders */}
                            <div className="h-8 w-8 bg-white/10 rounded-full hover:bg-[#D2B48C] hover:text-black transition-colors cursor-pointer flex items-center justify-center">
                                <span className="sr-only">Facebook</span>
                            </div>
                            <div className="h-8 w-8 bg-white/10 rounded-full hover:bg-[#D2B48C] hover:text-black transition-colors cursor-pointer flex items-center justify-center">
                                <span className="sr-only">Instagram</span>
                            </div>
                            <div className="h-8 w-8 bg-white/10 rounded-full hover:bg-[#D2B48C] hover:text-black transition-colors cursor-pointer flex items-center justify-center">
                                <span className="sr-only">LinkedIn</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#D2B48C]">Collections</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/shop" className="text-white/70 hover:text-white transition-colors">All Products</Link></li>
                            <li><Link href="/collections" className="text-white/70 hover:text-white transition-colors">Premium Spices</Link></li>
                            <li><Link href="/new" className="text-white/70 hover:text-white transition-colors">Gift Sets</Link></li>
                            <li><Link href="/wholesale" className="text-white/70 hover:text-white transition-colors">Wholesale Catalog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#D2B48C]">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="text-white/70 hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="text-white/70 hover:text-white transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#D2B48C]">Newsletter</h4>
                        <p className="text-white/60 text-sm mb-4">Subscribe for market insights and seasonal offers.</p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2B48C]"
                            />
                            <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#D2B48C] px-4 py-2 text-sm font-bold text-black shadow hover:bg-[#C1A076] transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-black/50 p-6 rounded-xl">
                    <p className="text-xs text-white/40">
                        &copy; {new Date().getFullYear()} TAPROVIA Export Co. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-white/40">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
