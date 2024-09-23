"use client";

import { navLinks, socialsData } from "@/lib/linksData";
import Link from "next/link";
import logo from "../../public/logo2.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const Footer = () => {
  const currentPath = usePathname();

  const { userId } = useAuth();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="backdrop-blur-md text-secondary">
      <div className="max-w-7xl mx-auto py-11 md:py-20 px-4 xl:px-2">
        <div className="w-full flex md:flex-row flex-col gap-10 md:gap-4 md:justify-between items-center mb-7">
          <Link
            href={"/"}
            className="flex flex-row gap-2 justify-center items-center opacity-50"
          >
            <div className="relative w-9 h-9">
              <Image
                src={logo}
                alt="logo"
                fill
                sizes="(max-width: 36px) 100vw, (max-width: 36px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="font-sacramento font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-pink-200 to-orange-900 via-30%">
              SpiralSrc
            </span>
          </Link>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-md">
            {navLinks.map((nav, id) => (
              <Link
                href={nav.path}
                key={id}
                className={`hover:text-pink-400/60 smooth-effect ${
                  nav.path === currentPath
                    ? "text-secondary"
                    : "text-secondary/60"
                }`}
              >
                {nav.name}
              </Link>
            ))}
            {userId && (
              <Link
                href={"/favorites"}
                className={`hover:text-pink-400/60 smooth-effect ${
                  currentPath === "/favorites"
                    ? "text-pink-400/60"
                    : "text-secondary/60"
                }`}
              >
                Favorites
              </Link>
            )}
          </div>
        </div>
        <div className="w-[90%] mx-auto border-t border-secondary/20">
          <p className="mt-5 text-center text-[12px] text-secondary/30">
            SpiralSrc&copy;<span>{currentYear}</span>. All Rights
            Reserved.
          </p>
        </div>
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
    </footer>
  );
};
export default Footer;
