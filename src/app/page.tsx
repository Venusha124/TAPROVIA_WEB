import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Award,
  Globe,
  ShieldCheck,
  Sun,
  CheckCircle2,
  TrendingUp,
  Box,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Cinnamon Plantation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
              The Gold Standard of <br />
              <span className="text-[#D2B48C]">Ceylon Cinnamon</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
              Discover the world’s finest cinnamon, carefully sourced and sustainably crafted.
              From aromatic oils to premium sticks and powders bring warmth to every moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#D2B48C] hover:bg-[#C1A076] text-black font-semibold h-14 px-8 text-lg">
                Request a Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 h-14 px-8 text-lg">
                View Export Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY TAPROVIA */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1a1a1a]">Why TAPROVIA?</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto text-lg leading-relaxed">
              We define excellence in the global spice trade through an unwavering commitment to sustainability, certified quality, and logistical reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Leaf className="h-10 w-10 text-[#4A5D23]" />}
              title="Sustainably Sourced"
              description="Direct partnerships with small-holder farms ensuring fair trade prices and eco-friendly harvesting practices."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-[#1a1a1a]" />}
              title="Certified Quality"
              description="Processing centers certified with ISO 22000, HACCP, and GMP standards for absolute purity."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-[#8B4513]" />}
              title="Global Logistics"
              description="Seamless cold-chain shipping to EU, USA, and APAC markets with end-to-end container tracking."
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-[#D2B48C]" />}
              title="Premium Grades"
              description="Exclusively dealing in the finest Alba, C5, and C4 grades of True Cinnamon (Cinnamomum zeylanicum)."
            />
          </div>
        </div>
      </section>

      {/* 3. OUR PREMIUM OFFERINGS */}
      <section className="py-24 bg-[#E8DCC6]">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1a1a1a] text-center">Our Premium Offerings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PremiumCard
              image="/hero-bg.png"
              title="Cinnamon Oils"
              desc="Extracted to preserve aroma and wellness benefits."
            />
            <PremiumCard
              image="/hero-bg.png"
              title="Cinnamon Sticks"
              desc="Hand-rolled premium quills with rich flavor."
            />
            <PremiumCard
              image="/hero-bg.png"
              title="Cinnamon Powder"
              desc="Finely ground cinnamon crafted for consistency."
            />
            <PremiumCard
              image="/hero-bg.png"
              title="Bulk & Export Orders"
              desc="Request a quote for wholesale supply and shipping support."
            />
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our transparent farm-to-port process ensures you get the freshest product.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/20" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StepCard number="01" title="Choose Products" desc="Select oils, sticks, powder or bulk needs." />
              <StepCard number="02" title="Request a Quote" desc="Tell us quantities, destination, and packaging." />
              <StepCard number="03" title="Confirm Details" desc="We finalize pricing, timeline, and shipment." />
              <StepCard number="04" title="Delivery" desc="Safe dispatch with export-ready documentation." />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED BY BUYERS */}
      <section className="py-16 border-b">
        <div className="container px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by Buyers across 15+ Countries
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Placeholders for logos */}
            <div className="text-xl font-bold">EUROSPICE</div>
            <div className="text-xl font-bold">ORGANIC USA</div>
            <div className="text-xl font-bold">ASIAN MART</div>
            <div className="text-xl font-bold">GLOBAL FOODS</div>
            <div className="text-xl font-bold">NATURE INC</div>
          </div>
        </div>
      </section>

      {/* 6. LATEST STORIES */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Latest from the Plantation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StoryCard
              category="Market Insight"
              date="Jan 15, 2024"
              title="Global Demand for Ceylon Cinnamon Rises in 2024"
              desc="Analysis of the export market trends and price fluctuations."
            />
            <StoryCard
              category="Education"
              date="Jan 02, 2024"
              title="True Cinnamon vs. Cassia: Know the Difference"
              desc="Why coumarin content matters for health-conscious consumers."
            />
            <StoryCard
              category="Community"
              date="Dec 20, 2023"
              title="Empowering Women in the Cinnamon Industry"
              desc="Our initiative to support female peelers in the Southern province."
            />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-white">
        <div className="container px-4 max-w-3xl mx-auto border border-black/5 rounded-3xl p-8 md:p-12 shadow-sm bg-[#FAF9F6]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[#1a1a1a]">Frequently Asked Questions</h2>
            <p className="text-[#4a4a4a]">Answers to common queries about our export process.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-black/5">
              <AccordionTrigger className="text-lg text-[#1a1a1a]">What are your Minimum Order Quantities (MOQ)?</AccordionTrigger>
              <AccordionContent className="text-[#4a4a4a] leading-relaxed">
                For bulk export, our MOQ starts at 50kg for Cinnamon Quills and 25kg for Powders and Oils. We also offer sample packs (1kg) for quality verification before larger commitments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-black/5">
              <AccordionTrigger className="text-lg text-[#1a1a1a]">How long does shipping take to Europe and USA?</AccordionTrigger>
              <AccordionContent className="text-[#4a4a4a] leading-relaxed">
                Air freight orders typically arrive within 3-5 business days globally. Sea freight for larger Full Container Loads (FCL) or Less than Container Loads (LCL) ranges from 14-28 days depending on the destination port and current shipping schedules.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-black/5">
              <AccordionTrigger className="text-lg text-[#1a1a1a]">What packaging options do you offer?</AccordionTrigger>
              <AccordionContent className="text-[#4a4a4a] leading-relaxed">
                We provide flexible packaging solutions:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Bulk:</strong> 25kg multi-wall paper bags or corrugated cartons.</li>
                  <li><strong>Freshness:</strong> Vacuum-packed aluminum foil bags for oils and premium quills.</li>
                  <li><strong>Retail-Ready:</strong> Custom private labeling (White Label) in glass jars, kraft pouches, or tins.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="text-lg text-[#1a1a1a]">Is your cinnamon certified organic?</AccordionTrigger>
              <AccordionContent className="text-[#4a4a4a] leading-relaxed">
                Yes, our sourced plantations are USDA Organic and EU Organic certified. We also hold ISO 22000, HACCP, and GMP certifications for our processing facilities to ensure the highest safety standards.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 9. JOIN THE JOURNEY */}
      <section className="relative py-24 bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Abstract Texture */}
          <div className="absolute inset-0 bg-stone-900 opacity-80" />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the TAPROVIA Journey</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Partner with us to bring the authentic taste of Ceylon to your customers.
            Receive our wholesale catalog and seasonal offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold px-10 h-14">
              Partner With Us
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 h-14">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function PremiumCard({ image, title, desc }: { image: string, title: string, desc: string }) {
  return (
    <div className="bg-[#FAF9F6] p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-5">
        {/* Using placeholder logic if image fails, but ideally next/image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{title}</h3>
      <p className="text-[#4a4a4a] text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#FAF9F6] hover:shadow-lg transition-all duration-300 group cursor-default">
      <div className="h-20 w-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-[#1a1a1a]">{title}</h3>
      <p className="text-[#4a4a4a] leading-relaxed text-sm">
        {description}
      </p>
    </div>
  )
}

function ProductCard({ title, desc, color }: { title: string, desc: string, color: string }) {
  return (
    <div className={`p-6 rounded-xl ${color} flex flex-col justify-between h-48 hover:scale-[1.02] transition-transform cursor-pointer`}>
      <div>
        <h4 className="text-xl font-bold text-black/80">{title}</h4>
        <p className="text-black/60 text-sm mt-2">{desc}</p>
      </div>
      <div className="flex justify-end">
        <div className="bg-white/50 p-2 rounded-full">
          <ArrowRight className="h-5 w-5 text-black/70" />
        </div>
      </div>
    </div>
  )
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative pt-8 md:pt-12 text-center md:text-left">
      <div className="hidden md:block absolute top-[1.35rem] left-0 h-4 w-4 bg-black border-2 border-white rounded-full z-10" />

      <span className="text-6xl font-bold text-white/10 absolute top-0 right-0 md:left-0 md:-top-4 -z-10">
        {number}
      </span>

      <h3 className="text-xl font-bold mb-3 mt-4 text-[#D2B48C]">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed border-l-2 md:border-l-0 border-[#D2B48C] pl-4 md:pl-0">
        {desc}
      </p>
    </div>
  )
}

function StoryCard({ category, date, title, desc }: { category: string, date: string, title: string, desc: string }) {
  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <div className="aspect-[16/10] bg-muted rounded-2xl mb-6 overflow-hidden relative shadow-sm">
        <div className="absolute inset-0 bg-[#E8DCC6] group-hover:scale-105 transition-transform duration-700 ease-out" />
        {/* Placeholder overlay */}
        <div className="absolute inset-0 bg-black/5" />
      </div>
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#D2B48C] mb-3">
        <span>{category}</span>
        <span className="text-black/20">•</span>
        <span className="text-black/40">{date}</span>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-[#1a1a1a] group-hover:text-[#D2B48C] transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-[#4a4a4a] text-base leading-relaxed line-clamp-2">
        {desc}
      </p>
    </div>
  )
}
