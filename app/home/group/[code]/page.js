import { ContributionChart } from "@/component/contributionChart";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function GroupDetails({ params }) {
  const { code: groupCode } = params; // Group ID from the dynamic route
  const supabase = await createClient();
  console.log(groupCode);
  
  // Fetch group details
  const { data: groupData, error: groupError } = await supabase
    .from("groups")
    .select("id, name, created_by, max_users, contribution_type, disbursement_type, amount, join_code")
    .eq("join_code", groupCode)
    .single();

  // Fetch members of the group
  const { data: members = [], error: membersError } = await supabase
    .from("members")
    .select("user_id, name")
    .eq("group_id", groupData?.id);

  // Handle errors or missing group
  if (groupError || !groupData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold text-red-600">
          {groupError?.message || "Group not found"}
        </h2>
        <Link href="/home" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 pb-8 space-y-6">
      {/* Back to Dashboard Link */}
      <Link href="/home" className="text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
      
      {/* Group header */}
      <h2 className="text-2xl font-bold text-[var(--white)]">
        {groupData.name}
      </h2>

      {/* Group details card */}
      <div className="bg-white/10 p-6 rounded-lg shadow border border-gray-500">
        <h3 className="text-lg font-semibold text-[var(--white)] mb-4">
          Group Details
        </h3>
        <div className="grid grid-cols-1 text-[var(--white)] sm:grid-cols-2 gap-4">
          <p className="text-sm">
            <strong>Created By:</strong> {groupData.created_by}
          </p>
          <p className="text-sm">
            <strong>Max Members:</strong> {groupData.max_users}
          </p>
          <p className="text-sm">
            <strong>Contribution Type:</strong> {groupData.contribution_type}
          </p>
          <p className="text-sm">
            <strong>Disbursement Type:</strong> {groupData.disbursement_type}
          </p>
          <p className="text-sm">
            <strong>Amount:</strong> ${groupData.amount?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm">
            <strong>Join Code:</strong> {groupData.join_code}
          </p>
        </div>
      </div>

      {/* Members list as a table */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--white)] mb-4">
          Members ({members.length})
        </h3>
        {membersError ? (
          <p className="text-sm text-red-600">
            Error loading members: {membersError.message}
          </p>
        ) : members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/10 border border-gray-500 rounded-lg">
              <thead>
                <tr className="bg-gray-500/20">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--white)] border-b border-gray-500">
                    No.
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--white)] border-b border-gray-500">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={member.user_id} className="border-b border-gray-500">
                    <td className="px-4 py-2 text-sm text-[var(--white)]">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-[var(--white)]">
                      {member.name || "Unknown User"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No members in this group yet.</p>
        )}
      </div>

        </div>
  );
}