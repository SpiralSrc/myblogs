import EditCategoryForm from "@/components/admin/categories/EditCategoryForm";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { slug: string };
}) {
  if (!checkRole("admin")) {
    return notFound();
  }

  const slug = params.slug;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (!category) {
    return new Response("Category not found!");
  }

  return (
    <div className="wrapper relative">
      <div className="absolute top-10 right-10">
        <Link
          href={"/dashboard/categories"}
          className="close-btn cursor-pointer py-1 rounded-full px-2 bg-pink-400/5 flex gap-2 justify-center items-center text-pink-400/70"
        >
          <X size={19} />
        </Link>
      </div>

      <h1>Edit category</h1>
      <div className="line mb-10"></div>

      <EditCategoryForm category={category} />
    </div>
  );
}
