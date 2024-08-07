import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(5, "Title has to be at least 5 characters"),
  desc: z
    .string({ message: "Description is required" })
    .min(5, "Description has to be at least 5 characters"),
  imageUrl: z.coerce.string().min(5, "Invalid image url"),
  content: z.coerce
    .string()
    .min(5, "Content has to be at least 5 characters"),
  category: z.coerce
    .string({ message: "Please choose a category" })
    .min(2, "Invalid category entry"),
  tags: z.array(z.string()).optional(),
  // userId: z.coerce.string().optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, "Category name has to be at least 3 characters"),
  posts: z.array(z.any()).optional(),
});

export type PostSchema = z.infer<typeof postSchema>;

export type CategorySchema = z.infer<typeof categorySchema>;
