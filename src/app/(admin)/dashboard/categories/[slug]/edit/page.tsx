import EditCategoryForm from "@/components/shared/EditCategoryForm";
import { prisma } from "@/lib/prismadb";

export default async function page({
  params,
}: {
  params: { slug: string };
}) {
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
