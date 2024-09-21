import TopImage from "@/components/admin/TopImage";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
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

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="wrapper">
      <div className="w-full flex flex-wrap gap-10 justify-center items-center">
        {/* ----- Posts ----- */}
        <div className="card py-5 px-20">
          <h3 className="text-xl font-bold">Total Posts</h3>
          <div className="line mb-3"></div>
          <span className="text-center text-2xl">{posts.length}</span>
        </div>

        {/* ----- Categories ----- */}
        <div className="bg-black/20 py-5 px-20 flex flex-col rounded-lg">
          <h3 className="text-xl font-bold">Total Posts</h3>
          <div className="line mb-3"></div>
          <span className="text-center text-2xl">
            {categories.length}
          </span>
        </div>
      </div>
    </div>
  );
}
