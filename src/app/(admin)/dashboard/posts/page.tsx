import { prisma } from "@/lib/prismadb";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="wrapper">
      <h1 className="text-5xl font-bold text-center font-sacramento mt-10">
        Posts
      </h1>
      <div className="w-full flex flex-col">
        <Link
          href={"/dashboard/posts/write-post"}
          className="self-end btn bg-red-400/70 rounded-xl hover:bg-red-200"
        >
          Write a post
        </Link>
        <div className="w-full h-full flex flex-col mt-20">
          {posts?.length !== 0 ? (
            <table className="w-3/4 mx-auto">
              <thead>
                <tr className="font-bold">
                  <td className="flex-1">Title</td>
                  <td className="flex-1">Category</td>
                  <td className="flex w-1/4 justify-end items-center">
                    Options
                  </td>
                </tr>
              </thead>
              {posts?.map((post) => (
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
                    <td className="flex w-1/4 justify-end items-center gap-3">
                      <Link
                        href={`/dashboard/posts/${post.slug}/edit`}
                      >
                        <Edit
                          size={15}
                          className="text-teal-300/20 hover:text-teal-500 smooth-effect"
                        />
                      </Link>

                      <Link
                        href={`/dashboard/posts/${post.slug}/delete`}
                      >
                        <Trash2
                          size={15}
                          className="text-red-300/20 hover:text-red-500 smooth-effect"
                        />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <div className="w-full flex justify-center items-center">
              <p>No post being published yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
