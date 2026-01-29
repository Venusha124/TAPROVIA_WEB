import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const stories = [
    {
        id: 1,
        title: "Global Demand for Ceylon Cinnamon Rises in 2024",
        excerpt: "An in-depth analysis of the export market trends, price fluctuations, and why the EU market is shifting towards True Cinnamon.",
        date: "Jan 15, 2024",
        author: "Sarah Van Dort",
        image: "/hero-bg.png",
        category: "Market Insights"
    },
    {
        id: 2,
        title: "True Cinnamon vs. Cassia: Know the Difference",
        excerpt: "Coumarin content matters. We break down the chemical differences between Cinnamomum zeylanicum and Cassia for health-conscious consumers.",
        date: "Jan 02, 2024",
        author: "Dr. Kamal Silva",
        image: "/hero-bg.png",
        category: "Education"
    },
    {
        id: 3,
        title: "Empowering Women in the Cinnamon Industry",
        excerpt: "Meet the skilled peelers of the Southern province. Our initiative ensures fair wages and healthcare for over 200 female artisans.",
        date: "Dec 20, 2023",
        author: "Aravinda Perera",
        image: "/hero-bg.png",
        category: "Sustainability"
    },
    {
        id: 4,
        title: "From Seed to Stick: The Peeling Process",
        excerpt: "A visual journey through the dawn harvest, the intricate hand-rolling technique, and the shade-drying process that preserves aroma.",
        date: "Dec 10, 2023",
        author: "Dr. Kamal Silva",
        image: "/hero-bg.png",
        category: "Process"
    }
];

export default function StoriesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* HERO */}
            <section className="py-24 bg-[#FAF9F6] text-center">
                <div className="container px-4">
                    <span className="text-[#D2B48C] font-bold tracking-[0.2em] uppercase mb-4 block">The Journal</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1a1a1a] mb-6">Stories from the Plantation</h1>
                    <p className="text-[#4a4a4a] text-lg max-w-2xl mx-auto">
                        Insights on the spice trade, sustainability updates, and the people behind the perfect quill.
                    </p>
                </div>
            </section>

            {/* FEATURED STORY */}
            <section className="py-12 md:py-20">
                <div className="container px-4">
                    <div className="relative rounded-3xl overflow-hidden bg-black aspect-[21/9] mb-20 group cursor-pointer">
                        <Image
                            src="/hero-bg.png"
                            alt="Featured Story"
                            fill
                            className="object-cover opacity-70 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                            <span className="text-[#D2B48C] font-bold tracking-widest uppercase mb-4">Featured Story</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">The Art of the Perfect Quill</h2>
                            <Button className="w-fit bg-white text-black hover:bg-[#D2B48C]">Read Full Article</Button>
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {stories.map((story) => (
                            <article key={story.id} className="group cursor-pointer">
                                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {story.category}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-bold mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        {story.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-3 h-3" />
                                        {story.author}
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a] mb-4 group-hover:text-[#D2B48C] transition-colors">{story.title}</h2>
                                <p className="text-[#4a4a4a] leading-relaxed mb-6">
                                    {story.excerpt}
                                </p>
                                <div className="flex items-center text-[#D2B48C] font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
