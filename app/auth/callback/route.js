import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    //checking for error
    if (error || !data?.user) {
      console.error(error?.message || "Login failed");
    }

    // Check if profile exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("profile")
      .select("*")
      .eq("email", data?.user?.email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(fetchError.message);
    }

    // Insert profile if it doesn't exist
    if (!existingUser) {
      const { error: insertError } = await supabase.from("profile").insert([
        {
          email: data?.user?.email,
          id: data?.user?.id,
          full_name: data?.user?.user_metadata?.name,
        },
      ]);

      if (insertError) {
        console.error(insertError.message);
      }
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
