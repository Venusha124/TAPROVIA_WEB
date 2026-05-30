"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

export default function InvoicesPage() {
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [invoiceNumber, setInvoiceNumber] = useState("INV-001");

    const [items, setItems] = useState<InvoiceItem[]>([
        { id: "1", description: "", quantity: 1, price: 0 }
    ]);

    const addItem = () => {
        setItems([
            ...items,
            { id: Math.random().toString(36).substr(2, 9), description: "", quantity: 1, price: 0 }
        ]);
    };

    const removeItem = (id: string) => {
        if (items.length === 1) return;
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const subtotal = calculateSubtotal();
    const taxRate = 0; // Configurable if needed
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    const handlePrint = () => {
        window.print();
    };

    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        const fetchAdmin = async () => {
            const { getAdminUser } = await import("@/actions/auth");
            const user = await getAdminUser();
            if (user) {
                setAdminName(user.full_name);
            }
        };
        fetchAdmin();
    }, []);

    return (
        <div className="space-y-6">
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #invoice-card, #invoice-card * {
                        visibility: visible;
                    }
                    #invoice-card {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 20px;
                        background: white;
                        color: black;
                        box-shadow: none;
                        border: none;
                    }
                    /* Ensure inputs look like text when printing */
                    #invoice-card input {
                        border: none;
                        background: transparent;
                        padding: 0;
                    }
                    /* Hide placeholders when printing */
                    #invoice-card input::placeholder {
                        color: transparent;
                    }
                }
            `}</style>

            <div className="flex items-center justify-between print:hidden">
                <h1 className="text-3xl font-serif font-bold text-[#D2B48C]">Invoices</h1>
                <Button onClick={handlePrint} className="bg-[#D2B48C] hover:bg-[#C19A6B] text-black transition-all">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Invoice
                </Button>
            </div>

            <div className="mx-auto max-w-4xl">
                <Card id="invoice-card" className="p-8 bg-white text-black shadow-lg">
                    {/* Invoice Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                        <div className="w-full md:w-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">INVOICE</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <span className="font-semibold w-24">Invoice #:</span>
                                <input
                                    type="text"
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#D2B48C] w-32 font-mono"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-semibold w-24">Date:</span>
                                <input
                                    type="date"
                                    value={invoiceDate}
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#D2B48C] w-32 font-mono"
                                />
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="text-2xl font-serif font-bold text-[#D2B48C] mb-2">TAPROVIA</div>
                            <address className="text-sm text-gray-500 not-italic leading-relaxed">
                                123 Restaurant Street<br />
                                Colombo, Sri Lanka<br />
                                contact@taprovia.com
                            </address>
                        </div>
                    </div>

                    {/* Bill To */}
                    <div className="mb-12">
                        <h3 className="text-gray-400 font-semibold mb-4 uppercase tracking-wider text-xs">Bill To</h3>
                        <div className="grid grid-cols-1 gap-2 max-w-sm">
                            <input
                                type="text"
                                placeholder="Client Name"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full bg-gray-50 p-2 rounded border border-transparent focus:bg-white focus:border-[#D2B48C] focus:outline-none transition-colors font-medium text-lg placeholder:font-normal"
                            />
                            <input
                                type="text"
                                placeholder="Client Address"
                                value={clientAddress}
                                onChange={(e) => setClientAddress(e.target.value)}
                                className="w-full bg-gray-50 p-2 rounded border border-transparent focus:bg-white focus:border-[#D2B48C] focus:outline-none transition-colors text-sm"
                            />
                            <input
                                type="email"
                                placeholder="Client Email"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                className="w-full bg-gray-50 p-2 rounded border border-transparent focus:bg-white focus:border-[#D2B48C] focus:outline-none transition-colors text-sm"
                            />
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-8 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="py-3 font-semibold text-gray-600 w-[45%] pl-2">Description</th>
                                    <th className="py-3 font-semibold text-gray-600 w-[15%] text-right">Qty</th>
                                    <th className="py-3 font-semibold text-gray-600 w-[20%] text-right">Price</th>
                                    <th className="py-3 font-semibold text-gray-600 w-[20%] text-right pr-2">Total</th>
                                    <th className="py-3 font-semibold text-gray-600 w-[50px] print:hidden"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-50 group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-2 pr-2 pl-2">
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                className="w-full bg-transparent p-1 focus:outline-none border-b border-transparent focus:border-gray-200"
                                                placeholder="Item description"
                                            />
                                        </td>
                                        <td className="py-2 pr-2">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                className="w-full text-right bg-transparent p-1 focus:outline-none border-b border-transparent focus:border-gray-200"
                                            />
                                        </td>
                                        <td className="py-2 pr-2">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                                    className="w-full text-right bg-transparent p-1 focus:outline-none border-b border-transparent focus:border-gray-200"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-2 text-right font-medium text-gray-900 pr-2">
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </td>
                                        <td className="py-2 text-right print:hidden text-center">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                                disabled={items.length === 1}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 print:hidden pl-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addItem}
                                className="border-dashed border-gray-300 text-gray-500 hover:text-[#D2B48C] hover:border-[#D2B48C] hover:bg-transparent"
                            >
                                <Plus size={16} className="mr-2" />
                                Add Item
                            </Button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="flex justify-end mt-8 pr-2">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {taxRate > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax ({taxRate * 100}%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="border-t-2 border-gray-100 pt-3 flex justify-between font-bold text-xl text-gray-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer & Signature */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-end">
                        <div className="text-gray-500 text-sm">
                            <p className="font-medium">Thank you for your business!</p>
                            <p className="text-xs mt-1">www.taprovia.com</p>
                        </div>
                        <div className="text-right">
                            <div className="mb-2 border-b border-gray-300 w-48 mx-auto md:mx-0"></div>
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Responsible Person</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{adminName || "Authorized Signature"}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
