import BlogList from "@/components/BlogList";
import Hero from "@/components/shared/Hero";
import RightSideBar from "@/components/shared/RightSideBar";
import { prisma } from "@/lib/prismadb";
import { truncate } from "@/lib/utils/truncate";
import Link from "next/link";

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
          <div className="w-[95%] lg:w-[75%] mx-auto flex flex-col gap-3">
            <h3 className="text-left text-xl md:text-2xl font-bold mb-3">
              New Post
            </h3>
            {newPost && newPost[0] && (
              <Link
                href={`/blogs/${newPost[0].slug}`}
                className="w-full card py-5 px-2 group relative"
              >
                <div className="w-full h-full gr-overlay absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:zoom-in"></div>
                <h2>{newPost[0].title}</h2>
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="mt-3">
                    <span className="cat2">
                      {newPost[0].category.name}
                    </span>
                  </div>
                  <div className="flex gap-5">
                    {newPost[0].tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-sm text-secondary/90"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-10 indent-8 lg:w-[85%] mx-auto">
                  <p>{truncate(newPost[0].desc)}</p>
                </div>
              </Link>
            )}
            <div>
              <h3 className="text-left font-bold text-lg md:text-xl mt-10">
                Recent Posts
              </h3>
              <div className="w-[94%] xxs:w-[85%] md:w-full mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 gap-7">
                {newPost &&
                  newPost.slice(1, 7).map((post) => (
                    <Link
                      href={`/blogs/${post.slug}`}
                      key={post.id}
                      className="card p-5 group relative"
                    >
                      <div className="w-full h-full gr-overlay absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:zoom-in"></div>
                      <h3 className="text-center font-bold text-lg">
                        {post.title}
                      </h3>
                      <div className="flex flex-col justify-center items-center gap-3">
                        <div>
                          <span className="cat">
                            {post.category.name}
                          </span>
                        </div>
                        <div className="flex gap-5">
                          {post.tags.map((tag) => (
                            <span key={tag.id} className="tag">
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-10 indent-8 text-wrap">
                        <p>{truncate(post.desc)}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          {/* Right Bar */}
          <div className="w-full lg:w-[25%]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
