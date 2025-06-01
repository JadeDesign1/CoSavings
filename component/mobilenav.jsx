import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiMiniUserGroup, HiMiniXMark } from "react-icons/hi2";
import Link from "next/link";
import { ImProfile } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";
import { usePathname } from "next/navigation";

export const navList = [
  { title: "Home", linkTo: "/home", icon: <IoIosHome /> },
  { title: "My Group", linkTo: "/home/group", icon: <HiMiniUserGroup /> },
  { title: "Profile", linkTo: "/home/profile", icon: <ImProfile /> },
  { title: "Setting", linkTo: "/home/setting", icon: <CiSettings /> },
];

const Mobilenav = ({
  isAuthenticated,
  openMobileNav,
  toggleNav
}) => {
   const pathname = usePathname();
  return (
    <div>
      <p onClick={toggleNav} className="sm:hidden text-[var(--white)] text-3xl">
        {openMobileNav ? <HiMiniXMark /> : <HiOutlineMenuAlt2 />}
      </p>
      {/* mobile Nav */}
      {openMobileNav && (
        <section className="fixed sm:hidden duration-300 z-40 pt-8 rounded-b-2xl bg-[var(--black-soft)] shadow-lg top-[55px] left-0 right-0 h-fit">
          <nav className="flex pb-4 flex-col  pt-4">
            {isAuthenticated &&
              navList.map((li, i) => {
                return (
                  <Link
                    href={li.linkTo}
                    onClick={toggleNav}
                    key={i}
                    className={`duration-200 p-2 items-center ${
                  pathname === li.linkTo
                    ? "text-[var(--white)] bg-neutral-800/40 "
                    : "text-[var(--white)] hover:bg-[#6a8aa5a1]/20"
                } flex font-semibold flex-row gap-4`}
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
                  <Link onClick={toggleNav} href={"/home/create-group"} className="hover_btn_style">
                    + Create Group
                  </Link>
                  <Link onClick={toggleNav} href={"/home/join-group"} className="btn_style ">
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
