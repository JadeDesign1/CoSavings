import Sidebar from "@/component/sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-[100vw] bg-[var(--black-warm)] text-gray-900">
      <Sidebar />
      <div className="sm:pl-[60px] md:pl-56 w-full min-h-screen overflow-y-auto">
        <div className="px-6 pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;