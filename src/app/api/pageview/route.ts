import { prisma } from "@/lib/prismadb";

export async function GET() {
  return new Response("Hello", { status: 200 });
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { slug } = await req.json();

    try {
      const loadedPost = await prisma.post.findUnique({
        where: {
          slug,
        },
      });

      if (loadedPost) {
        await prisma.post.update({
          where: { slug },
          data: {
            view_count: {
              increment: 1,
            },
          },
        });
      }

      return new Response(
        "Successfully updating page view to the db",
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating the page view", error);
      return new Response("Failed to post to db", { status: 500 });
    }
  }
}
