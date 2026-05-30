"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function InvoicePage() {
    const params = useParams();
    const id = params.id as string;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;

            try {
                const { data, error } = await supabase
                    .from("orders")
                    .select(`
                        *,
                        customer:customers(*),
                        items:order_items(
                            *,
                            product:products(*)
                        )
                    `)
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching order:", error);
                    return;
                }
                setOrder(data);
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    useEffect(() => {
        // Automatically open print dialog once order data is loaded
        if (order && !loading) {
            // Small timeout ensures images and layout are rendered before printing
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [order, loading]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-black">Loading Invoice Data...</div>;
    }

    if (!order) {
        return <div className="min-h-screen flex items-center justify-center text-black">Order not found.</div>;
    }

    return (
        <div className="bg-white text-black min-h-screen font-sans p-8 md:p-12 print:p-0">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-black/20 pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-serif font-bold tracking-tighter mb-2">TAPROVIA</h1>
                    <p className="text-sm text-black/60 font-serif italic">Premium Ceylon Cinnamon</p>
                    <p className="text-xs text-black/40 mt-4">123 Sovereign Estate, Matara, Sri Lanka</p>
                    <p className="text-xs text-black/40">hello@taprovia.com | +94 77 123 4567</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-black text-black/20 tracking-widest uppercase mb-4">INVOICE</h2>
                    <p className="text-sm font-bold">Order # {order.order_number}</p>
                    <p className="text-sm text-black/60">Date: {formatDate(order.created_at)}</p>
                </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-3 border-b border-black/10 pb-2">Billed To</h3>
                    <p className="font-serif text-lg font-bold">{order.customer?.full_name}</p>
                    <p className="text-sm text-black/60">{order.customer?.email}</p>
                    <p className="text-sm text-black/60">{order.customer?.phone}</p>
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-3 border-b border-black/10 pb-2">Shipped To</h3>
                    {order.customer?.address ? (
                        <>
                            <p className="text-sm text-black/80">{order.customer.address.street}</p>
                            <p className="text-sm text-black/80">{order.customer.address.city}, {order.customer.address.postal_code}</p>
                            <p className="text-sm text-black/80">{order.customer.address.country || "Sri Lanka"}</p>
                        </>
                    ) : (
                        <p className="text-sm italic text-black/40">Same as billing</p>
                    )}
                </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-left mb-12">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-3 text-xs font-bold uppercase tracking-widest text-black/60">Description</th>
                        <th className="py-3 text-xs font-bold uppercase tracking-widest text-black/60 text-center">Qty</th>
                        <th className="py-3 text-xs font-bold uppercase tracking-widest text-black/60 text-right">Unit Price</th>
                        <th className="py-3 text-xs font-bold uppercase tracking-widest text-black/60 text-right">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                    {order.items?.map((item: any) => (
                        <tr key={item.id}>
                            <td className="py-4">
                                <p className="font-bold text-sm">{item.product?.title || "Unknown Product"}</p>
                                <p className="text-xs text-black/50 font-serif italic">Grade: {item.product?.grade || "Premium"}</p>
                            </td>
                            <td className="py-4 text-center text-sm">{item.quantity}</td>
                            <td className="py-4 text-right text-sm">{formatCurrency(item.price)}</td>
                            <td className="py-4 text-right font-bold text-sm">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary */}
            <div className="flex justify-end border-t border-black/20 pt-6">
                <div className="w-1/2 md:w-1/3 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-black/60">Subtotal</span>
                        <span>{formatCurrency(order.total_price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-black/60">Shipping</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-black pt-3">
                        <span className="font-bold uppercase tracking-widest">Total</span>
                        <span className="font-serif font-bold text-xl">{formatCurrency(order.total_price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-4 pt-4 border-t border-black/10">
                        <span className="text-black/40 uppercase tracking-widest font-bold">Payment Status</span>
                        <span className={`font-bold uppercase ${order.payment_status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>{order.payment_status}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-black/10 text-center">
                <p className="text-xs text-black/40 italic font-serif">"From Soil To Sovereign."</p>
                <p className="text-[10px] text-black/30 mt-2 uppercase tracking-widest">Thank you for choosing TAPROVIA.</p>
            </div>

            {/* Print specific styles to hide browser UI tools when printing */}
            <style jsx global>{`
                @media print {
                    @page { margin: 1.5cm; }
                    body { -webkit-print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
