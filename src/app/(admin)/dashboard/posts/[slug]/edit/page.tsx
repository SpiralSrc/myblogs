import EditPostForm from "@/components/admin/posts/EditPostForm";
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

  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      category: true,
      tags: true,
    },
  });

  if (!post) {
    console.log("Could not find post!");
    return notFound();
  }

  return (
    <div className="wrapper relative">
      <div className="absolute top-10 right-10">
        <Link
          href={"/dashboard/posts"}
          className="close-btn cursor-pointer py-1 rounded-full px-2 bg-pink-400/5 flex gap-2 justify-center items-center text-pink-400/70"
        >
          <X size={19} />
        </Link>
      </div>
      <EditPostForm post={post} />
    </div>
  );
}
