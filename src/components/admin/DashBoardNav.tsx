"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/icon.png";
import { dashboardNavs, socialsData } from "@/lib/linksData";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import UserButtonMenu from "../users/UserButtonMenu";

const DashBoardNav = () => {
  const path = usePathname();

  const { userId } = useAuth();

  return (
    <nav className="w-full h-full flex flex-col py-20 bg-pink-950/20 backdrop-blur-md shadow-xl">
      <div className="w-[98%] h-full mx-auto flex flex-col justify-between items-center px-5 xl:px-2">
        <div className="w-full h-full flex flex-col gap-10">
          {/* ----- Logo ----- */}
          <Link
            href={"/dashboard"}
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
            <span className="hidden sm:block font-sacramento font-bold text-md md:text-lg bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
              SpiralSrc Admin
            </span>
          </Link>

          {/* ----- User and Potfolio link ----- */}

          <div className="flex flex-col gap-2 justify-center items-center">
            {userId && (
              // <UserButton />
              <UserButtonMenu />
            )}
            <a
              href={"https://spiralsrc.dev/"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-2 sm:py-2 sm:px-3 rounded-full font-bold border border-transparent text-[12px] sm:text-sm lg:text-base bg-red-950/20 backdrop-blur-sm hover:text-pink-400/80 hover:border-red-400/20 hover:shadow-lg smooth-effect"
            >
              Portfolio
            </a>
          </div>
          <div className="line"></div>

          <div className="h-full flex flex-col justify-around items-center gap-20">
            {/* ----- Navs ----- */}
            <ul className="flex flex-col justify-center items-center gap-10">
              {dashboardNavs.map((nav) => (
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
              <Link href={"/"}>Client Page</Link>
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

            {/* ----- Socials ----- */}
            <div className="flex flex-row justify-center items-center mt-2">
              {socialsData.map((social, id) => (
                <a
                  key={id}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {
                    <social.icon
                      size={12}
                      className="text-secondary/40 "
                    />
                  }
                </a>
              ))}
            </div>
          </div>

          {/* ----- Socials Icons ----- */}
        </div>
      </div>
    </nav>
  );
};
export default DashBoardNav;
