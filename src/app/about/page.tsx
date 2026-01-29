import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Leaf, Globe, Award, HeartHandshake, Eye, Target } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-[#F9F5F0]">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#2C2C2C]" />
                    <Image
                        src="/hero-bg.png"
                        alt="Sri Lankan Heritage"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
                <div className="container relative z-10 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Our Heritage</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
                            Rooted in the Soil of Ceylon
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Preserving the ancient legacy of True Cinnamon through sustainable farming and ethical trade.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. OUR STORY */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="/hero-bg.png"
                                alt="Traditional Peeling"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Our Origins</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#1a1a1a] font-serif">A Legacy of Spice</h2>
                            <div className="space-y-6 text-[#4a4a4a] text-lg leading-relaxed">
                                <p>
                                    TAPROVIA was born from a deep respect for Sri Lanka’s "Green Gold"—Cinnamomum zeylanicum. For generations, the art of cinnamon peeling has been a sacred craft in the Southern coastal belt, passed down through families who understand the delicate nature of the bark.
                                </p>
                                <p>
                                    We saw an opportunity to bridge the gap between these artisanal farmers and the global market. By eliminating middlemen and establishing direct trade routes, we ensure that the purest spice reaches high-end kitchens and manufacturers worldwide while ensuring our farmers thrive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. VISION & MISSION */}
            <section className="py-24 bg-[#1a1a1a] text-white">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        {/* Vision */}
                        <div className="relative p-8 md:p-12 border border-white/10 rounded-3xl hover:border-[#D2B48C]/50 transition-colors group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Eye className="w-24 h-24 text-white" />
                            </div>
                            <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Our Vision</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">Global Standard Bearers</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                To be the undisputed global benchmark for Ceylon Cinnamon, recognized not only for the purity of our product but for the integrity of our supply chain. We envision a world where every quill of cinnamon tells the story of the artisan who peeled it.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="relative p-8 md:p-12 border border-white/10 rounded-3xl hover:border-[#D2B48C]/50 transition-colors group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target className="w-24 h-24 text-white" />
                            </div>
                            <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Our Mission</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">Authenticity & Empowerment</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                To export the finest grades of certified Ceylon Cinnamon while empowering small-holder farmers through fair pricing and community development. We aim to educate the world on the health benefits and distinct flavor profile of True Cinnamon.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. OUR VALUES */}
            <section className="py-24 bg-[#E8DCC6]">
                <div className="container px-4 text-center">
                    <span className="text-[#1a1a1a] font-bold tracking-[0.2em] uppercase mb-4 block opacity-60">Why We Do It</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#1a1a1a] font-serif">Our Values</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ValueCard
                            icon={<Leaf className="w-8 h-8" />}
                            title="Purity First"
                            desc="We deal exclusively in True Cinnamon, free from Cassia and additives."
                        />
                        <ValueCard
                            icon={<HeartHandshake className="w-8 h-8" />}
                            title="Ethical Trade"
                            desc="Farmers receive fair prices, health benefits, and community support."
                        />
                        <ValueCard
                            icon={<Globe className="w-8 h-8" />}
                            title="Global Standards"
                            desc="Meeting FDA, EU, and stringent ISO 22000 export regulations."
                        />
                        <ValueCard
                            icon={<Award className="w-8 h-8" />}
                            title="Premium Quality"
                            desc="Hand-selected Alba and C5 grades for the luxury market."
                        />
                    </div>
                </div>
            </section>

            {/* 5. MEET THE PEOPLE */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">Leadership</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1a1a1a] font-serif">Meet the People Behind TAPROVIA</h2>
                        <p className="text-[#4a4a4a] text-lg max-w-2xl mx-auto">
                            A diverse team of agronomists, logistics experts, and visionaries united by a passion for Ceylon spices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <TeamCard
                            image="/hero-bg.png"
                            name="Aravinda Perera"
                            role="Founder & CEO"
                            bio="With 20 years in the plantation sector, Aravinda leads our strategic vision for global expansion."
                        />
                        <TeamCard
                            image="/hero-bg.png"
                            name="Sarah Van Dort"
                            role="Head of Exports"
                            bio="Sarah bridges the gap between our artisanal farms and our buyers in the EU and Americas."
                        />
                        <TeamCard
                            image="/hero-bg.png"
                            name="Dr. Kamal Silva"
                            role="Chief Agronomist"
                            bio="Ensuring sustainable farming practices and ISO quality control across all our estates."
                        />
                    </div>
                </div>
            </section>

            {/* 6. CTA */}
            <section className="py-24 bg-[#1a1a1a] text-white text-center">
                <div className="container px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif">Experience the Authenticity</h2>
                    <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
                        Whether you are a bulk distributor or a boutique brand, partner with us for a reliable supply of the world's finest cinnamon.
                    </p>
                    <Button size="lg" className="bg-[#D2B48C] hover:bg-[#C1A076] text-black font-semibold h-14 px-10 text-lg">
                        Contact Our Exports Team
                    </Button>
                </div>
            </section>

        </div>
    );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-[#FAF9F6] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-[#F3EFE9] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#D2B48C] group-hover:bg-[#D2B48C] group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#1a1a1a]">{title}</h3>
            <p className="text-[#4a4a4a] leading-relaxed">
                {desc}
            </p>
        </div>
    )
}

function TeamCard({ image, name, role, bio }: { image: string, name: string, role: string, bio: string }) {
    return (
        <div className="flex flex-col text-center md:text-left group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[#D2B48C] font-bold text-sm tracking-widest uppercase">{role}</span>
                </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">{name}</h3>
            <p className="text-[#4a4a4a] leading-relaxed">
                {bio}
            </p>
        </div>
    )
}
