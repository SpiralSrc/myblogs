import BlogList from "@/components/BlogList";
import Hero from "@/components/mainpage/Hero";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const likedPosts = await prisma.post.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      likes: {
        include: {
          post: {
            include: {
              tags: true,
            },
          },
          user: {
            include: {
              likes: true,
            },
          },
        },
      },
    },
  });

  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const currentUser = await prisma.user.findFirst({
    where: { clerkId: userId },
    include: {
      likes: {
        include: {
          post: {
            include: {
              tags: true,
            },
          },
        },
      },
    },
  });

  if (!currentUser) {
    return null;
  }

  const query = searchParams?.query || "";

  const userLikedPosts = likedPosts.filter((post) =>
    post.likes.some((like) => like.user.clerkId === userId)
  );

  return (
    <>
      <Hero />
      {query && (
        <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}
      <div className="wrapper">
        <h1>Liked Posts</h1>
        <div className="line"></div>
        <div className="w-full mx-auto mt-10 flex justify-center items-center flex-wrap px-3 gap-10">
          {userLikedPosts.length > 0 ? (
            userLikedPosts.map((post) => (
              <div key={post.id}>
                <div className="flex flex-col rounded-lg p-3 border border-secondary/20 gr">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="card2 w-64 h-30 xxs:w-80 xxs:h-28 px-5 py-6 flex"
                  >
                    <h3 className="font-bold text-center text-lg">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="flex justify-center items-center gap-4 mt-3">
                    {post.likes.map((like) =>
                      like.post.tags.map((tag) => (
                        <Link
                          href={`/tags/${tag.name}`}
                          key={tag.id}
                          className="tag"
                        >
                          #{tag.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-center">No liked posts.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
