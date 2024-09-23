"use client";

import { Heart, X } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/logo2.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, socialsData } from "@/lib/linksData";
import UserButtonMenu from "./users/UserButtonMenu";

const NavModal = ({ setNavModal, userId }: any) => {
  const currentPath = usePathname();

  return (
    <div
      className="fixed w-screen h-screen z-40 top-0 left-0 bg-black/50 backdrop-blur-md"
      onClick={() => setNavModal(false)}
    >
      <X
        size={35}
        className="absolute top-10 right-10 p-2 rounded-3xl hover:bg-pink-400/5 hover:text-pink-400/70 smooth-effect"
        onClick={() => setNavModal(false)}
      />

      {/* nav */}
      <div
        className="w-56 xxs:w-72 xs:w-80 h-full left-0 top-0 flex flex-col justify-between items-center slideFromLeft gr text-primary/50 font-semibold py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col justify-center items-center gap-10">
          {/* Logo */}
          <Link
            href={"/"}
            onClick={() => setNavModal(false)}
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
            <span className="font-sacramento font-bold text-lg xl:text-xl bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
              SpiralSrc
            </span>
          </Link>

          {/* user & portfolio */}
          <div className="flex flex-col-reverse gap-2 justify-center items-center">
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
          <div className="line"></div>
        </div>

        {/* Nav links */}
        <div className="w-full h-full flex flex-col justify-around items-center gap-20">
          <ul className="w-[85%] mx-auto flex flex-col justify-start items-center gap-3">
            {navLinks &&
              navLinks.map((nav, id) => (
                <Link
                  key={id}
                  onClick={() => setNavModal(false)}
                  href={nav.path}
                  className={`w-full flex pl-5 py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
                    nav.path === currentPath
                      ? "text-pink-400/60 bg-pink-300/20"
                      : "text-primary/30"
                  }`}
                >
                  <li className="flex justify-center items-center gap-2">
                    <nav.icon size={20} />
                    {nav.name}
                  </li>
                </Link>
              ))}
            {userId && (
              <Link
                href={"/favorites"}
                onClick={() => setNavModal(false)}
                className={`w-full flex pl-5 py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
                  currentPath === "/favorites"
                    ? "text-pink-400/60 bg-pink-300/20"
                    : "text-primary/30"
                }`}
              >
                <li className="flex justify-center items-center gap-2">
                  <Heart size={20} />
                  Favorites
                </li>
              </Link>
            )}
          </ul>

          {/* Socials */}
          <div className="flex flex-row">
            {socialsData.map((social, id) => (
              <a
                key={id}
                href={social.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  <social.icon
                    size={13}
                    className="hover:text-pink-400/60 smooth-effect"
                  />
                }
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavModal;
