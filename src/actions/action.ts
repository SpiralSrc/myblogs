"use server";

import { dbConnect } from "@/lib/dbConnect";
import { Category, Post } from "@/lib/model";
import { postSchema } from "@/lib/validation";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import {
  StringMap,
  StringToBooleanMap,
  ValidationResponse,
} from "@/app/_types/validationResponseType";
import { parseWithZod } from "@conform-to/zod";

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

  try {
    await dbConnect();

    if (!name) {
      console.log("Invalid entry");
      return new NextResponse("Category name is required!", {
        status: 400,
      });
    }

    const newCategory = await Category.create({
      name,
    });

    newCategory.save();
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
    dbConnect();

    const data = await Category.find({}).sort({
      name: "asc",
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//----------------------------- Post ---------------------------------

// export interface CreatePostErrors<T> {
//   errors?: {
//     title?: string[];
//     desc?: string[];
//     imageUrl?: string[];
//     tags?: string[] | null;
//     content?: string[];
//     category?: string[];
//   };
//   success: boolean;
//   data?: T
// }

//Create Post
export async function createPost(
  prevState: unknown,
  formData: FormData
) {
  // const { userId } = auth()

  // if(!userId) {
  //     return new NextResponse("Unauthorized", {status: 401})
  // }
  // const fields = Object.fromEntries(formData.entries());

  // const result = postSchema.safeParse({ ...fields });

  const submission = parseWithZod(formData, { schema: postSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const imageUrl = submission.value.imageUrl;
  const publicId = imageUrl
    .split("/")
    .slice(-2)
    .join("/")
    .split(".")[0];

  const flattenTags = submission.value.tags?.flatMap((tagString) =>
    tagString.split(",").map((tag) => tag.trim())
  );

  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(submission.value.category)) {
      console.log("Invalid category");
    }

    const categoryId = new mongoose.Types.ObjectId(
      submission.value.category
    );

    const newPost = new Post({
      data: {
        title: submission.value.title,
        desc: submission.value.desc,
        content: submission.value.content,
        imageUrl: submission.value.imageUrl,
        category: categoryId,
        tags: flattenTags,
      },
    });

    const savedPost = await newPost.save();

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { posts: savedPost._id } },
      { new: true }
    );

    console.log(
      "Post added and linked to category:",
      updatedCategory
    );

    revalidatePath("/dashboard/write-post");
    redirect("/blogs");
  } catch (error) {
    try {
      await deleteImage(publicId);

      revalidatePath("/dashboard/write-post");
    } catch (error) {
      console.log("Error deleting the image" + error);
    }

    // console.log(result.error.flatten().fieldErrors);
    // return { success: false };

    // return {success: false, errors: result.error.flatten().fieldErrors}
    console.log({
      errors: submission.reply() && error,
    });
  }
}
