import Sidebar from "@/component/sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen pt-8 bg-[var(--black-warm)] text-gray-900">
      <Sidebar />
      <div className="p-6  min-h-screen  overflow-y-scroll w-full">
        {children}
      </div>
    </div>
  );
};

export default layout;
