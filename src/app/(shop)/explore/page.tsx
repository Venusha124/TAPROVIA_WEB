import { getProducts } from "@/actions/products";
import ExplorePageClient from "./explore-client";

export default async function ExplorePage() {
    // Fetch products from DB
    const dbProducts = await getProducts();

    // Transform to match UI expectation
    const products = dbProducts.map((p: any) => ({
        id: String(p.id),
        name: p.title,
        grade: p.grade || "PREMIUM",
        description: p.description,
        origin: p.origin || "Ceylon",
        image: p.images?.[0] || "/products/cinnamon_powder_bowl.png", // Fallback image
        features: p.features || ["Sustainably Sourced", "Export Quality"],
        price: Number(p.price) || 0,
        category: p.category || "Sticks"
    }));

    return <ExplorePageClient products={products} />;
}
