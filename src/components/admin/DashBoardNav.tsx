"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo2.png";
import { dashboardNavs, socialsData } from "@/lib/linksData";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import UserButtonMenu from "../users/UserButtonMenu";
import { useState } from "react";
import { Heart, Home, LayoutDashboard, Menu } from "lucide-react";
import DashboardNavModal from "./DashboardNavModal";

const DashBoardNav = () => {
  const [navModal, setNavModal] = useState(false);
  const path = usePathname();

  const { userId } = useAuth();

  return (
    <nav className="w-screen lg:w-72 xl:w-80 fixed lg:static top-0 left-0 z-30 py-3 bg-pink-950/20 lg:h-full flex lg:flex-col lg:py-20 lg:gr lg:backdrop-blur-md shadow-xl">
      <div className="w-full lg:h-full mx-auto flex lg:flex-col justify-between items-center px-5 xl:px-2">
        <div className="w-full h-full flex lg:flex-col gap-10">
          {/* ----- Logo ----- */}
          <Link
            href={"/dashboard"}
            className=" flex flex-row gap-2 justify-center items-center"
          >
            <div className="relative w-6 h-6 md:w-7 md:h-7">
              <Image
                src={logo}
                alt="logo"
                fill
                sizes="(max-width: 36px) 100vw, (max-width: 36px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="hidden lg:block font-sacramento font-bold text-md md:text-lg bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
              SpiralSrc Admin
            </span>
          </Link>

          {/* ----- User and Potfolio link ----- */}

          <div className="hidden lg:flex flex-col gap-2 justify-center items-center">
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
          <div className="hidden lg:flex">
            <div className="line "></div>
          </div>

          {/* ----- Navs ----- */}
          <div className="hidden lg:h-full lg:flex flex-col justify-around items-center gap-20">
            <ul className="w-[85%] flex flex-col justify-center items-center gap-5">
              <Link
                href={"/dashboard"}
                className={`w-full flex justify-start pl-3 gap-2 items-center py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
                  path === "/dashboard"
                    ? "text-pink-400/60 bg-pink-300/20"
                    : "text-primary/30"
                }`}
              >
                <LayoutDashboard size={23} />
                <span>DASHBOARD</span>
              </Link>
              <div className="w-[88%] flex place-self-end flex-col gap-1 justify-start items-center">
                {dashboardNavs.map((nav) => (
                  <Link
                    key={nav.name}
                    href={nav.path}
                    className={`w-full flex justify-start pl-2 gap-2 items-center py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
                      nav.path === path
                        ? "text-pink-400/60 bg-pink-300/20"
                        : "text-primary/30"
                    }`}
                  >
                    <li className="flex justify-center items-center gap-2">
                      <nav.icon size={20} /> {nav.name}
                    </li>
                  </Link>
                ))}
              </div>

              <Link
                href={"/"}
                className={`w-full flex justify-start pl-2 gap-2 items-center py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
                  path === "/"
                    ? "text-pink-400/60"
                    : "text-primary/30"
                }`}
              >
                <Home size={23} />
                Client Page
              </Link>
              {userId && (
                <Link
                  href={"/favorites"}
                  className={`w-full flex justify-start pl-2 gap-2 items-center py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
                    path === "/favorites"
                      ? "text-pink-400/60"
                      : "text-primary/30"
                  }`}
                >
                  <Heart size={23} />
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

        {!navModal && (
          <div className="flex">
            <Menu
              size={28}
              onClick={() => setNavModal(true)}
              className="flex lg:hidden rounded-full p-1 smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 justify-center items-center cursor-pointer"
            />
          </div>
        )}

        {navModal && (
          <DashboardNavModal
            setNavModal={setNavModal}
            userId={userId}
          />
        )}
      </div>
    </nav>
  );
};
export default DashBoardNav;
