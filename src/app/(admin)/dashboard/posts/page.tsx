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
      <h1 className="text-5xl font-bold text-center font-sacramento">
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
            {posts ? (
              posts.map((post) => (
                <tbody key={post.id}>
                  <tr className="border-pink-400/5">
                    <td className="flex-1">
                      <Link href={`/dashboard/posts/${post.id}`}>
                        {post.title}
                      </Link>
                    </td>
                    <td className="flex-1 pl-3 text-left">
                      <div className="">{post.category.name}</div>
                    </td>
                    <td className="flex w-1/4 justify-end items-center gap-3">
                      <Edit
                        size={15}
                        className="text-teal-300/20 hover:text-teal-500 smooth-effect"
                      />
                      <Link
                        href={`/dashboard/posts/${post.id}/delete`}
                      >
                        <Trash2
                          size={15}
                          className="text-red-300/20 hover:text-red-500 smooth-effect"
                        />
                      </Link>
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
    </div>
  );
}
