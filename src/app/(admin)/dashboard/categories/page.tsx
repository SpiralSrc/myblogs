import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page() {
  if (!checkRole("admin")) {
    return notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      posts: true,
    },
  });

  return (
    <div className="wrapper">
      <h1>Categories</h1>
      <div className="line mb-10"></div>
      <div className="w-full flex flex-col">
        <Link
          href={"/dashboard/categories/add-category"}
          className="flex place-self-end py-1 px-3 text-sm md:text-base md:py-[5px] md:px-5 rounded-xl border border-pink-400/50 bg-pink-400/30 smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20"
        >
          Add Category
        </Link>
        <div className="w-full h-full flex flex-col mt-20">
          {categories?.length !== 0 ? (
            <table className="w-[95%] sm:w-3/4 mx-auto">
              <thead>
                <tr>
                  <td className="flex-1">Category Name</td>
                  <td className="flex-1">Posts</td>
                  <td className="flex w-1/4 justify-end items-center">
                    Options
                  </td>
                </tr>
              </thead>
              {categories?.map((category) => (
                <tbody key={category.id}>
                  <tr className="border-pink-400/5">
                    <td className="flex-1">{category.name}</td>
                    <td className="flex-1">
                      {category.posts.length}
                    </td>
                    <td className="flex w-1/4 justify-end items-center gap-3">
                      <Link
                        href={`/dashboard/categories/${category.slug}/edit`}
                      >
                        <Edit
                          size={15}
                          className="text-teal-300/20 hover:text-teal-500 smooth-effect"
                        />
                      </Link>

                      <Link
                        href={`/dashboard/categories/${category.slug}/delete`}
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
            <div className="w-full h-full flex justify-center items-center">
              <p>No categories added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
