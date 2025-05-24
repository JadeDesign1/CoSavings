"use client";
import React from "react";
import { navList } from "./mobilenav";
import Link from "next/link";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "@/actions/page";

const Sidebar = () => {
  const logoutHandler = async () => {
    await logout();
  };
  return (
    <>
      {/* Sidebar */}
      <div className="md:w-56 w-fit hidden pt-12 sm:block h-screen transition-all duration-200 bg-inherit border-r-2 border-neutral-300 text-emerald-900 p-4">
        <ul className="mt-4 md:text-xl text-3xl">
          {navList.map((link, index) => {
            return (
              <li className="mb-4" key={index}>
                <Link
                  href={link.linkTo}
                  className="hover:text-emerald-700 items-center flex  font-semibold flex-row gap-4"
                >
                  {link.icon}
                  <span className="hidden md:block">{link.title}</span>
                </Link>
              </li>
            );
          })}

          <li>
            <button
              className="md:w-full w-fit py-2 mt-40 px-2 flex flex-row gap-4 justify-center items-center bg-red-600 text-white rounded text-lg  hover:bg-red-500"
              onClick={logoutHandler}
            >
              <RiLogoutBoxLine />
              <span className="hidden md:block "> Logout</span>{" "}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
