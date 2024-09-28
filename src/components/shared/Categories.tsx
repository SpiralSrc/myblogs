import { prisma } from "@/lib/prismadb";
import Link from "next/link";

const Categories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    take: 8,
  });
  return (
    <>
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <span className="rounded-md cat text-sm">
            {category.name}
          </span>
        </Link>
      ))}
    </>
  );
};
export default Categories;
