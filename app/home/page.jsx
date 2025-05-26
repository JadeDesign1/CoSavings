import { createClient } from "@/utils/supabase/server";

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

  // Get groups the user created
  const { data: createdGroups = [] } = await supabase
    .from("groups")
    .select("*")
    .eq("created_by", userId);

  // Get membership info (group_id the user is a member of)
  const { data: membershipInfo = [] } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", userId);

  const joinedGroupIds = membershipInfo.map((member) => member.group_id);

  // Get groups user has joined
  const { data: joinedGroups = [] } = await supabase
    .from("groups")
    .select("*")
    .in("id", joinedGroupIds);

  // Get all member records for created groups
  const createdGroupIds = createdGroups.map((group) => group.id);

  const { data: createdGroupMembers = [] } = createdGroupIds.length
    ? await supabase
        .from("members")
        .select("group_id")
        .in("group_id", createdGroupIds)
    : { data: [] };

  // Count members per created group
  const createdMemberCountByGroupId = createdGroupMembers.reduce(
    (acc, member) => {
      acc[member.group_id] = (acc[member.group_id] || 0) + 1;
      return acc;
    },
    {}
  );

  // Get all member records for joined groups
  const { data: joinedGroupMembers = [] } = joinedGroupIds.length
    ? await supabase
        .from("members")
        .select("group_id")
        .in("group_id", joinedGroupIds)
    : { data: [] };

  // Count members per joined group
  const joinedMemberCountByGroupId = joinedGroupMembers.reduce(
    (acc, member) => {
      acc[member.group_id] = (acc[member.group_id] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 pb-8 space-y-6">
      <h2 className="md:text-2xl text-lg mt-4 font-bold text-[var(--text-light)]">
        Welcome back, {name || "User"} 👋
      </h2>

      {/* Quick actions */}
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

      {/* Groups you created */}
      {createdGroups.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mt-10 mb-4">
            Groups You Created
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {createdGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-100"
              >
                <h4 className="text-lg font-semibold text-blue-600">
                  {group.name}
                </h4>
                <p className="text-sm text-gray-600">
                  Members: {createdMemberCountByGroupId[group.id] || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Groups you joined */}
      {joinedGroups.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mt-10 mb-4">
            Groups You've Joined
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {joinedGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-100"
              >
                <h4 className="text-lg font-semibold text-blue-600">
                  Group Name: {group.name}
                </h4>
                <h4 className="text-sm text-gray-600">
                  Members: {joinedMemberCountByGroupId[group.id] || 0}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
