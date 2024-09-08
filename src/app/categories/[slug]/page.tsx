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
          <div className="w-full h-[25vh] relative">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="wrapper">
            <h1 className="mb-10">{category.name}</h1>
            <div>
              {category.posts.length !== 0 ? (
                category.posts.map((post) => (
                  <Link
                    href={`/categories/blogs/${post.slug}`}
                    key={post.id}
                    className="w-72 flex flex-col gap-5 p-3 rounded-md bg-section-gradient1 backdrop-blur-sm"
                  >
                    <h3 className="font-bold text-lg">
                      {post.title}
                    </h3>
                    <div className="flex justify-start items-center gap-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="py-1 px-2 rounded-md text-sm bg-slate-500/50 backdrop-blur-sm"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))
              ) : (
                <div>
                  <p>No post in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
