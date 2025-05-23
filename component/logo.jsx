import { getCurrentUser } from "@/actions/page";
import React from "react";

const Logo = () => {
  const user = getCurrentUser();
  return (
    <Link
      href={user ? "/home" : "/"}
      className="relative text-xl font-bold cursor-pointer "
    >
      <span> AJO</span>
      <div className="absolute top-[15px] text-[var(--secondary)]  -right-6">
        NEST
      </div>
    </Link>
  );
};

export default Logo;
