import Sidebar from "@/component/sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen pt-8 bg-gray-100">
      <Sidebar />
      <div className="p-6 min-h-screen w-full overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default layout;
