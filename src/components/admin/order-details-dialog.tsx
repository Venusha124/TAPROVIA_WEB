"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Truck, User, MapPin, Package, CheckCircle } from "lucide-react";
import { updateOrderStatus } from "@/actions/orders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OrderDetailsDialogProps {
    order: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ORDER_STATUSES = ["Pending", "Fulfillment", "Shipped", "Completed", "Cancelled"];

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(order?.status); // Handle null order safely
    const router = useRouter();

    // Update local status when order changes
    React.useEffect(() => {
        if (order) {
            setStatus(order.status);
        }
    }, [order]);

    if (!order) return null;

    const handleStatusUpdate = async (newStatus: string) => {
        setIsLoading(true);
        try {
            const result = await updateOrderStatus(order.id, newStatus);
            if (result.success) {
                setStatus(newStatus);
                toast.success(`Order status updated to ${newStatus}`);
                router.refresh();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0A0A0A] border border-white/10 text-[#F3EFE9] max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-center mr-8">
                        <div>
                            <DialogTitle className="text-2xl font-serif text-white mb-2">Order {order.order_number}</DialogTitle>
                            <p className="text-white/40 text-sm flex items-center gap-2">
                                <ClockIcon className="w-3 h-3" /> {formatDate(order.created_at)}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-serif text-[#D2B48C] italic">{formatCurrency(order.total_price)}</span>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{order.payment_status}</div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-8 mt-6">
                    {/* Status Control */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#D2B48C]/10 flex items-center justify-center text-[#D2B48C]">
                                <Truck size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Order Status</h4>
                                <p className="text-white/40 text-xs">Current stage of fulfillment</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {ORDER_STATUSES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleStatusUpdate(s)}
                                    disabled={isLoading}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${status === s
                                        ? "bg-[#D2B48C] text-black border-[#D2B48C]"
                                        : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Customer Info */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D2B48C] flex items-center gap-2">
                                <User size={14} /> Customer
                            </h3>
                            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-3">
                                <div className="text-lg text-white font-serif">{order.customer?.full_name}</div>
                                <div className="text-white/60 text-sm">{order.customer?.email}</div>
                                <div className="text-white/60 text-sm">{order.customer?.phone || "No phone"}</div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D2B48C] flex items-center gap-2">
                                <MapPin size={14} /> Shipping Address
                            </h3>
                            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-1 text-sm text-white/60">
                                {order.customer?.address ? (
                                    <>
                                        <div className="text-white">{order.customer.address.street}</div>
                                        <div>{order.customer.address.city}</div>
                                        <div>{order.customer.address.postal_code}</div>
                                        <div>{order.customer.address.country || "Sri Lanka"}</div>
                                    </>
                                ) : (
                                    <div className="italic text-white/20">Address data unavailable</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D2B48C] flex items-center gap-2">
                            <Package size={14} /> Order Items
                        </h3>
                        <div className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="p-4">Product</th>
                                        <th className="p-4 text-center">Qty</th>
                                        <th className="p-4 text-right">Price</th>
                                        <th className="p-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {order.items?.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-white/5">
                                                        {item.product?.images?.[0] && (
                                                            <Image
                                                                src={item.product.images[0]}
                                                                alt={item.product.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="text-white">{item.product?.title || "Unknown Product"}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center text-white/60">{item.quantity}</td>
                                            <td className="p-4 text-right text-white/60">{formatCurrency(item.price)}</td>
                                            <td className="p-4 text-right text-[#D2B48C]">{formatCurrency(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ClockIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
