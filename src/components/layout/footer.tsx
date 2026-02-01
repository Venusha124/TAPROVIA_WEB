import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black text-[#F3EFE9] border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D2B48C]/20 to-transparent" />

            <div className="container py-24 md:py-32 px-4 relative z-10">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-12">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-4xl font-light tracking-tighter text-white">
                                TAPRO<span className="text-[#D2B48C] italic">VIA</span>
                            </span>
                        </Link>
                        <p className="text-white/40 text-lg font-light leading-relaxed max-w-sm italic">
                            "Cultivating the benchmark of Ceylon excellence since 1924. A legacy of purity, delivered globally."
                        </p>
                        <div className="flex space-x-8">
                            {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-white/20 hover:text-[#D2B48C] transition-all transform hover:-translate-y-1">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-12">
                        <div>
                            <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.5em] text-[#D2B48C]">Our Products</h4>
                            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <li><Link href="/" className="text-white/30 hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/products" className="text-white/30 hover:text-white transition-colors">Our Products</Link></li>
                                <li><Link href="/explore" className="text-white/30 hover:text-white transition-colors">Explore Products</Link></li>
                                <li><Link href="/stories" className="text-white/30 hover:text-white transition-colors">Stories</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.5em] text-[#D2B48C]">About Us</h4>
                            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <li><Link href="/about" className="text-white/30 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="text-white/30 hover:text-white transition-colors">Contact Us</Link></li>
                                <li><Link href="/shipping" className="text-white/30 hover:text-white transition-colors">Logistics</Link></li>
                                <li><Link href="/faq" className="text-white/30 hover:text-white transition-colors">Inquiries</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <div className="lg:col-span-3">
                        <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.5em] text-[#D2B48C]">Subscribe to our newsletter</h4>
                        <p className="text-white/30 text-xs font-light mb-8 leading-relaxed">Join our registry for exclusive access to reserve grades and seasonal field reports.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D2B48C] transition-colors"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#D2B48C] transition-all">
                                <ArrowUpRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
                        &copy; {new Date().getFullYear()} TAPROVIA EXPORT CO. BENCHMARK QUALITY.
                    </p>
                    <div className="flex space-x-12 text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
                        <Link href="/privacy" className="hover:text-white/30 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white/30 transition-colors">Terms</Link>
                        <Link href="/compliance" className="hover:text-white/30 transition-colors">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
