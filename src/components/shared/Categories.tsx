import { prisma } from "@/lib/prismadb";
import Link from "next/link";

const Categories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <span className="py-1 px-2 rounded-md bg-stone-400 backdrop-blur-md overflow-hidden">
            {category.name}
          </span>
        </Link>
      ))}
    </>
  );
};
export default Categories;
