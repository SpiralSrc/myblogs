"use server";

import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { postSchema } from "@/lib/validation";

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

  const name = formData.get("name") as string;
  const imageUrl = formData.get("imageUrl") as string;

  try {
    if (!name) {
      console.log("Invalid entry");
      return new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error adding category", { status: 500 });
  }

  revalidatePath("/dashboard/categories/add-category");
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

    const newPost = await prisma.post.create({
      data: {
        title: parsedData.title,
        content: parsedData.content,
        category: { connect: { id: cat.id } },
        tags: {
          create: parsedData.tags.map((tag) => ({ name: tag })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new NextResponse("Failed to create post!", { status: 500 });
  }
  revalidatePath("/dashboard/write-post");
  redirect("/dashboard");
}
