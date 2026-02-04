"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { generateNewsletterHtml } from "@/lib/email-template";

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

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  // Basic validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return { error: "This email is already subscribed to our newsletter." };
  }

  const { error } = await supabase.from("newsletter_subscribers").insert([
    { email }
  ]);

  if (error) {
    console.error("Newsletter subscription error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }

  return { success: true };
}

// --- CAMPAIGNS ---

export async function getNewsletters() {
  const { data, error } = await supabase
    .from("newsletters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === 'PGRST205') {
      // Table might not exist yet if migration hasn't run
      return [];
    }
    console.error("Error fetching newsletters:", error);
    return [];
  }
  return data;
}

export async function createNewsletter(formData: FormData) {
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;
  let imageUrl = null;

  // Handle Image Upload
  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from("marketing")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Image upload failed details:", uploadError);
      return { error: `Failed to upload image: ${uploadError.message}` };
    }

    // Get Public URL
    const { data: publicUrlData } = supabase
      .storage
      .from("marketing")
      .getPublicUrl(fileName);

    imageUrl = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("newsletters").insert([
    { subject, content, image_url: imageUrl }
  ]);

  if (error) return { error: error.message };
  revalidatePath("/admin/newsletter");
  return { success: true };
}

export async function sendNewsletter(id: string) {
  // 1. Get the newsletter
  const { data: newsletter, error: fetchError } = await supabase
    .from("newsletters")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !newsletter) return { error: "Newsletter not found." };
  if (newsletter.status === 'sent') return { error: "Newsletter already sent." };

  // 2. Get all subscribers
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("email")
    .eq("is_active", true);

  if (!subscribers || subscribers.length === 0) {
    return { error: "No active subscribers to send to." };
  }

  // 3. Generate Email HTML
  const emailHtml = generateNewsletterHtml({
    subject: newsletter.subject,
    content: newsletter.content,
    imageUrl: newsletter.image_url
  });

  // 4. Simulate Sending (Integration point for Resend/SendGrid)
  console.log(`Starting send for campaign: "${newsletter.subject}"`);
  // console.log("--- EMAIL CONTENT PREVIEW ---");
  // console.log(emailHtml);
  // console.log("-----------------------------");

  for (const sub of subscribers) {
    // In a real app, you would call: await resend.emails.send(...)
    console.log(`[SIMULATION] Sending email to ${sub.email} with template...`);
  }
  console.log(`Finished sending to ${subscribers.length} subscribers.`);

  // 5. Update status
  const { error: updateError } = await supabase
    .from("newsletters")
    .update({
      status: 'sent',
      sent_at: new Date().toISOString()
    })
    .eq("id", id);

  if (updateError) return { error: "Failed to update status." };

  revalidatePath("/admin/newsletter");
  return { success: true, count: subscribers.length };
}
