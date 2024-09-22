import TopImage from "@/components/admin/TopImage";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { truncateTitle } from "@/lib/utils/truncate";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page() {
  if (!checkRole("admin")) {
    return notFound();
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      title: "asc",
    },
  });

  const mostViewedPosts = await prisma.post.findMany({
    orderBy: {
      view_count: "desc",
    },
    include: {
      category: true,
    },
    take: 5,
  });

  const mostLikedPosts = await prisma.post.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    include: {
      category: true,
      likes: true,
    },
    take: 5,
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="wrapper">
      {/* Top cards */}
      <div className="w-full flex flex-wrap gap-10 justify-center items-center">
        {/* ----- Posts ----- */}
        <div className="card py-5 px-20">
          <h3 className="text-xl font-bold">Total Posts</h3>
          <div className="line mb-3"></div>
          <span className="text-center text-2xl">{posts.length}</span>
        </div>

        {/* ----- Categories ----- */}
        <div className="bg-black/20 py-5 px-20 flex flex-col rounded-lg">
          <h3 className="text-xl font-bold">Total Categories</h3>
          <div className="line mb-3"></div>
          <span className="text-center text-2xl">
            {categories.length}
          </span>
        </div>

        <div className="card2 py-5 px-20 flex flex-col rounded-lg">
          <h3 className="text-xl font-bold">Total Tags</h3>
          <div className="line mb-3"></div>
          <span className="text-center text-2xl">{tags.length}</span>
        </div>
      </div>

      {/* Data */}
      <div className="w-full flex flex-wrap gap-5 justify-center items-center mt-10">
        {/* Most Viewed Posts */}
        <div className="bg-black/30 backdrop-blur-sm w-[98%] md:flex-1 rounded-lg p-3">
          <h2 className="mb-3">Most Viewed Posts</h2>
          <table className="w-full mx-auto">
            <thead>
              <tr>
                <td className="flex-1">Title</td>
                <td className="w-28 flex justify-start items-center">
                  Category
                </td>
                <td className="w-20 flex justify-center items-center">
                  Views
                </td>
              </tr>
            </thead>
            {mostViewedPosts &&
              mostViewedPosts.map((post) => (
                <tbody key={post.id}>
                  <tr className="border-pink-400/5">
                    <td className="flex-1">
                      <Link href={`/dashboard/posts/${post.slug}`}>
                        {truncateTitle(post.title)}
                      </Link>
                    </td>
                    <td className="w-28 flex justify-start items-center">
                      {post.category.name}
                    </td>
                    <td className="w-20 flex justify-center items-center">
                      {post.view_count}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>

        {/* Most Liked Post */}
        <div className="gr w-[98%] md:flex-1 rounded-lg p-3">
          <h2 className="mb-3">Most Liked Posts</h2>
          <table className="w-full mx-auto">
            <thead>
              <tr>
                <td className="flex-1">Title</td>
                <td className="w-28 flex justify-start items-center">
                  Category
                </td>
                <td className="w-20 flex justify-center items-center">
                  Likes
                </td>
              </tr>
            </thead>
            {mostLikedPosts &&
              mostLikedPosts.map((post) => (
                <tbody key={post.id}>
                  <tr className="border-pink-400/5">
                    <td className="flex-1">
                      <Link href={`/dashboard/posts/${post.slug}`}>
                        {truncateTitle(post.title)}
                      </Link>
                    </td>
                    <td className="w-28 flex justify-start items-center">
                      {post.category.name}
                    </td>
                    <td className="w-20 flex justify-center items-center">
                      {post.likes.length}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
