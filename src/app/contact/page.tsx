import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
            {/* HEADER */}
            <section className="bg-[#1a1a1a] text-white py-24 text-center">
                <div className="container px-4">
                    <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Start Your Export Journey</h1>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg">
                        Discuss your requirements with our dedicated support team. We reply within 24 hours.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* INFO */}
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-8">Headquarters</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D2B48C] shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-2">Office & Processing Center</h3>
                                        <p className="text-[#4a4a4a] leading-relaxed">
                                            No. 45, Cinnamon Gardens,<br />
                                            Galle Road, Balapitiya,<br />
                                            Southern Province, Sri Lanka.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D2B48C] shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-2">Phone Support</h3>
                                        <p className="text-[#4a4a4a] mb-1">+94 11 234 5678 (General)</p>
                                        <p className="text-[#4a4a4a]">+94 77 123 4567 (Exports Direct)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D2B48C] shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-2">Email Us</h3>
                                        <p className="text-[#4a4a4a] mb-1">exports@taprovia.com</p>
                                        <p className="text-[#4a4a4a]">info@taprovia.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D2B48C] shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-2">Business Hours</h3>
                                        <p className="text-[#4a4a4a] mb-1">Mon - Fri: 8:00 AM - 6:00 PM (IST)</p>
                                        <p className="text-[#4a4a4a]">Sat: 9:00 AM - 1:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg bg-[#FAF9F6] border border-transparent focus:border-[#D2B48C] focus:bg-white transition-all outline-none" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg bg-[#FAF9F6] border border-transparent focus:border-[#D2B48C] focus:bg-white transition-all outline-none" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-[#FAF9F6] border border-transparent focus:border-[#D2B48C] focus:bg-white transition-all outline-none" placeholder="john@company.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">Topic</label>
                                    <select className="w-full px-4 py-3 rounded-lg bg-[#FAF9F6] border border-transparent focus:border-[#D2B48C] focus:bg-white transition-all outline-none text-[#4a4a4a]">
                                        <option>Wholesale Inquiry</option>
                                        <option>Sample Request</option>
                                        <option>Logistics Support</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-[#FAF9F6] border border-transparent focus:border-[#D2B48C] focus:bg-white transition-all outline-none" placeholder="Tell us about your requirements..." ></textarea>
                                </div>

                                <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#D2B48C] h-12 text-lg">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
