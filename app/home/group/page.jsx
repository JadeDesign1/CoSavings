import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import React from 'react'

const page = async() => {
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
    
      console.log(createdGroups);
      
    
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
    
    //   // Get all member records for created groups
      const createdGroupIds = createdGroups?.map((group) => group.id);
      const { data: createdGroupMembers = [] } = createdGroupIds?.length
        ? await supabase
            .from("members")
            .select("group_id")
            .in("group_id", createdGroupIds)
        : { data: [] };
    
    //   // Count members per created group
      const createdMemberCountByGroupId = createdGroupMembers?.reduce(
        (acc, member) => {
          acc[member.group_id] = (acc[member.group_id] || 0) + 1;
          return acc;
        },
        {}
      );
    
    //   // Get all member records for joined groups
      const { data: joinedGroupMembers = [] } = joinedGroupIds?.length
        ? await supabase
            .from("members")
            .select("group_id")
            .in("group_id", joinedGroupIds)
        : { data: [] };
    
    //   // Count members per joined group
      const joinedMemberCountByGroupId = joinedGroupMembers?.reduce(
        (acc, member) => {
          acc[member.group_id] = (acc[member.group_id] || 0) + 1;
          return acc;
        },
        {}
      );
  return (
    <div>      {/* Groups you created */}
      {createdGroups?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mt-10 mb-4">
            Groups You Created
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {createdGroups.map((group) => (
              <Link
                href={`/home/group/${group.join_code}`}
                key={group.join_code}
                className=" p-4 rounded-lg shadow shadow-gray-400 hover:shadow-gray-500 duration-200 transition"
              >
                <h4 className="text-lg font-semibold text-blue-600">
                  {group.name}
                </h4>
                <p className="text-sm text-gray-200">
                  Members: {createdMemberCountByGroupId[group.id] || 0}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Groups you joined */}
      {joinedGroups?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mt-10 mb-4">
            Groups You've Joined
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {joinedGroups.map((group) => (
              <Link
                href={`/home/group/${group.join_code}`}
                key={group.join_code}
                className=" p-4 rounded-lg shadow shadow-gray-400 hover:shadow-gray-500 duration-200 transition"
             >
                <h4 className="text-lg font-semibold text-emerald-400">
                  Group Name: {group.name}
                </h4>
                <h4 className="text-sm text-gray-200">
                  Members: {joinedMemberCountByGroupId[group.id] || 0}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}</div>
  )
}

export default page