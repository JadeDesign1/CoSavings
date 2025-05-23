import { getCurrentUser } from "@/actions/page";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: authUser } = await supabase.auth.getUser();
  const { data: user, error } = await supabase
    .from("profile")
    .select("full_name, id")
    .eq("id", authUser?.user?.id);
  const name = user[0].full_name;

  const { data: createdGroups } = await supabase
    .from("groups")
    .select("*")
    .eq("created_by", authUser?.user?.id);

  const { data: joinedGroups } = await supabase
    .from("members")
    .select("*")
    .eq("id", authUser?.user?.id);

  const { data: groupMembers } = await supabase
    .from("members")
    .select("*")
    .eq("group_id", joinedGroups[0].group_id);

  console.log(groupMembers);

  console.log(createdGroups);
  console.log(joinedGroups);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      <h2 className="md:text-2xl text-lg font-bold text-gray-800">
        Welcome back, {name || user.email || "User"}👋
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-xl shadow-md">
          <h4 className="font-semibold text-lg">Create a Group</h4>
          <p className="text-sm mt-2">Start saving with friends today.</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-5 rounded-xl shadow-md">
          <h4 className="font-semibold text-lg">Join a Group</h4>
          <p className="text-sm mt-2">Track your contributions easily.</p>
        </div>
      </div>
      {createdGroups?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
            Groups You Created
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {createdGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-100"
              >
                <h4 className="text-lg font-semibold text-blue-600">
                  {group.name}
                </h4>
                <p className="text-sm text-gray-600">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {joinedGroups?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
            Groups You've Joined
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-100"
              >
                <h4 className="text-lg space-x-4 font-semibold text-green-600">
                  <span>Group Name:</span>
                  <span>{group.name}</span>
                </h4>
                <h4 className="text-lg space-x-4 font-semibold text-green-600">
                  <span>Members:</span>
                  <span>{joinedGroups.length}</span>
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
