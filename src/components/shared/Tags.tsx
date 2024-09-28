import { prisma } from "@/lib/prismadb";
import Link from "next/link";

const Tags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    select: {
      name: true,
      posts: true,
    },
    take: 12,
  });
  return (
    <>
      {tags.map((tag) => (
        <div key={tag.name}>
          {tag.posts.length !== 0 && (
            <Link
              href={`/tags/${tag.name}`}
              className="hover:text-blue-300/90 smooth-effect text-sm"
            >
              #{tag.name}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};
export default Tags;
