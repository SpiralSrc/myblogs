import { getCategories } from "@/actions/action";
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
          className="self-end btn bg-red-400/70 rounded-xl hover:bg-red-200 text-sm xs:text-base"
        >
          Add Category
        </Link>
        <div className="w-full h-full flex flex-col mt-20">
          {categories?.length !== 0 ? (
            <table className="w-3/4 mx-auto">
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
                    <td className="flex-1">{categories.length}</td>
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
