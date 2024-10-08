import AdminBlogList from "@/components/admin/AdminBlogList";
import SearchBar from "@/components/SearchBar";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { truncateTitle2 } from "@/lib/utils/truncate";
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
        {/* Search Bar & Write Post Button */}
        <div className="flex flex-col-reverse xs:flex-row self-end justify-end relative gap-10">
          {/* Search Query */}
          {query && (
            <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
              <AdminBlogList query={query} />
            </div>
          )}
          <div className="w-72 xs:w-96">
            <SearchBar />
          </div>
          <div className="flex place-self-end">
            <Link
              href={"/dashboard/posts/write-post"}
              className="flex place-self-end py-1 px-3 text-sm md:text-base md:py-[5px] md:px-5 rounded-xl border border-pink-400/50 bg-pink-400/30 smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20"
            >
              Write a post
            </Link>
          </div>
        </div>

        {/* ----- Post Table ----- */}
        <div className="w-full h-full flex flex-col mt-20">
          {posts?.length !== 0 ? (
            <table className="w-[96%] sm:w-3/4 mx-auto">
              <thead>
                <tr className="font-bold">
                  <td className="flex-1">Title</td>
                  <td className="flex-1">Category</td>
                  <td className="flex-1">Status</td>
                  <td className="w-20 sm:w-28 text-end justify-end items-center">
                    Options
                  </td>
                </tr>
              </thead>
              {posts?.map((post) => (
                <tbody key={post.id}>
                  <tr className="border-pink-400/5">
                    <td className="flex-1">
                      <Link href={`/dashboard/posts/${post.slug}`}>
                        {truncateTitle2(post.title)}
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
                    <td className="w-20 sm:w-28 flex justify-end items-center gap-3">
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
