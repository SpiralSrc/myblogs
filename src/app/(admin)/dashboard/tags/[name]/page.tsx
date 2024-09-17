import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { Trash2 } from "lucide-react";
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

export default async function SingleTagPage({
  params,
}: {
  params: { name: string };
}) {
  if (!checkRole("admin")) {
    return notFound();
  }

  const id = params.name;

  const tag = await getTags(id);

  return (
    <div className="wrapper">
      <h1 className="mt-10 text-5xl font-bold text-center font-sacramento capitalize">
        {tag?.name}
      </h1>
      <div className="w-full h-full flex flex-col mt-20">
        <Link
          href={`/dashboard/tags/${tag.name}/delete`}
          className="mb-10 flex place-self-end"
        >
          <Trash2
            size={20}
            className="text-red-300/20 hover:text-red-500 smooth-effect"
          />
        </Link>
        {tag.posts.length !== 0 ? (
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
        ) : (
          <div className="w-full h-full flex justify-center items-center mt-10">
            <p>No post in this tag name.</p>
          </div>
        )}
      </div>
    </div>
  );
}
