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
      {/* Sidebar */}
      <div className="md:w-56 w-fit hidden pt-12 sm:block h-screen z-30 transition-all duration-200 bg-[#33353685]  p-4">
        <ul className="mt-4 md:text-xl text-3xl">
          {navList.map((link, index) => {
            return (
              <li className="mb-4" key={index}>
                <Link
                  href={link.linkTo}
                  className={` duration-200 rounded p-2   items-center ${
                    pathname === link.linkTo
                      ? "text-[var(--primary)] bg-[var(--text-light)]"
                      : "text-[var(--text-light)] hover:bg-[#6a8aa5a1]"
                  } flex  font-semibold flex-row gap-4`}
                >
                  {link.icon}
                  <span className="hidden md:block">{link.title}</span>
                </Link>
              </li>
            );
          })}

          <li>
            <button
              className="md:w-full w-fit py-2 mt-40 px-2 flex flex-row gap-4 justify-center ring-2 ring-red-300 group duration-200 hover:ring-red-400 items-center bg-red-600 text-white rounded text-lg  hover:bg-red-500"
              onClick={logoutHandler}
            >
              <RiLogoutBoxLine className=" group-hover:scale-110 duration-200 text-2xl" />
              <span className="hidden md:block "> Logout</span>{" "}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
