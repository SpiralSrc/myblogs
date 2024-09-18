import BlogList from "@/components/BlogList";
import Hero from "@/components/mainpage/Hero";
import RightSideBar from "@/components/shared/RightSideBar";
import { prisma } from "@/lib/prismadb";
import { truncate } from "@/lib/utils/truncate";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  const newPost = await prisma.post.findMany({
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
        <div className="w-full h-full flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[75%] flex flex-col gap-3">
            <h3 className="text-left text-2xl font-bold mb-3">
              New Post
            </h3>
            {newPost && newPost[0] && (
              <Link
                href={`/blogs/${newPost[0].slug}`}
                className="w-full card py-5 px-2"
              >
                <h2>{newPost[0].title}</h2>
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="mt-3">
                    <span className="cat">
                      {newPost[0].category.name}
                    </span>
                  </div>
                  <div className="flex gap-5">
                    {newPost[0].tags.map((tag) => (
                      <span key={tag.id} className="tag">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-10 indent-8 lg:w-[85%] mx-auto">
                  <p>{newPost[0].desc}</p>
                </div>
              </Link>
            )}
            <div>
              <h3 className="text-left font-bold text-xl mt-10">
                Recent Posts
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-7">
                {newPost &&
                  newPost.slice(1, 7).map((post) => (
                    <Link
                      href={`/blogs/${post.slug}`}
                      key={post.id}
                      className="card p-5"
                    >
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
          <div className="w-full md:w-[25%] ">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
