import { prisma } from "@/lib/prismadb";
import Link from "next/link";

const Tags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      {tags.map((tag: any) => (
        <Link
          key={tag.id}
          href={`/tags/${tag.name}`}
          className="hover:text-blue-300/90 smooth-effect"
        >
          #{tag.name}
        </Link>
      ))}
    </>
  );
};
export default Tags;
