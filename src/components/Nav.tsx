"use client";

import { navLinks } from "@/lib/linksData";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Logo from "../../public/logo2.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import UserButtonMenu from "./users/UserButtonMenu";
import { Menu } from "lucide-react";
import { useState } from "react";
import NavModal from "./NavModal";

const Nav = () => {
  const [navModal, setNavModal] = useState(false);
  const path = usePathname();

  const { userId } = useAuth();

  return (
    <nav
      className={`w-screen fixed top-0 left-0 z-30 py-3 bg-pink-950/20 shadow-sm ${
        !navModal ? "backdrop-blur-md" : null
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 xl:px-2">
        {/* Logo */}
        <Link
          href={"/"}
          className=" flex flex-row gap-2 justify-center items-center"
        >
          <div className="relative w-6 h-6 md:w-7 md:h-7">
            <Image
              src={Logo}
              alt="logo"
              fill
              sizes="(max-width: 36px) 100vw, (max-width: 36px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <span className="hidden sm:block font-sacramento font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
            SpiralSrc
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex justify-between items-center gap-10">
          <div className="w-72 hidden lg:flex">
            <SearchBar />
          </div>

          <ul className="hidden md:flex justify-center items-center gap-5">
            {navLinks.map((nav) => (
              <Link
                key={nav.name}
                href={nav.path}
                className={`hover:text-pink-400/60 smooth-effect ${
                  nav.path === path
                    ? "text-pink-400/60"
                    : "text-white/80"
                }`}
              >
                <li>{nav.name}</li>
              </Link>
            ))}
            {userId && (
              <Link
                href={"/favorites"}
                className={`hover:text-pink-400/60 smooth-effect ${
                  path === "/favorites"
                    ? "text-pink-400/60"
                    : "text-white/80"
                }`}
              >
                Favorites
              </Link>
            )}
          </ul>
        </div>

        {/* Potfolio & User buton */}
        <div className="hidden md:flex gap-2 justify-center items-center">
          <a
            href={"https://spiralsrc.dev/"}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 px-2 sm:py-2 sm:px-3 rounded-full font-bold border border-transparent text-[12px] sm:text-sm lg:text-base bg-red-950/20 backdrop-blur-sm hover:text-pink-400/80 hover:border-red-400/20 hover:shadow-lg smooth-effect"
          >
            Portfolio
          </a>
          {userId ? (
            // <UserButton />
            <UserButtonMenu />
          ) : (
            <Link
              href={"/sign-in"}
              className="font-medium text-[12px] sm:text-sm lg:text-base"
            >
              Login
            </Link>
          )}
        </div>

        {/* Menu Button */}
        {!navModal && (
          <div className="flex md:hidden">
            <Menu
              size={28}
              onClick={() => setNavModal(true)}
              className="flex md:hidden rounded-full p-1 smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 justify-center items-center cursor-pointer"
            />
          </div>
        )}

        {navModal && (
          <NavModal setNavModal={setNavModal} userId={userId} />
        )}
      </div>
    </nav>
  );
};
export default Nav;
