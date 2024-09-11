import EditPostForm from "@/components/shared/EditPostForm";
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
      <EditPostForm post={post} />
    </div>
  );
}
