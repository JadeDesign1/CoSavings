import { createClient } from "@/utils/supabase/server";
import ProfileCard from "./profileCard";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const { data: userProfile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", data.user.id);

  return (
    <div className="min-h-screen bg-[var(--black-warm)] py-12 px-4">
      <ProfileCard userProfile={userProfile[0]} />
    </div>
  );
}
