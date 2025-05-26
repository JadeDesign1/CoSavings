"use server";
import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

/* auth */
export const signUp = async ({ email, password, full_name }) => {
  const supabase = await createClient();
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: full_name,
      },
    },
  });
  //checking for error
  if (error) {
    return { status: error?.message, user: null };
  } /* checking if user exist */ else if (
    data?.user?.identities?.length === 0
  ) {
    return { status: "user with this email already exist", user: null };
  }
  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
};

export const login = async ({ email, password }) => {
  const supabase = await createClient();
  let { data: loggedUser, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  //checking for error
  if (loginError || !loggedUser?.user) {
    return { status: loginError?.message || "Login failed", user: null };
  }

  // Check if profile exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("profile")
    .select("*")
    .eq("email", email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return { status: fetchError.message, user: null };
  }

  // Insert profile if it doesn't exist
  if (!existingUser) {
    const { error: insertError } = await supabase.from("profile").insert([
      {
        email: loggedUser?.user?.email,
        id: loggedUser?.user?.id,
        full_name: loggedUser?.user?.user_metadata?.name,
      },
    ]);

    if (insertError) {
      return { status: insertError.message, user: null };
    }
  }

  revalidatePath("/", "layout");
  return { status: "success", user: loggedUser.user };
};

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  //checking for error
  if (error) {
    return { status: error?.message, user: null };
  }
  return { status: "success", user: data.user };
};

export const logout = async () => {
  const supabase = await createClient();
  let { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
};

export async function signInWithGoogle() {
  const getUrl = async () => {
    const origin = (await headers()).get("origin");
    return origin;
  };
  const origin =
    process.env.NODE_ENV === "development"
      ? await getUrl()
      : "https://cosavings.vercel.app";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    redirect("/error");
  } else if (data.url) {
    return redirect(data.url);
  }
}

export async function forgotPassword({ email }) {
  const getUrl = async () => {
    const origin = (await headers()).get("origin");
    return origin;
  };
  const origin =
    process.env.NODE_ENV === "development"
      ? await getUrl()
      : "https://cosavings.vercel.app";
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });
  if (error) {
    return { status: error?.message, user: null };
  }
  return { status: "success" };
}

export async function resetPassword({ values, code }) {
  const supabase = await createClient();

  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: "recovery",
    email: values.email, // ✅ REQUIRED
    token: code,
  });

  if (verifyError) {
    return {
      status: verifyError.message,
    };
  }

  // Now user is logged in; proceed to update password
  const { error } = await supabase.auth.updateUser({
    password: values.password,
  });

  if (error) {
    return {
      status: error.message,
    };
  }

  return {
    status: "success",
  };
}

/* profile */
export const editUserProfile = async ({ name, email }) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile")
    .update({ full_name: name, email: email })
    .eq("email", email)
    .select();
  console.log(data);
  return { data, error };
};

export const fetchProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profile")
    .select("id, full_name, email")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching profile:", error);
  }

  return data;
};

/* groups */
export const createGroup = async ({ values, userID }) => {
  const supabase = await createClient();
  const code = nanoid(6);

  if (!userID) {
    console.error("No valid userID — skipping insert.");
    return { error: "Missing user ID" };
  }
  const { data, error } = await supabase
    .from("groups")
    .insert([
      {
        name: values.name,
        created_by: userID,
        max_users: values.max_users,
        contribution_type: values.contribution_type,
        disbursement_type: values.disbursement_type,
        amount: values.amount,
        join_code: code,
      },
    ])
    .select(); // only works if SELECT policy is allowed

  return { data, error };
};

export const joinGroup = async ({ code }) => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user?.id) {
    return { status: userError?.message };
  }

  const { data: group, error: groupError } = await supabase
    .from("groups")
    .select("*")
    .eq("join_code", code);
  if (groupError || !group || group.length === 0) {
    return { status: groupError?.message };
  }

  const groupId = group[0].id;
  const userName = userData.user.user_metadata?.name || "Unknown User";

  const { error: insertError } = await supabase.from("members").insert({
    user_id: userData.user.id,
    group_id: groupId,
    name: userName,
  });

  if (insertError) {
    return { status: insertError?.message };
  }
  return { status: "success" };
};
