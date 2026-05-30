"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerCustomer } from "@/actions/customer-auth";

interface FormState {
    error?: string;
}

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        async (prevState, formData) => {
            const res = await registerCustomer(formData);
            if (res?.error) {
                return { error: res.error };
            }
            return {};
        },
        {}
    );

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#111] p-8 rounded-lg border border-white/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-white mb-2">Create Account</h1>
                    <p className="text-white/60">Join the Sovereign Collection</p>
                </div>

                <form action={formAction} className="space-y-4">
                    {state?.error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <Input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className="bg-white/5 border-white/10 text-white"
                            required
                        />
                    </div>

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
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (Optional)"
                            className="bg-white/5 border-white/10 text-white"
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
                        {isPending ? "CREATING..." : "CREATE ACCOUNT"}
                    </Button>

                    <p className="text-center text-white/40 text-sm mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#D2B48C] hover:text-white transition-colors">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
