import BlogList from "@/components/BlogList";
import Hero from "@/components/shared/Hero";
import { prisma } from "@/lib/prismadb";
import { truncateDesc, truncateTitle2 } from "@/lib/utils/truncate";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
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

  const userLikedPosts = currentUser.likes.map((like) => like.post);

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
        <div className="w-full mx-auto mt-10 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 justify-center items-center gap-10">
          {userLikedPosts.length > 0 ? (
            userLikedPosts.map((post) => (
              <div key={post.id}>
                <div className="flex flex-col rounded-lg p-3 gr">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="card2 py-3 min-h-36"
                  >
                    <h3 className="font-bold text-center text-lg">
                      {truncateTitle2(post.title)}
                    </h3>
                    <div className="line mb-3"></div>
                    <div className="w-[94%] mx-auto flex px-5 justify-center items-center">
                      <p className=" flex text-justify text-pretty indent-7 text-sm">
                        {truncateDesc(post.desc)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-wrap justify-center items-center gap-2 xs:gap-4 mt-3">
                    {post.tags.map((tag) => (
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
