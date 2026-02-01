import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalLiveChat } from "@/components/layout/global-live-chat";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <GlobalLiveChat />
        </div>
    );
}
