import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, email, password, universities, role } = body;

  // Sign Up user and store in Supabase Authentication
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: fullName },
    },
  });

  //If error return a message
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  //set to active if email is confirmed
  const isConfirmed = data.user?.confirmed_at !== null;
  const status = isConfirmed ? "active" : "pending";

  const userId = data.user?.id;
  if (!userId) {
    return NextResponse.json(
      { error: "User ID missing after sign up. " },
      { status: 500 }
    );
  }

  //Insert details in the users table
  const { error: profileError } = await supabase.from("users").insert([
    {
      id: userId,
      role,
      university_id: universities,
      full_name: fullName,
      email,
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  //If error send eror message
  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  //If success, send success message
  return NextResponse.json(
    {
      message:
        "User Registered successfully. Please check your email to confirm your account.",
    },
    { status: 200 }
  );
}
