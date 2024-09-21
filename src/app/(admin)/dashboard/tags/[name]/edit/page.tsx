import EditTagForm from "@/components/admin/tags/EditTagForm";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { notFound } from "next/navigation";

export default async function EditTagPage({
  params,
}: {
  params: { name: string };
}) {
  if (!checkRole("admin")) {
    return notFound();
  }

  const name = params.name;

  const tag = await prisma.tag.findUnique({
    where: {
      name,
    },
  });
  return (
    <div>
      <EditTagForm tag={tag} />
    </div>
  );
}
