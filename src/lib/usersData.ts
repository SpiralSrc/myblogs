"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prismadb";

export async function fetchLikedPosts() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  try {
    const likedPosts = await prisma.post.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        likes: {
          include: {
            post: true,
            user: true,
          },
        },
      },
    });
    return likedPosts;
  } catch (error) {
    console.log("Failed in fectching liked posts", error);
  }
}
