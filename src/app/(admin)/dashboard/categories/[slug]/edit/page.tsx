import EditCategoryForm from "@/components/admin/categories/EditCategoryForm";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
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

  return (
    <div>
      <EditCategoryForm category={category} />
    </div>
  );
}
