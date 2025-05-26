"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Mobilenav from "./mobilenav";
import CreateGroupForm from "./form/createGroupForm";
import JoinGroupForm from "./form/joinGroupForm";
import { getCurrentUser, logout } from "@/actions/page";
import { RiLogoutBoxLine } from "react-icons/ri";

export const AppHeader = () => {
  return (
    <nav className="nav_style">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto py-1 px-2">
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
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

  const toggleCreateGroup = () => {
    setShowJoinForm(false);
    setShowCreateForm(!showCreateForm);
  };
  const toggleJoinForm = () => {
    setShowCreateForm(false);
    setShowJoinForm(!showJoinForm);
  };

  const logoutHandler = async () => {
    await logout();
  };
  return (
    <nav className="nav_style">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/home"
          className="relative -mt-4 text-xl font-bold cursor-pointer "
        >
          <span> AJO</span>
          <div className="absolute top-[15px] text-[var(--secondary)]  -right-6">
            NEST
          </div>
        </Link>
        <button
          className="sm:hidden ml-auto mr-8 w-fit py-1 px-2 flex flex-row gap-2 justify-center items-center bg-red-600 text-[var(--white)} ring-2 hover:ring-[var(--black-muted)] ring-black rounded text-2xl  hover:bg-red-500"
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
            toggleCreateGroup={toggleCreateGroup}
            toggleJoinForm={toggleJoinForm}
          />
        </div>

        {/* create and join group overlay */}
        {showCreateForm && (
          <CreateGroupForm toggleModal={() => toggleCreateGroup()} />
        )}
        {showJoinForm && <JoinGroupForm toggleModal={() => toggleJoinForm()} />}
      </div>
    </nav>
  );
};
