import BlogList from "@/components/BlogList";
import Hero from "@/components/home/Hero";
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
        <div className="w-72 min-h-60 absolute top-16 right-[25%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}
      <div className="wrapper">
        <div className="w-full h-full flex flex-col md:flex-row md:gap-2 gap-10">
          <div className="w-full md:w-[75%] flex flex-col gap-3">
            {newPost && newPost[0] && (
              <Link
                href={`/blogs/${newPost[0].slug}`}
                className="w-full card py-5 px-2"
              >
                <h2>{newPost[0].title}</h2>
                <div className="flex flex-col justify-center items-center gap-3">
                  <div>
                    <span className="cat">
                      {newPost[0].category.name}
                    </span>
                  </div>
                  <div className="flex gap-5">
                    {newPost[0].tags.map((tag) => (
                      <Link key={tag.id} href={`/tags/${tag.name}`}>
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-10 indent-8">
                  <p>{newPost[0].desc}</p>
                </div>
              </Link>
            )}
            <div className="mt-10 grid grid-cols-2">
              {newPost &&
                newPost.slice(1, 5).map((post) => (
                  <Link
                    href={`/blogs/${post.slug}`}
                    key={post.id}
                    className="card p-2"
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
                          <Link
                            key={tag.id}
                            href={`/tags/${tag.name}`}
                          >
                            #{tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="mt-10 indent-8">
                      <p>{post.desc}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          {/* Right Bar */}
          <div className="w-full md:w-[25%]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
