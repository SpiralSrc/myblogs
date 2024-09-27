"use server";

import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import {
  categorySchema,
  commentSchema,
  postSchema,
  replySchema,
  tagsSchema,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Cloudinary Image deletion
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);

    if (result.ok !== "ok") {
      return new NextResponse(
        `Failed to delete the image: ${result.result}`
      );
    }

    revalidatePath("/admin/write-post");
  } catch (error) {
    console.log("Error in deleting the image" + error);
    return new NextResponse("Error deleting the image", {
      status: 500,
    });
  }
}

//----------------------------- User ---------------------------------

// Delete User Admin only
export async function deleteUser(formData: FormData) {
  const clerkId = formData.get("clerkId") as string;

  await prisma.user.delete({
    where: {
      clerkId,
    },
  });

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

//----------------------------- Category ---------------------------------

//create category
export async function createCategory(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const parsedData = categorySchema.parse({
      name: formData.get("name"),
      slug: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
    });

    if (!parsedData.name || !parsedData.imageUrl) {
      console.log("Invalid entry");
      throw new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    const newSlug = parsedData.name
      .replace(/\s+/g, "-")
      .toLowerCase();

    await prisma.category.create({
      data: {
        name: parsedData.name,
        slug: newSlug,
        imageUrl: parsedData.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Error adding category", { status: 500 });
  }

  revalidatePath("/dashboard/categories/add-category");
  redirect("/dashboard/categories");
}

//update category
export async function updateCategory(
  slug: string,
  formData: FormData
) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const parsedData = categorySchema.parse({
      name: formData.get("name"),
      slug: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
    });

    if (!parsedData.name || !parsedData.imageUrl) {
      console.log("Invalid entry");
      throw new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    const newSlug = parsedData.name
      .replace(/\s+|\/+/g, "-")
      .toLowerCase();

    await prisma.category.update({
      where: {
        slug,
      },
      data: {
        name: parsedData.name,
        slug: newSlug,
        imageUrl: parsedData.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Error adding category", { status: 500 });
  }

  revalidatePath("/dashboard/categories/add-category");
  redirect("/dashboard/categories");
}

export async function deleteCategory(formData: FormData) {
  const slug = formData.get("slug") as string;

  await prisma.category.delete({
    where: {
      slug,
    },
  });

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

//fetch category
export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (!categories) return;

    return categories;
  } catch (error) {
    throw new Error("Failed to create category!");
  }
};

//----------------------------- Post ---------------------------------

//Prisma
export async function createPost(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const parsedData = postSchema.parse({
      title: formData.get("title"),
      slug: formData.get("title"),
      desc: formData.get("desc"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.getAll("tags[]"),
      isPublished: formData.get("isPublished") === "true",
    });

    if (
      !parsedData.title ||
      !parsedData.desc ||
      !parsedData.content ||
      !parsedData.category ||
      !parsedData.tags
    ) {
      throw new Error("Some required fields were not filled");
    }

    const category = await prisma.category.findFirst({
      where: { name: parsedData.category },
    });

    if (!category) {
      throw new Error(`Category not found: ${parsedData.category}`);
    }

    const newSlug = parsedData.title
      .replace(/\s+/g, "-")
      .toLowerCase();

    await prisma.post.create({
      data: {
        title: parsedData.title,
        slug: newSlug,
        user: {
          connect: { clerkId: user.clerkId },
        },
        isPublished: parsedData.isPublished,
        desc: parsedData.desc,
        content: parsedData.content,
        category: {
          connect: { id: category.id },
        },
        tags: {
          connectOrCreate: parsedData.tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        user: true,
        category: true,
        tags: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new NextResponse("Failed to create post!", { status: 500 });
  }
  revalidatePath("/dashboard/posts/write-post");
  redirect("/dashboard/posts");
}

// Update Post
export async function updatePost(slug: string, formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const parsedData = postSchema.parse({
      title: formData.get("title"),
      slug: formData.get("title"),
      desc: formData.get("desc"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.getAll("tags[]"),
      isPublished: formData.get("isPublished") === "true",
    });

    const newSlug = parsedData.title
      .replace(/\s+/g, "-")
      .toLowerCase();

    const cat = await prisma.category.findFirst({
      where: { name: parsedData.category },
    });
    if (!cat) {
      throw new Error(`Category not found: ${parsedData.category}`);
    }

    const existingTags = await prisma.post.findUnique({
      where: { slug },
      select: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const newTags = parsedData.tags.filter((tag: string) => {
      const existingTag = existingTags?.tags.find(
        (t: any) => t.name === tag
      );
      return existingTag ? existingTag.name : null;
    });

    await prisma.post.update({
      where: {
        slug,
      },
      data: {
        title: parsedData.title,
        slug: newSlug,
        isPublished: parsedData.isPublished,
        desc: parsedData.desc,
        content: parsedData.content,
        category: { connect: { id: cat.id } },
        tags: {
          // Disconnect tags that are no longer present
          disconnect: existingTags?.tags
            .filter(
              (existingTag: any) =>
                !parsedData.tags.includes(existingTag.name)
            )
            .map((existingTag: any) => ({ name: existingTag.name })),
          // Connect or create new tags
          connectOrCreate: parsedData.tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new NextResponse("Failed to create post!", { status: 500 });
  }
  revalidatePath("/dashboard/posts/write-post");
  redirect("/dashboard/posts");
}

//delete Post
export async function deletePost(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  const slug = formData.get("slug") as string;

  await prisma.post.delete({
    where: {
      slug,
    },
  });

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

//fetch category
export const getPost = async () => {
  try {
    const post = await prisma.post.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) return;

    return post;
  } catch (error) {
    throw new Error("Failed to create category!");
  }
};

//----------------------------- Tag ---------------------------------

// Delete tag after disconnecting from the posts
export async function deleteTagName(formData: FormData) {
  const name = formData.get("name") as string;
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        name: name,
      },
    });
    if (!tag) {
      throw new Error("Tag name not found");
    }

    // Get the posts that are associated with this tag
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: tag.name,
          },
        },
      },
      include: {
        tags: true,
      },
    });

    // Disconnect the tag from each post
    await Promise.all(
      posts.map(async (post) => {
        await prisma.post.update({
          where: {
            slug: post.slug,
          },
          data: {
            tags: {
              set: post.tags.filter((t: any) => t.name !== tag.name),
            },
          },
        });
      })
    );

    // Delete the tag
    await prisma.tag.delete({
      where: {
        name: tag.name,
      },
    });
  } catch (error) {
    return new NextResponse(`Failed to delete tag`, {
      status: 500,
    });
  }
  revalidatePath("/dashboard/tags");
  redirect("/dashboard/tags");
}

export async function updateTag(name: string, formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const parsedData = tagsSchema.parse({
      name: formData.get("name"),
    });

    if (!parsedData.name) {
      console.log("Invalid entry");
      throw new NextResponse("Tag name is required!", {
        status: 400,
      });
    }

    await prisma.tag.update({
      where: {
        name,
      },
      data: {
        name: parsedData.name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Error updating tag name", {
      status: 500,
    });
  }

  revalidatePath(`/dashboard/tags/${name}`);
  redirect("/dashboard/tags");
}

//----------------------------- Comment ---------------------------------
export async function createComment(
  slug: string,
  formData: FormData
) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        slug: true,
      },
    });

    if (!post) {
      console.log("Post not found");
      throw new NextResponse("Post not found", { status: 404 });
    }

    const parsedData = commentSchema.parse({
      text: formData.get("text"),
    });

    if (!parsedData.text) {
      console.log("Invalid entry");
      throw new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    await prisma.comment.create({
      data: {
        text: parsedData.text,
        user: { connect: { clerkId: userId } },
        post: { connect: { slug: slug } },
      },
    });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Error adding a comment", { status: 500 });
  }

  revalidatePath(`/blogs/${slug}`);
}

export async function deleteComment(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  try {
    const id = formData.get("id") as string;

    await prisma.comment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

//----------------------------- Reply ---------------------------------
export async function createReply(
  id: string,
  slug: string,
  formData: FormData
) {
  const { userId } = auth();

  if (!userId) {
    console.log("Access denied");
    redirect("/");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const post = await prisma.post.findFirst({
      where: {
        slug,
      },
    });

    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        replies: true,
      },
    });

    if (!comment) {
      console.log("Post not found");
      throw new NextResponse("Comment not found", { status: 404 });
    }

    const parsedData = replySchema.parse({
      text: formData.get("text"),
    });

    if (!parsedData.text) {
      console.log("Invalid entry");
      throw new NextResponse("Invalid text!", {
        status: 400,
      });
    }

    await prisma.reply.create({
      data: {
        text: parsedData.text,
        user: { connect: { clerkId: userId } },
        comment: { connect: { id: id } },
      },
    });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Error in replying to the comment", {
      status: 500,
    });
  }

  revalidatePath(`/blogs/${slug}`);
}

