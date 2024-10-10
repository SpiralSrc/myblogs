import BlogList from "@/components/BlogList";
import NewPost from "@/components/client/posts/NewPost";
import RecentPosts from "@/components/client/posts/RecentPosts";
import Hero from "@/components/shared/Hero";
import PostSkeleton from "@/components/reusable_ui/PostSkeleton";
import RightSideBar from "@/components/shared/RightSideBar";
import { prisma } from "@/lib/prismadb";
import { Suspense } from "react";
import RecentPostsSkeleton from "@/components/reusable_ui/RecentPostsSkeleton";

export default async function ClientHome({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  const newPost = await prisma.post.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      tags: true,
    },
  });

  return (
    <>
      <Hero />
      {query && (
        <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}
      <div className="wrapper">
        <div className="w-full h-full flex flex-col lg:flex-row gap-5">
          {newPost.length !== 0 ? (
            <div className="w-[95%] lg:w-[75%] mx-auto flex flex-col gap-3">
              {/* New Post */}
              <h3 className="text-left text-xl md:text-2xl font-bold mb-3">
                New Post
              </h3>
              <Suspense fallback={<PostSkeleton />}>
                {newPost && <NewPost post={newPost[0]} />}
              </Suspense>
              {/* Recent Posts */}
              <div>
                <h3 className="text-left font-bold text-lg md:text-xl mt-10">
                  Recent Posts
                </h3>
                {newPost.slice(1, 7).length !== 0 ? (
                  <div className="w-[94%] xxs:w-[85%] md:w-full mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 gap-7">
                    <Suspense fallback={<RecentPostsSkeleton />}>
                      {newPost &&
                        newPost
                          .slice(1, 7)
                          .map((post) => (
                            <RecentPosts post={post} key={post.id} />
                          ))}
                    </Suspense>
                  </div>
                ) : (
                  <div className="w-full mt-10 flex justify-center">
                    <p className="text-center font-medium">
                      There are no recent posts published.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full mt-10 flex justify-center">
              <p className="text-center font-medium">
                There are no posts being published yet.
              </p>
            </div>
          )}

          {/* Right Bar */}
          <div className="w-full lg:w-[25%]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
