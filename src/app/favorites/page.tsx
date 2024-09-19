import Hero from "@/components/mainpage/Hero";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function FavoritesPage() {
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
          post: true,
        },
      },
    },
  });

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Hero />
      <div className="wrapper">
        <h1>Liked Posts</h1>
        <div className="line"></div>
        <div className="w-full mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 gap-10">
          {likedPosts?.map((post) => (
            <div key={post.id}>
              {currentUser?.likes.length > 0 &&
              post.likes.map(
                (like) => like.user.clerkId === userId
              ) ? (
                post.likes.map((like) => (
                  <div key={like.id}>
                    {like.user.clerkId === userId ? (
                      <div className="flex flex-col rounded-lg p-3 border border-secondary/20 gr">
                        <Link
                          href={`/blogs/${like.post.slug}`}
                          className="card2 px-5 py-6"
                        >
                          {/* {like.user.clerkId === userId ? ( */}
                          <h3 className="font-bold text-center text-lg">
                            {like.post.title}
                          </h3>
                          {/* ) : null} */}
                        </Link>
                        <div className="flex justify-center items-center gap-4 mt-3">
                          {like.post.tags.map((tag) => (
                            <Link
                              href={`/tags/${tag.name}`}
                              key={tag.id}
                              className="tag"
                            >
                              #{tag.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-center">No liked posts.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
