"use client";

import { useActionState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginCustomer } from "@/actions/customer-auth";
import { useSearchParams } from "next/navigation";

interface FormState {
    error?: string;
}

function LoginForm() {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "";

    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        async (prevState, formData) => {
            const res = await loginCustomer(formData);
            if (res?.error) {
                return { error: res.error };
            }
            return {};
        },
        {}
    );

    return (
        <form action={formAction} className="space-y-4">
            {state?.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                    {state.error}
                </div>
            )}

            <input type="hidden" name="redirectUrl" value={redirectUrl} />

            <div>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="bg-white/5 border-white/10 text-white"
                    required
                />
            </div>

            <div>
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-white/5 border-white/10 text-white"
                    required
                />
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#D2B48C] hover:bg-[#C1A37B] text-black font-bold h-12"
            >
                {isPending ? "SIGNING IN..." : "SIGN IN"}
            </Button>

            <p className="text-center text-white/40 text-sm mt-6">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#D2B48C] hover:text-white transition-colors">
                    Create Account
                </Link>
            </p>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#111] p-8 rounded-lg border border-white/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-white mb-2">Sign In</h1>
                    <p className="text-white/60">Access your Sovereign Collection account</p>
                </div>

                <Suspense fallback={<div className="text-white">Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
