import Hero from "@/components/mainpage/Hero";
import { prisma } from "@/lib/prismadb";
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

  if (!tag) notFound();

  return tag;
});

export async function generateMetadata({
  params: { name },
}: TagProps): Promise<Metadata> {
  const tag = await getTags(name);

  return {
    title: tag.name + " - Tags",
    description: `Posts related to ${tag.name}`,
  };
}

export default async function SinglePostPage({
  params,
}: {
  params: { name: string };
}) {
  const id = params.name;

  const tag = await getTags(id);

  return (
    <>
      <Hero />
      <div className="wrapper py-10 lg:py-20">
        <h1 className="text-5xl font-bold text-center font-sacramento capitalize">
          {tag?.name}
        </h1>
        <div className="line mb-5"></div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
          {tag.posts.length > 0 ? (
            tag.posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="card p-5"
              >
                <h3 className="text-center font-bold text-lg">
                  {post.title}
                </h3>
                <div className="flex flex-col justify-center items-center gap-3">
                  <div>
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
              </Link>
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
