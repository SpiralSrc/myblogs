import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page() {
  if (!checkRole("admin")) {
    return notFound();
  }

  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      posts: true,
      _count: true,
    },
  });

  return (
    <div className="wrapper">
      <h1>All Tags</h1>
      <div className="line mb-10"></div>
      <div className="w-full flex flex-col">
        <div className="w-full h-full flex flex-col mt-20">
          <table className="w-3/4 mx-auto">
            <thead>
              <tr className="font-bold">
                <td className="flex-1">Name</td>
                <td className="flex-1">Posts</td>
                <td className="flex w-1/4 justify-end items-center">
                  Options
                </td>
              </tr>
            </thead>
            {tags.length !== 0 ? (
              tags.map((tag) => (
                <tbody key={tag.id}>
                  <tr className="border-pink-400/5">
                    <td className="flex-1">
                      <Link href={`/dashboard/tags/${tag.name}`}>
                        {tag.name}
                      </Link>
                    </td>
                    <td className="flex-1 pl-3 text-left">
                      <div className="">{tag.posts.length}</div>
                    </td>
                    <td className="flex w-1/4 justify-end items-center gap-3">
                      <Link href={`/dashboard/tags/${tag.name}/edit`}>
                        <Edit
                          size={15}
                          className="text-teal-300/20 hover:text-teal-500 smooth-effect"
                        />
                      </Link>

                      <Link
                        href={`/dashboard/tags/${tag.name}/delete`}
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
                <p>There are no tags added.</p>
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
