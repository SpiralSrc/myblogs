"use client";

import { Heart, Home, LayoutDashboard, X } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/logo2.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavs, socialsData } from "@/lib/linksData";
import UserButtonMenu from "../users/UserButtonMenu";

const DashboardNavModal = ({ setNavModal, userId }: any) => {
  const path = usePathname();

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
        className="w-56 xxs:w-64 xs:w-72 h-full left-0 top-0 flex flex-col justify-between items-center slideFromLeft gr text-primary/50 font-semibold py-8 md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[98%] h-full mx-auto flex flex-col justify-between items-center px-5 xl:px-2">
          <div className="w-full h-full flex flex-col gap-6">
            {/* ----- Logo ----- */}
            <Link
              href={"/dashboard"}
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
              <span className="hidden sm:block font-sacramento font-bold text-md md:text-lg bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
                SpiralSrc Admin
              </span>
            </Link>

            {/* ----- User and Potfolio link ----- */}

            <div className="w-full flex flex-col gap-2 justify-center items-center">
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

            <div className="w-full h-full flex flex-col justify-around items-center gap-10">
              {/* ----- Navs ----- */}
              <ul className="w-[85%] flex flex-col justify-center items-center gap-2 md:gap-5 text-sm md:text-base">
                <Link
                  href={"/dashboard"}
                  className={`w-full flex justify-start pl-3 gap-2 items-center py-1 xxs:py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
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
                      className={`w-full flex justify-start pl-3 gap-2 items-center py-1 xxs:py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
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
                  className={`w-full flex justify-start pl-3 gap-2 items-center py-1 xxs:py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
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
                    className={`w-full flex justify-start pl-3 gap-2 items-center py-1 xxs:py-2 rounded-xl smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20 ${
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
        </div>
      </div>
    </div>
  );
};
export default DashboardNavModal;
