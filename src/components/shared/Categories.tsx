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
          <span className="rounded-md cat">{category.name}</span>
        </Link>
      ))}
    </>
  );
};
export default Categories;
