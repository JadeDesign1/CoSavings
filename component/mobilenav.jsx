import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import Link from "next/link";
import { ImProfile } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";

export const navList = [
  { title: "Home", linkTo: "/home", icon: <IoIosHome /> },
  { title: "Profile", linkTo: "/home/profile", icon: <ImProfile /> },
  { title: "Setting", linkTo: "/home/setting", icon: <CiSettings /> },
];

const Mobilenav = ({
  isAuthenticated,
  openMobileNav,
  toggleNav,
  toggleCreateGroup,
  toggleJoinForm,
}) => {
  return (
    <div>
      <p onClick={toggleNav} className="sm:hidden text-3xl">
        {openMobileNav ? <HiMiniXMark /> : <HiOutlineMenuAlt2 />}
      </p>
      {/* mobile Nav */}
      {openMobileNav && (
        <section className="fixed sm:hidden duration-300 z-40 bg-white text-black shadow-lg top-16 left-0 right-0 h-fit">
          <nav className="flex pb-4 flex-col gap-2 pt-4">
            {isAuthenticated &&
              navList.map((li, i) => {
                return (
                  <Link
                    href={li.linkTo}
                    onClick={toggleNav}
                    className=" font-semibold hover:bg-[#cde9da] hover:pl-6 duration-300 text-emerald-900 px-4 py-2 capitalize list-none text-base cursor-pointer flex flex-row gap-6 items-center"
                    key={i}
                  >
                    <span>{li.title}</span>
                    <span>{li.icon}</span>
                  </Link>
                );
              })}

            <div className="sm:hidden flex justify-center">
              {isAuthenticated ? (
                <div className="flex justify-center  space-x-4">
                  <button
                    onClick={() => {
                      toggleCreateGroup(), toggleNav();
                    }}
                  >
                    Create Group
                  </button>

                  <button
                    onClick={() => {
                      toggleJoinForm(), toggleNav();
                    }}
                  >
                    Join Group
                  </button>
                </div>
              ) : (
                <div className="flex flex-row gap-4 text-sm md:text-base">
                  <Link onClick={toggleNav} href={"/login"}>
                    Sign In
                  </Link>
                  <Link onClick={toggleNav} href={"/register"}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </section>
      )}
    </div>
  );
};

export default Mobilenav;
