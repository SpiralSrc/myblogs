import { prisma } from "@/lib/prismadb";
import Link from "next/link";

export default async function page() {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      posts: true,
    },
  });

  return (
    <div className="wrapper">
      <h1 className="mt-10">All Tags</h1>
      <div className="w-full flex flex-col">
        <div className="w-full h-full flex flex-col mt-20">
          <table className="w-3/4 mx-auto">
            <thead>
              <tr className="font-bold">
                <td className="flex-1">Name</td>
                <td className="flex-1">Posts</td>
              </tr>
            </thead>
            {tags ? (
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
