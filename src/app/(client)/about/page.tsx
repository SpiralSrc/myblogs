import Hero from "@/components/mainpage/Hero";
import { prisma } from "@/lib/prismadb";
import Image from "next/image";

export default async function AboutPage() {
  return (
    <>
      <Hero />
      <div className="wrapper">
        <div className="w-full flex flex-col">
          <h1>SpiralSrc Blogs</h1>
          <div className="line mb-5"></div>

          {/* ----- About Content ------ */}
          <div className="w-full flex gap-5">
            {/* About the website */}
            <div>
              <h3 className="font-medium">About Me</h3>

              <div className="">
                {/* Image */}
                {/* <div className="relative w-10 h-10 rounded-full overflow-hidden ">
                 
                    <Image
                      src={}
                      alt="avatar"
                      sizes="100%"
                      className="object-cover"
                    />
                 
                </div> */}
                <p className="text-pretty text-justify indent-7">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. At accusantium, atque in maiores minus
                  molestias et, repudiandae quos eveniet explicabo,
                  sit perferendis vero reprehenderit! Laudantium, ab
                  consequuntur corporis, voluptatibus atque magni
                  omnis nobis suscipit ratione officiis nam at
                  deleniti rem? Nemo esse a nisi impedit culpa libero?
                  Ab, magni tempore.
                </p>
              </div>
            </div>

            {/* Biography */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
