import BlogList from "@/components/BlogList";
import Hero from "@/components/shared/Hero";
import { prisma } from "@/lib/prismadb";
import { truncateDesc, truncateTitle2 } from "@/lib/utils/truncate";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface TagProps {
  params: {
    id: string;
    name: string;
  };
}

const getTags = cache(async (name: string) => {
  const tag = await prisma.tag.findFirst({
    where: { name },
    include: {
      posts: {
        include: {
          category: true,
          tags: true,
        },
      },
    },
  });

  if (!tag) {
    return notFound();
  }

  return tag;
});

export async function generateMetadata({
  params: { name },
}: TagProps): Promise<Metadata> {
  const tag = await getTags(name);

  return {
    title: tag.name + " - Tag",
    description: `Posts related to ${tag.name}`,
  };
}

export default async function SinglePostPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { query: string };
}) {
  const id = params.name;

  const tag = await getTags(id);

  const query = searchParams?.query || "";

  return (
    <>
      <Hero />
      {query && (
        <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}
      <div className="wrapper">
        <h1>{tag?.name}</h1>
        <div className="line mb-10"></div>
        <div className="w-full mx-auto mt-10 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 justify-center items-center gap-10">
          {tag?.posts && tag.posts.length > 0 ? (
            tag.posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col rounded-lg p-3 gr"
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className="card2 py-2 min-h-36"
                >
                  <h3 className="text-center font-bold text-lg">
                    {truncateTitle2(post.title)}
                  </h3>
                  <div className="line mb-3"></div>
                  <div className="w-[94%] mx-auto flex px-5 justify-center items-center">
                    <p className=" flex text-justify text-pretty indent-7 text-sm">
                      {truncateDesc(post.desc)}
                    </p>
                  </div>
                </Link>
                <div className="w-full flex flex-col justify-center items-center gap-2 mt-2">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <Link
                      href={`/categories/${post.category.slug}`}
                      className="cat"
                    >
                      {post.category.name}
                    </Link>
                  </div>
                  <div className="flex gap-5">
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
            <div className="w-full mt-10 flex justify-center">
              <p className="text-center font-medium">
                There are no posts in this tag.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