// Delete Reply
export async function deleteReply(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  try {
    const id = formData.get("id") as string;

    await prisma.reply.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

//----------------------------- Likes ---------------------------------
export async function switchPostLike(postSlug: string) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postSlug,
        user: {
          clerkId: userId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          post: { connect: { slug: postSlug } },
          user: {
            connect: {
              clerkId: userId,
            },
          },
        },
      });
    }
    revalidatePath(`blogs/${postSlug}`);
  } catch (error) {
    console.log(error);
    throw new NextResponse("There is an error in liking the post", {
      status: 501,
    });
  }
}

//----------------------------- Page View ---------------------------------

export async function incrementPageView(slug: string) {
  const { userId } = auth();
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { view_count: true, last_viewed_at: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const now = new Date();
    const shortPeriod = 3 * 60 * 1000; // 3-minute cooldown

    if (userId) {
      //for logged in users because there might be instance the page reloads under any circumstances
      if (
        !post.last_viewed_at ||
        now.getTime() - new Date(post.last_viewed_at).getTime() >
          shortPeriod
      ) {
        await prisma.post.update({
          where: { slug },
          data: {
            view_count: {
              increment: 1,
            },
            last_viewed_at: now,
          },
        });
      }
    } else {
      // Increment view count for non-logged-in users without cooldown
      await prisma.post.update({
        where: { slug },
        data: {
          view_count: {
            increment: 1,
          },
        },
      });
    }
  } catch (error) {
    console.error("Failed to increment page view count:", error);
  }
}
