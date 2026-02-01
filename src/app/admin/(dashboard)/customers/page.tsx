import React from "react";
import { getCustomers } from "@/actions/customers";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Search, Filter, Mail, Phone, ShoppingBag } from "lucide-react";

export default async function CustomersPage() {
    const customers = await getCustomers();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white font-light mb-2">Customers</h1>
                    <p className="text-white/40 text-sm">Manage your customer base and view their activity.</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 bg-[#050505] p-2 rounded-2xl border border-white/5">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none text-sm"
                    />
                </div>
                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors border-l border-white/5">
                    <Filter size={18} />
                </button>
            </div>

            {/* Customers Table */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Customer</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Contact</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Orders</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Total Spent</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-white/20 text-sm">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer: any) => (
                                    <tr key={customer.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D2B48C]/20 to-[#8B4513]/20 flex items-center justify-center text-[#D2B48C] font-serif font-bold text-sm">
                                                    {customer.full_name.charAt(0)}
                                                </div>
                                                <span className="text-white font-medium">{customer.full_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1 text-sm text-white/60">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={12} className="text-white/20" />
                                                    {customer.email}
                                                </div>
                                                {customer.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={12} className="text-white/20" />
                                                        {customer.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                                <ShoppingBag size={14} className="text-[#D2B48C]" />
                                                {customer.total_orders} orders
                                            </div>
                                        </td>
                                        <td className="p-6 text-white font-serif italic text-lg">
                                            {formatCurrency(customer.total_spent)}
                                        </td>
                                        <td className="p-6 text-right text-white/20 text-xs uppercase tracking-widest font-bold">
                                            {formatDate(customer.created_at)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
