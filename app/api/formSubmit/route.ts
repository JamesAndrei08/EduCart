"use server";

import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "../uploadImage/route";

export async function ForSale(formData: FormData, selectedType: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");
  if (!user.email) return { error: "User email is missing." };

  const itemTitle = formData.get("itemTitle") as string;
  const itemPrice = Number(formData.get("itemPrice"));
  const itemDescription = formData.get("itemDescription") as string;
  const images = formData.getAll("itemImage") as File[];

  if (images.length > 10) {
    return { error: "You can only upload up to 10 images." };
  }

  const imageUrls = await uploadImage(
    images,
    "post-images",
    "post",
    user.email
  );
  if (imageUrls.length === 0) return { error: "Failed to upload item images." };

  const { data: postType } = await supabase
    .from("post_types")
    .select("id")
    .eq("name", selectedType)
    .single();

  if (!postType) return { error: "Invalid post type selected." };

  const { error: insertError } = await supabase.from("posts").insert([
    {
      seller_id: user.id,
      item_title: itemTitle,
      item_price: itemPrice,
      item_description: itemDescription,
      post_type_id: postType.id,
      image_urls: imageUrls, // ✅ Make sure this column exists as TEXT[]
    },
  ]);

  if (insertError) {
    console.error("Insert Failed:", insertError);
    return { error: "Database error: " + insertError.message };
  }

  console.log("Post created successfully by user:", user.id);
}
