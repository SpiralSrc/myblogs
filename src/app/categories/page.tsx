import Hero from "@/components/home/Hero";
import { prisma } from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <Hero />
      <div className="wrapper">
        <h1>All Categories</h1>
        <div className="w-full mt-10 flex flex-wrap justify-center items-center gap-10">
          {categories.length !== 0 ? (
            categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.id}
                className="card"
              >
                <div className="w-full h-52 relative">
                  <Image
                    src={category.imageUrl}
                    fill
                    sizes="100%"
                    alt={category.name}
                    className="object-cover"
                  />
                </div>
                <div className="mt-5">
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
