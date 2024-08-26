"use server";

import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { categorySchema, postSchema } from "@/lib/validation";

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

//----------------------------- Category ---------------------------------

//create category
export async function createCategory(formData: FormData) {
  // const { userId } = auth()

  // if(!userId) {
  //     return new NextResponse("Unauthorized", {status: 401})
  // }

  try {
    const parsedData = categorySchema.parse({
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
    });

    if (!parsedData.name || !parsedData.imageUrl) {
      console.log("Invalid entry");
      throw new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    await prisma.category.create({
      data: {
        name: parsedData.name,
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
export async function updateCategory(id: string, formData: FormData) {
  // const { userId } = auth()

  // if(!userId) {
  //     return new NextResponse("Unauthorized", {status: 401})
  // }

  try {
    const parsedData = categorySchema.parse({
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
    });

    if (!parsedData.name || !parsedData.imageUrl) {
      console.log("Invalid entry");
      throw new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: parsedData.name,
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
  const id = formData.get("id") as string;

  await prisma.category.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

//fetch category
export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    throw new Error("Failed to create category!");
  }
};

//----------------------------- Post ---------------------------------

//Prisma
export async function createPost(formData: FormData) {
  try {
    const parsedData = postSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.getAll("tags[]"),
    });

    const cat = await prisma.category.findFirst({
      where: { id: parsedData.category },
    });
    if (!cat) {
      throw new Error(`Category not found: ${parsedData.category}`);
    }

    const tagsToConnectOrCreate = parsedData.tags.map(async (tag) => {
      const existingTag = await prisma.tag.findUnique({
        where: { name: tag },
      });
      if (existingTag) {
        return { connect: { id: existingTag.id } };
      } else {
        return { create: { name: tag } };
      }
    });

    const tags = await Promise.all(tagsToConnectOrCreate);

    const newPost = await prisma.post.create({
      data: {
        title: parsedData.title,
        content: parsedData.content,
        category: { connect: { id: cat.id } },
        tags: {
          connectOrCreate: parsedData.tags.map((tag) => ({
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
  const id = formData.get("id") as string;

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
