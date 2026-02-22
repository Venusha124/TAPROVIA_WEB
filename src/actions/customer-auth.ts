"use server";

import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- REGISTER CUSTOMER ---
export async function registerCustomer(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const phone = (formData.get("phone") as string) || null;

    if (!email || !password || !fullName) {
        return { error: "Name, email, and password are required." };
    }

    // 1. Hash Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 2. Insert into customers table
    const { data, error } = await supabase
        .from("customers")
        .insert([{ email, full_name: fullName, password_hash: passwordHash, phone }])
        .select()
        .single();

    if (error) {
        console.error("Registration Error:", error);
        return { error: error.message };
    }

    // 3. Create Session Cookie
    await createCustomerSession(data.id);

    redirect("/account");
}

// --- LOGIN CUSTOMER ---
export async function loginCustomer(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    // 1. Fetch User by Email
    const { data: user, error } = await supabase
        .from("customers")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
        return { error: "Invalid credentials." };
    }

    // 2. Check if user has a password (they might be a guest order customer previously)
    if (!user.password_hash) {
        return { error: "Account exists without password. Please reset or contact support." };
    }

    // 3. Compare Password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return { error: "Invalid credentials." };
    }

    // 4. Create Session Cookie
    await createCustomerSession(user.id);

    // Redirect to redirectUrl if present, else /account
    const redirectUrl = formData.get("redirectUrl") as string;
    if (redirectUrl) {
        redirect(redirectUrl);
    } else {
        redirect("/account");
    }
}

// --- LOGOUT CUSTOMER ---
export async function logoutCustomer() {
    const cookieStore = await cookies();
    cookieStore.delete("customer_session");
}

// --- HELPER: CREATE CUSTOMER SESSION ---
async function createCustomerSession(userId: string) {
    const cookieStore = await cookies();
    cookieStore.set("customer_session", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });
}

// --- GET CURRENT CUSTOMER ---
export async function getCustomerUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("customer_session")?.value;

    if (!userId) return null;

    const { data: user, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", userId)
        .single();


    if (error || !user) return null;

    return user;
}

import { revalidatePath } from "next/cache";

// --- UPDATE CUSTOMER PROFILE ---
export async function updateCustomerProfile(userId: string, phone: string, addressObj: any) {
    const { error } = await supabase
        .from("customers")
        .update({
            phone,
            address: addressObj
        })
        .eq("id", userId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/account");
    revalidatePath("/checkout");

    return { success: true };
}
