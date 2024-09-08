import { getCategories } from "@/actions/action";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const categories = await getCategories();

  return (
    <div className="wrapper">
      <h1 className="mt-10">Categories</h1>
      <div className="w-full flex flex-col">
        <Link
          href={"/dashboard/categories/add-category"}
          className="self-end btn bg-red-400/70 rounded-xl hover:bg-red-200"
        >
          Add Category
        </Link>
        <div className="w-full h-full flex flex-col mt-20">
          {categories?.length !== 0 ? (
            <table className="w-3/4 mx-auto">
              <thead>
                <tr>
                  <td>Category Name</td>
                  <td className="flex w-1/4 justify-end items-center">
                    Options
                  </td>
                </tr>
              </thead>
              {categories?.map((category) => (
                <tbody key={category.id}>
                  <tr className="border-pink-400/5">
                    <td>{category.name}</td>
                    <td className="flex w-1/4 justify-end items-center gap-3">
                      <Edit
                        size={15}
                        className="text-teal-300/20 hover:text-teal-500 smooth-effect"
                      />
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
