"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Cart Item Type
export interface CartItem {
    id: string;
    name: string;
    grade?: string;
    origin: string;
    price: number;
    quantity: number;
    image: string;
}

// Cart Context Type
interface CartContextType {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("taprovia_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("taprovia_cart", JSON.stringify(items));
        }
    }, [items, isInitialized]);

    // Add item to cart or increment quantity if already exists
    const addToCart = (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        setItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);

            if (existingItem) {
                // Item exists, increment quantity
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            } else {
                // New item, add to cart
                return [...prev, { ...product, quantity: product.quantity || 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Update item quantity
    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // Clear all items from cart
    const clearCart = () => {
        setItems([]);
    };

    // Calculate total item count
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    // Calculate subtotal
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const value: CartContextType = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
