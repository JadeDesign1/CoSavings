"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Mobilenav from "./mobilenav";
import { getCurrentUser, logout } from "@/actions/page";
import { RiLogoutBoxLine } from "react-icons/ri";

export const AppHeader = () => {
  return (
    <nav className="nav_style">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto px-2">
        <Link
          href="/"
          className="relative -mt-2 text-xl text-[var(--primary)] font-bold cursor-pointer"
        >
          <span>AJO</span>
          <h4 className="absolute top-[15px] text-[var(--primary)] -right-6">
            NEST
          </h4>
        </Link>

        <div className="flex flex-row gap-4 text-sm md:text-base">
          <Link href="/login" className="hover_btn_style">
            Sign In
          </Link>
          <Link href="/register" className="btn_style">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export const HomeHeader = () => {
    const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const findUser = async () => {
      const { status, user } = await getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    findUser();
  }, [isAuthenticated]);

  // Close the mobile menu when window size is larger than lg (1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpenMobileNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const logoutHandler = async () => {
    await logout();
  };
  return (
    <nav className="nav_style">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/home"
          className="relative -mt-4 text-xl text-[var(--primary)] font-bold cursor-pointer "
        >
          <span> AJO</span>
          <div className="absolute top-[15px] text-[var(--primary)]  -right-6">
            NEST
          </div>
        </Link>
        <button
          className="sm:hidden ml-auto mr-6 w-fit py-1 px-2 flex flex-row gap-2 justify-center items-center text-red-500 ring-1 hover:ring-[var(--black-muted)] ring-gray-300 rounded text-2xl"
          onClick={logoutHandler}
        >
          <RiLogoutBoxLine />
        </button>
        <div className="flex flex-row gap-2 items-center">
          <div className="hidden sm:flex">
            <div className="flex text-sm  justify-center  space-x-4">
              <div className="flex gap-2">
                <Link href={"/home/create-group"} className="hover_btn_style">
                  + Create Group
                </Link>
                <Link href={"/home/join-group"} className="btn_style ">
                  Join Group
                </Link>
              </div>
            </div>
          </div>

          <Mobilenav
            isAuthenticated={isAuthenticated}
            openMobileNav={openMobileNav}
            toggleNav={toggleNav}
          />
        </div>

       
      </div>
    </nav>
  );
};
