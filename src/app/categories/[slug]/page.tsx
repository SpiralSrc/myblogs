import { prisma } from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const category = await prisma.category.findFirst({
    where: {
      slug,
    },
    include: {
      posts: {
        include: {
          tags: true,
        },
      },
    },
  });

  return (
    <div>
      {category && (
        <div>
          <div className="w-full h-[25vh] lg:h-[35vh] xl:h-[40vh] relative">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover"
            />
            <div className="img-overlay"></div>
          </div>
          <div className="wrapper">
            <h1 className="mb-10">{category.name}</h1>
            <div className="line mb-5"></div>
            <div className="w-full mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 justify-center items-center gap-10">
              {category.posts.length !== 0 ? (
                category.posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col rounded-lg p-3 border border-secondary/20 gr"
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="card2 p-5"
                    >
                      <h3 className="font-bold text-center text-lg">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex justify-center items-center gap-4 mt-3">
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
                ))
              ) : (
                <div className="w-full mt-10 flex justify-center">
                  <p className="text-center font-medium">
                    No post in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
