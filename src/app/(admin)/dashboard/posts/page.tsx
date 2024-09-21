import AdminBlogList from "@/components/admin/AdminBlogList";
import SearchBar from "@/components/SearchBar";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  if (!checkRole("admin")) {
    return notFound();
  }

  const query = searchParams?.query || "";

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
      <h1>Posts</h1>
      <div className="line mb-10"></div>
      <div className="w-full flex flex-col">
        <div className="flex self-end justify-end relative gap-10">
          {/* Search Query */}
          {query && (
            <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
              <AdminBlogList query={query} />
            </div>
          )}
          <div className="w-96">
            <SearchBar />
          </div>

          <Link
            href={"/dashboard/posts/write-post"}
            className=" btn bg-red-400/70 rounded-xl hover:bg-red-200"
          >
            Write a post
          </Link>
        </div>

        {/* ----- Post Table ----- */}
        <div className="w-full h-full flex flex-col mt-20">
          {posts?.length !== 0 ? (
            <table className="w-3/4 mx-auto">
              <thead>
                <tr className="font-bold">
                  <td className="flex-1">Title</td>
                  <td className="flex-1">Category</td>
                  <td className="flex-1">Status</td>
                  <td className="w-28 text-end justify-end items-center">
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
                    <td className="flex-1">
                      {post.isPublished === true
                        ? "Published"
                        : "Draft"}
                    </td>
                    <td className="w-28 flex justify-end items-center gap-3">
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
