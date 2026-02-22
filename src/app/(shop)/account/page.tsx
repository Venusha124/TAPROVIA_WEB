"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCustomerUser, logoutCustomer, updateCustomerProfile } from "@/actions/customer-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, MapPin, Package, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { getCustomerOrders } from "@/actions/orders";

export default function AccountPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "cart">("profile");
    const [orders, setOrders] = useState<any[]>([]);
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getCustomerUser();
            if (!userData) {
                router.push("/login?redirect=/account");
            } else {
                setUser(userData);

                setPhone(userData.phone || "");
                if (userData.address) {
                    let parsed: any = userData.address;
                    if (typeof parsed === 'string') {
                        try { parsed = JSON.parse(parsed); } catch (e) { }
                    }
                    if (typeof parsed === 'string') {
                        try { parsed = JSON.parse(parsed); } catch (e) { } // double stringified
                    }

                    if (typeof parsed === 'object' && parsed !== null) {
                        setStreet(parsed.street || parsed.fullAddress || "");
                        setCity(parsed.city || "");
                        setPostalCode(parsed.postalCode || parsed.postal_code || "");
                    } else {
                        setStreet(String(userData.address));
                    }
                }

                const userOrders = await getCustomerOrders(userData.id);
                setOrders(userOrders || []);
            }
            setLoading(false);
        }
        fetchUser();

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    }, [router]);

    const handleSaveAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        const addressObj = { street, city, postalCode };

        const result = await updateCustomerProfile(user.id, phone, addressObj);

        if (!result.success) {
            setMessage("Failed to save address. Please try again.");
        } else {
            setMessage("Address saved successfully!");
            setUser({
                ...user,
                phone,
                address: addressObj
            });
            // Force a router refresh to bust the Next.js client-side cache
            router.refresh();
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center pt-24">
                <p className="text-[#D2B48C]">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black pt-32 pb-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-serif text-white">My Account</h1>
                    <Button
                        variant="outline"
                        className="text-white border-white/20 hover:bg-white/10"
                        onClick={async () => {
                            await logoutCustomer();
                            window.location.href = '/login';
                        }}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col - Navigation/Summary */}
                    <div className="space-y-4">
                        <div className="bg-[#111] p-6 rounded-lg border border-white/10">
                            <div className="flex items-center space-x-4 mb-6 text-white">
                                <div className="w-12 h-12 bg-[#D2B48C]/20 rounded-full flex items-center justify-center text-[#D2B48C]">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold">{user.full_name}</p>
                                    <p className="text-sm text-white/50">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <Button
                                    onClick={() => setActiveTab("profile")}
                                    variant="ghost"
                                    className={`w-full justify-start ${activeTab === 'profile' ? 'text-[#D2B48C] bg-white/5' : 'text-white/50 hover:text-white'}`}
                                >
                                    <MapPin className="w-4 h-4 mr-3" />
                                    Address & Profile
                                </Button>
                                <Button
                                    onClick={() => setActiveTab("orders")}
                                    variant="ghost"
                                    className={`w-full justify-start ${activeTab === 'orders' ? 'text-[#D2B48C] bg-white/5' : 'text-white/50 hover:text-white'}`}
                                >
                                    <Package className="w-4 h-4 mr-3" />
                                    Order History
                                </Button>
                                <Button
                                    onClick={() => setActiveTab("cart")}
                                    variant="ghost"
                                    className={`w-full justify-start ${activeTab === 'cart' ? 'text-[#D2B48C] bg-white/5' : 'text-white/50 hover:text-white'}`}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-3" />
                                    Current Cart
                                </Button>
                            </nav>
                        </div>
                    </div>

                    {/* Right Col - Content */}
                    <div className="md:col-span-2 space-y-6">
                        {activeTab === 'profile' && (
                            <div className="bg-[#111] p-8 rounded-lg border border-white/10">
                                <h2 className="text-2xl font-serif text-white mb-6">Delivery Address</h2>

                                {(user.phone || user.address) && (
                                    <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-lg">
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D2B48C] mb-4">Currently Saved Address</h3>
                                        <div className="space-y-1 text-white/80 text-sm">
                                            {user.full_name && <p className="font-bold text-white mb-2">{user.full_name}</p>}
                                            {user.phone && <p>{user.phone}</p>}
                                            {(() => {
                                                if (!user.address) return null;

                                                let p: any = user.address;
                                                if (typeof p === 'string') {
                                                    try { p = JSON.parse(p); } catch (e) { }
                                                }
                                                if (typeof p === 'string') {
                                                    try { p = JSON.parse(p); } catch (e) { }
                                                }

                                                let savedStreet = "";
                                                let savedCity = "";
                                                let savedPostal = "";

                                                if (typeof p === 'object' && p !== null) {
                                                    savedStreet = p.street || p.fullAddress || "";
                                                    savedCity = p.city || "";
                                                    savedPostal = p.postalCode || p.postal_code || "";
                                                } else {
                                                    savedStreet = String(user.address || "");
                                                }

                                                return (
                                                    <>
                                                        {savedStreet ? <p>{savedStreet}</p> : null}
                                                        {(savedCity || savedPostal) ? (
                                                            <p>
                                                                {savedCity}{savedCity && savedPostal ? ", " : ""}{savedPostal}
                                                            </p>
                                                        ) : null}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}

                                <p className="text-white/60 mb-6 font-light">
                                    Update your delivery address here to speed up your checkout process.
                                </p>

                                <form onSubmit={handleSaveAddress} className="space-y-4">
                                    {message && (
                                        <div className={`p-3 rounded text-sm ${message.includes("success") ? "bg-green-500/10 border-green-500/50 text-green-500" : "bg-red-500/10 border-red-500/50 text-red-500"}`}>
                                            {message}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <Input
                                                type="tel"
                                                value={phone}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                                placeholder="Mobile Number"
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <textarea
                                                value={street}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStreet(e.target.value)}
                                                placeholder="Street Address..."
                                                className="w-full min-h-[80px] bg-white/5 border border-white/10 text-white p-3 rounded-md focus:outline-none focus:border-[#D2B48C] transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="text"
                                                value={city}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                                                placeholder="City"
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="text"
                                                value={postalCode}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
                                                placeholder="Postal Code"
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#D2B48C] hover:bg-[#C1A37B] text-black font-bold px-8"
                                    >
                                        {saving ? "SAVING..." : "SAVE ADDRESS"}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-[#111] p-8 rounded-lg border border-white/10">
                                <h2 className="text-2xl font-serif text-white mb-6">Order History</h2>
                                {orders.length === 0 ? (
                                    <p className="text-white/60 font-light">You have no orders yet.</p>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order: any) => (
                                            <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-lg">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-white font-bold">{order.order_number}</h3>
                                                        <p className="text-[10px] text-white/50 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[#D2B48C] font-mono">${order.total_price}</span>
                                                        <p className="text-sm mt-1">
                                                            <span className="bg-white/10 px-2 py-1 rounded text-white/80 text-xs">{order.status}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                                                    {order.items?.map((item: any, i: number) => (
                                                        <div key={i} className="flex justify-between text-sm text-white/60">
                                                            <span>{item.quantity}x {item.product?.title || 'Unknown Product'}</span>
                                                            <span>${item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'cart' && (
                            <div className="bg-[#111] p-8 rounded-lg border border-white/10">
                                <h2 className="text-2xl font-serif text-white mb-6">Current Cart</h2>
                                {cartItems.length === 0 ? (
                                    <p className="text-white/60 font-light">Your cart is empty.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item: any, i: number) => (
                                            <div key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-lg border border-white/10">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-serif">{item.name}</h4>
                                                    <p className="text-[10px] uppercase tracking-widest text-white/40">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-[#D2B48C] font-mono">${Number(item.price).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
                                            <Button onClick={() => router.push('/cart')} className="bg-[#D2B48C] text-black hover:bg-white font-bold px-8">
                                                GO TO CHECKOUT
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
