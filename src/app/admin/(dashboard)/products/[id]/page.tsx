import React from "react";
import { getProduct } from "@/actions/products";
import ProductForm from "@/components/admin/product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    // Await params object first (Next.js 15+ requirement or good practice)
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return <ProductForm initialData={product} isEdit={true} />;
}
