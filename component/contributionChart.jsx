// Example snippet for a progress bar chart (requires client-side component)
"use client";
import { useState } from "react";

export function ContributionChart({ members, contributions }) {
  const contributionMap = contributions?.reduce((acc, c) => {
    acc[c.user_id] = (acc[c.user_id] || 0) + 1;
    return acc;
  }, {});

  const cycleLength = members?.length
  return (
    <div className="space-y-4">
      {members.map((member) => {
        const paidCount = contributionMap[member.user_id] || 0;
        const percentage = (paidCount / cycleLength) * 100;
        return (
          <div key={member.user_id} className="flex items-center gap-4">
            <span className="text-sm text-gray-600 w-32">
              {member.name || "Unknown User"}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {paidCount}/{cycleLength}
            </span>
          </div>
        );
      })}
    </div>
  );
}