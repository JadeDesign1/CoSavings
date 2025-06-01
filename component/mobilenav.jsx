import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiMiniUserGroup, HiMiniXMark } from "react-icons/hi2";
import Link from "next/link";
import { ImProfile } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";

export const navList = [
  { title: "Home", linkTo: "/home", icon: <IoIosHome /> },
  { title: "My Group", linkTo: "/home/group", icon: <HiMiniUserGroup /> },
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
        <section className="fixed sm:hidden duration-300 z-40 pt-8 rounded-b-2xl bg-[var(--black-soft)] shadow-lg top-[55px] left-0 right-0 h-fit">
          <nav className="flex pb-4 flex-col gap-2 pt-4">
            {isAuthenticated &&
              navList.map((li, i) => {
                return (
                  <Link
                    href={li.linkTo}
                    onClick={toggleNav}
                    className=" font-semibold hover:bg-[var(--text-light)] hover:pl-6 duration-300 text-[var(--text-light)] px-4 py-2 capitalize list-none text-base cursor-pointer flex flex-row gap-6 group items-center"
                    key={i}
                  >
                    <div className="flex flex-row items-center gap-4 group-hover:text-[var(--primary)]">
                      <span>{li.title}</span>
                      <span className="text-lg">{li.icon}</span>
                    </div>
                  </Link>
                );
              })}

            <div className="sm:hidden pt-4 flex justify-center">
              {isAuthenticated && (
                <div className="flex gap-2">
                  <Link href={"/home/create-group"} className="hover_btn_style">
                    + Create Group
                  </Link>
                  <Link href={"/home/join-group"} className="btn_style ">
                    Join Group
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
