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
      posts: {
        where: {
          isPublished: true,
        },
      },
    },
    take: 12,
  });

  // Filter tags to only include those with at least one published post
  const tagsWithPublishedPosts = tags.filter(
    (tag) => tag.posts.length > 0
  );

  return (
    <>
      {tagsWithPublishedPosts.map((tag) => (
        <div key={tag.name}>
          <Link
            href={`/tags/${tag.name}`}
            className="hover:text-blue-300/90 smooth-effect text-sm"
          >
            #{tag.name}
          </Link>
        </div>
      ))}
    </>
  );
};
export default Tags;
