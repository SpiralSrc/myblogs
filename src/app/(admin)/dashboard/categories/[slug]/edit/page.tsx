import EditCategoryForm from "@/components/shared/EditCategoryForm";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export default async function page({
  params,
}: {
  params: { slug: string };
}) {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    return null;
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
