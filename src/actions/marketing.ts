"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// --- COUPONS ---

export async function getCoupons() {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === 'PGRST205') {
      console.warn("⚠️ Marketing Warning: 'coupons' table not found. Please run supabase/marketing_schema.sql");
      return [];
    }
    console.error("Error fetching coupons:", error);
    return [];
  }
  return data;
}

export async function createCoupon(formData: FormData) {
  const code = formData.get("code") as string;
  const discountType = formData.get("discountType") as string;
  const discountValue = parseFloat(formData.get("discountValue") as string);
  const expirationDate = formData.get("expirationDate") as string;
  const usageLimit = formData.get("usageLimit") ? parseInt(formData.get("usageLimit") as string) : null;
  const minPurchaseAmount = parseFloat(formData.get("minPurchaseAmount") as string) || 0;

  const { error } = await supabase.from("coupons").insert([
    {
      code,
      discount_type: discountType,
      discount_value: discountValue,
      expiration_date: expirationDate || null,
      usage_limit: usageLimit,
      min_purchase_amount: minPurchaseAmount,
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/coupons");
  return { success: true };
}

export async function deleteCoupon(id: string) {
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/coupons");
  return { success: true };
}

export async function toggleCouponStatus(id: string, isActive: boolean) {
  const { error } = await supabase
    .from("coupons")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/coupons");
  return { success: true };
}


// --- NEWSLETTER ---

export async function getNewsletterSubscribers() {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) {
    if (error.code === 'PGRST205') {
      console.warn("⚠️ Marketing Warning: 'newsletter_subscribers' table not found. Please run supabase/marketing_schema.sql");
      return [];
    }
    console.error("Error fetching subscribers:", error);
    return [];
  }
  return data;
}

export async function deleteSubscriber(id: string) {
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/newsletter");
  return { success: true };
}
