import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
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
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    return null;
  }

  const id = params.name;

  const tag = await getTags(id);

  return (
    <div className="wrapper">
      <h1 className="text-5xl font-bold text-center font-sacramento capitalize">
        {tag?.name}
      </h1>
      <div className="w-full h-full flex flex-col mt-20">
        <table className="w-3/4 mx-auto">
          <thead>
            <tr className="font-bold">
              <td className="flex-1">
                Post Title ({tag?.posts.length})
              </td>
              <td className="flex-1">Category</td>
            </tr>
          </thead>
          {tag ? (
            tag.posts.map((post) => (
              <tbody key={post.id}>
                <tr className="border-pink-400/5">
                  <td className="flex-1">
                    <Link href={`/dashboard/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </td>
                  <td className="flex-1 pl-3 text-left">
                    <div className="">{post.category.name}</div>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <div>
              <p>No post being published yet.</p>
            </div>
          )}
        </table>
      </div>
    </div>
  );
}
