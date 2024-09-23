import BlogList from "@/components/BlogList";
import Hero from "@/components/mainpage/Hero";
import { prisma } from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const query = searchParams?.query || "";

  return (
    <>
      <Hero />
      {query && (
        <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}
      <div className="wrapper">
        <h1>All Categories</h1>
        <div className="line mb-5"></div>
        <div className="w-full mx-auto mt-10 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 justify-center items-center gap-10">
          {categories.length !== 0 ? (
            categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.id}
                className="card group relative"
              >
                <div className="w-full h-full gr-overlay absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:zoom-in"></div>
                <div className="w-full h-44 lg:h-52 relative">
                  <Image
                    src={category.imageUrl}
                    fill
                    sizes="100%"
                    alt={category.name}
                    className="object-cover"
                  />
                  <div className="img-overlay"></div>
                </div>
                <div className="mt-5 mb-3">
                  <h3 className="font-bold text-lg text-center">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full mt-10 flex justify-center">
              <p className="text-center font-medium">
                There are no categories added.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
