"use server";

import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs"; // Make sure to npm install bcryptjs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- REGISTER ---
export async function registerAdmin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    if (!email || !password || !fullName) {
        return { error: "All fields are required." };
    }

    // 1. Hash Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 2. Insert into admin_users (Standalone table)
    const { data, error } = await supabase
        .from("admin_users")
        .insert([{ email, full_name: fullName, password_hash: passwordHash }])
        .select()
        .single();

    if (error) {
        console.error("Registration Error:", error);
        return { error: error.message };
    }

    // 3. Create Session Cookie
    await createSession(data.id);

    redirect("/admin");
}

// --- LOGIN ---
export async function loginAdmin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    // 1. Fetch User by Email
    const { data: user, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
        return { error: "Invalid credentials." };
    }

    // 2. Compare Password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return { error: "Invalid credentials." };
    }

    // 3. Create Session Cookie
    await createSession(user.id);

    redirect("/admin");
}

// --- LOGOUT ---
export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}

// --- HELPER: CREATE SESSION ---
async function createSession(userId: string) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });
}

// --- GET CURRENT USER ---
export async function getAdminUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("admin_session")?.value;

    if (!userId) return null;

    const { data: user, error } = await supabase
        .from("admin_users")
        .select("full_name, email")
        .eq("id", userId)
        .single();

    if (error || !user) return null;

    return user;
}
