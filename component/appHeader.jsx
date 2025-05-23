"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Mobilenav from "./mobilenav";
import CreateGroupForm from "./form/createGroupForm";
import JoinGroupForm from "./form/joinGroupForm";
import { getCurrentUser } from "@/actions/page";

export const AppHeader = () => {
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

  return (
    <nav className="p-4 w-full fixed z-50 font-semibold bg-white shadow-lg ">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/"
          className="relative -mt-2 text-xl font-bold cursor-pointer "
        >
          <span> AJO</span>
          <div className="absolute top-[15px] text-[var(--secondary)]  -right-6">
            NEST
          </div>
        </Link>

        <div className="flex flex-row gap-2 items-center">
          <div className="hidden sm:flex">
            <div className="flex flex-row gap-4 text-sm md:text-base">
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/register"}>Sign Up</Link>
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
  return (
    <nav className="p-4 w-full fixed z-50 font-semibold bg-white shadow-lg ">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/home"
          className="relative text-xl font-bold cursor-pointer "
        >
          <span> AJO</span>
          <div className="absolute top-[15px] text-[var(--secondary)]  -right-6">
            NEST
          </div>
        </Link>

        <div className="flex flex-row gap-2 items-center">
          <div className="hidden sm:flex">
            <div className="flex text-sm  justify-center  space-x-4">
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition duration-200"
                  onClick={toggleCreateGroup}
                >
                  + Create Group
                </button>
                <button
                  onClick={toggleJoinForm}
                  className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg shadow-sm transition duration-200"
                >
                  Join Group
                </button>
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
