"use client";

import { deleteProduct } from "@/actions/products";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

interface DeleteProductButtonProps {
    id: string;
}

export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

        if (!confirmed) return;

        startTransition(async () => {
            const result = await deleteProduct(id);

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Product deleted successfully");
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete Product"
        >
            <Trash2 size={16} />
        </button>
    );
}
