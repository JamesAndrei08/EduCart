import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("id");

  if (!postId) {
    return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts_with_user")
    .select(
      "seller_id, full_name, post_type_name, item_title, item_description, item_price, image_urls, category_name, condition"
    )
    .eq("post_id", postId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
