import PostForm from "@/components/shared/PostForm";
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

  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      category: true,
      tags: true,
    },
  });

  return (
    <div className="wrapper">
      <PostForm post={post} />
    </div>
  );
}
