import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Coffee, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Premium Ceylon Spices"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Experience the Essence <br className="hidden md:block" /> of Ceylon
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Hand-picked spices, premium tea, and artisanal goods from the heart of Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base h-12 px-8 bg-white text-black hover:bg-white/90 transition-all">
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="text-base h-12 px-8 border-white text-white hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Features / Values */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-muted-foreground">Certified organic cultivation ensuring the purest flavors and health benefits.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Sourced directly from artisanal farmers to guarantee superior quality.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethically Sourced</h3>
              <p className="text-muted-foreground">Supporting local communities and sustainable farming practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-accent/30">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Curated Collections</h2>
              <p className="text-muted-foreground mt-2">Explore our range of authentic Sri Lankan products.</p>
            </div>
            <Link href="/shop" className="text-primary font-medium hover:underline hidden md:flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1 */}
            <div className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              {/* Ideally use images here, for now using a colored block/placeholder logic but implemented nicely */}
              <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-1">Authentic Spices</h3>
                <p className="text-white/80 text-sm mb-4">Cinnamon, Cardamom, Cloves & more</p>
                <span className="inline-flex items-center text-sm font-medium hover:underline">
                  Shop Spices <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              {/* Temporary reuse of hero for demo, should be tea image */}
              <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110 grayscale-[30%]" />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-1">Ceylon Tea</h3>
                <p className="text-white/80 text-sm mb-4">World-renowned black, green & white teas</p>
                <span className="inline-flex items-center text-sm font-medium hover:underline">
                  Shop Tea <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              {/* Temporary reuse of hero for demo */}
              <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110 sepia-[30%]" />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-1">Artisanal Crafts</h3>
                <p className="text-white/80 text-sm mb-4">Handmade wooden masks, textiles & décor</p>
                <span className="inline-flex items-center text-sm font-medium hover:underline">
                  Shop Crafts <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">View all collections</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Taprovia Family</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Subscribe to receive exclusive offers, new product announcements, and stories from our artisans.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 h-10 px-4 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button variant="secondary" className="h-10 text-primary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
