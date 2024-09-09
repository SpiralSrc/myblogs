import { prisma } from "@/lib/prismadb";

export default async function page() {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      posts: {
        include: {
          category: true,
        },
      },
    },
  });

  return <div></div>;
}
