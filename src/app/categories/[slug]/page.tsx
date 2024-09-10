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
          <div className="w-full h-[25vh] lg:h-[35vh] xl:h-[38vh] relative">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="wrapper">
            <h1 className="mb-10">{category.name}</h1>
            <div className="line mb-5"></div>
            <div className="w-full mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 justify-center items-center gap-10">
              {category.posts.length !== 0 ? (
                category.posts.map((post) => (
                  <Link
                    href={`/blogs/${post.slug}`}
                    key={post.id}
                    className="w-96 h-40 flex flex-col gap-5 p-3 rounded-md card"
                  >
                    <h3 className="font-bold text-lg">
                      {post.title}
                    </h3>

                    <div className="flex justify-start items-center gap-4">
                      {post.tags.map((tag) => (
                        <span key={tag.id} className="tag">
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </Link>
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
