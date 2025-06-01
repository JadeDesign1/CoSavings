
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: authUser } = await supabase.auth.getUser();
  const userId = authUser?.user?.id;

  // Get profile name
  const { data: user } = await supabase
    .from("profile")
    .select("full_name, id")
    .eq("id", userId);
  const name = user?.[0]?.full_name || authUser?.user?.user_metadata?.full_name;
  
//   // Get groups the user created
const { data: createdGroups = [], error: groupsError } = await supabase
  .from("groups")
  .select("*")
  .eq("created_by", userId);  

//   // Get membership info (group_id the user is a member of)
  const { data: membershipInfo = [] } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", userId);

  const joinedGroupIds = membershipInfo?.map((member) => member.group_id);

//   // Get groups user has joined
  const { data: joinedGroups = [] } = await supabase
    .from("groups")
    .select("*")
    .in("id", joinedGroupIds);    





  return (
    <div className="max-w-6xl mx-auto px-4 py-4 pb-8 space-y-6">
      <h2 className="md:text-2xl text-lg mt-4 font-bold text-[var(--text-light)]">
        Welcome back, <span className="capitalize">{name || "User"}</span> <span className=" animate-pulse">👋</span>
      </h2>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-xl shadow-md">
          <h4 className="font-semibold text-lg">Create a Group</h4>
          <p className="text-sm mt-2">Start saving with friends today.</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-5 rounded-xl shadow-md">
          <h4 className="font-semibold text-lg">Join a Group</h4>
          <p className="text-sm mt-2">Track your contributions easily.</p>
        </div>
      </div>

      {/* Group Status */}
        {createdGroups.length > 0 || joinedGroups.length > 0 ? <div className="bg-white/10 p-6 rounded-lg shadow border border-gray-500">
          <h3 className="text-lg font-semibold text-[var(--white)] mb-2">
            Your Group Status
          </h3>
          {createdGroups?.length > 0 ?
          <div className="flex flex-row gap-4">
            <p className="text-sm text-[var(--white)]">
              You have created {createdGroups.length} group{createdGroups.length > 1 ? 's' : ''}.
            </p>
             
            <Link href="/home/group" className="text-blue-400 hover:underline">
              view
            </Link>.
          </div>
          :  <div className="flex flex-row gap-4">
             <p className="text-sm text-[var(--white)] mb-4">
            You haven’t created any groups yet. Start your savings journey!
          </p>
          <Link
              href="/home/create-group"
              className="text-blue-400 hover:underline">
              Create a Group
            </Link>
            </div>}

          {joinedGroups?.length > 0 ?  <div className="flex flex-row gap-4">
            <p className="text-sm text-[var(--white)]">
              You have joined {joinedGroups.length} group{joinedGroups.length > 1 ? 's' : ''}.
            </p>
       
            <Link href="/home/group" className="text-blue-400 hover:underline">
              view
            </Link>.
        </div>
          :  <div className="flex flex-row gap-4">
             <p className="text-sm text-[var(--white)] mb-4">
            You haven’t joined any groups yet. Start your savings journey!
          </p>
          <Link
              href="/home/join-group"
              className="text-blue-400 hover:underline">
              Join a Group
            </Link>
            </div>}
         

        </div> : 
      
        <div className="bg-white/10 p-6 rounded-lg shadow border border-gray-500">
          <h3 className="text-lg font-semibold text-[var(--white)] mb-2">
            Get Started
          </h3>
          <p className="text-sm text-[var(--white)] mb-4">
            You haven’t created or joined any groups yet. Start your savings journey!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/create-group"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg text-center font-semibold hover:from-blue-600 hover:to-indigo-600 transition duration-200"
            >
              Create a Group
            </Link>
            <Link
              href="/join-group"
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-3 rounded-lg text-center font-semibold hover:from-green-500 hover:to-emerald-600 transition duration-200"
            >
              Join a Group
            </Link>
          </div>
        </div>}
     
    </div>
  );
}