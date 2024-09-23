import EditTagForm from "@/components/admin/tags/EditTagForm";
import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import Link from "next/link";
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

  if (!tag) {
    console.log("Tag not found!");
    return notFound();
  }

  return (
    <div className="wrapper">
      <h1>Edit Tag Name</h1>
      <div className="line mb-10"></div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex place-self-end">
          <Link
            href={"/dashboard/tags"}
            className="close-btn cursor-pointer py-1 rounded-lg px-2 bg-pink-400/5 flex gap-2 justify-center items-center text-pink-400/70"
          >
            Cancel
          </Link>
        </div>
        <EditTagForm tag={tag} />
      </div>
    </div>
  );
}
