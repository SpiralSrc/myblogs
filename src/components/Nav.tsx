"use client";

import { navLinks } from "@/lib/linksData";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Logo from "../app/icon.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Nav = () => {
  const path = usePathname();

  return (
    <nav className="w-screen fixed top-0 left-0 z-30 py-3 bg-slate-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 xl:px-2">
        <Link
          href={"/"}
          className="flex flex-row gap-2 justify-center items-center"
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
          <span className="hidden sm:block font-sacramento font-bold text-md md:text-2xl bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
            SpiralSrc
          </span>
        </Link>
        <div className="flex justify-between items-center gap-20">
          {path === "/" ? (
            <div className="w-72 hidden lg:flex">
              <SearchBar />
            </div>
          ) : null}

          <ul className="flex justify-center items-center gap-10">
            {navLinks.map((nav) => (
              <Link
                key={nav.name}
                href={nav.path}
                className="smooth-effect hover:text-pink-400"
              >
                <li>{nav.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
