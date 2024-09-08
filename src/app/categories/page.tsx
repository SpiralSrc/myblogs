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
    <div>
      <div className="wrapper">
        <h1 className="mt-10">All Categories Page</h1>
        <div className="w-full mt-10 flex justify-center items-center gap-5">
          {categories.length !== 0 ? (
            categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.id}
                className="w-96 flex flex-col rounded-lg overflow-hidden bg-section-gradient2"
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
            <div>
              <p>There are no categories added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
