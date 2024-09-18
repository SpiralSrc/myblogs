import { prisma } from "@/lib/prismadb";

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  return <div>page</div>;
}
