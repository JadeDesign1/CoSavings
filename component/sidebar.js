"use client";

import React from "react";
import { navList } from "./mobilenav";
import Link from "next/link";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "@/actions/page";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logout();
  };

  return (
    <>
      {/* Fixed Sidebar */}
      <div className="md:w-56 w-fit hidden sm:block h-screen fixed top-0 pt-16 left-0 z-30 transition-all duration-200 bg-[#33353685] p-4">
        <ul className="mt-4 md:text-xl text-2xl">
          {navList.map((link, index) => (
            <li className="mb-4" key={index}>
              <Link
                href={link.linkTo}
                className={`duration-200 rounded p-2 items-center ${
                  pathname === link.linkTo
                    ? "text-[var(--white)] bg-[var(--black-soft)]"
                    : "text-[var(--white)] hover:bg-[#6a8aa5a1]"
                } flex font-semibold flex-row gap-4`}
              >
                {link.icon}
                <span className="hidden md:block">{link.title}</span>
              </Link>
            </li>
          ))}

          <li>
            <button
              className="md:w-full w-fit py-2 mt-20 px-2 flex flex-row gap-4 justify-center ring ring-red-300 group duration-200 hover:ring-red-400 items-center text-white rounded text-lg"
              onClick={logoutHandler}
            >
              <RiLogoutBoxLine className="text-red-700 group-hover:scale-110 duration-200 text-2xl" />
              <span className="hidden md:block">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;