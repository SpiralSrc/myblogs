import { z } from "zod";
// import mongoose from "mongoose";

export const postSchema = z.object({
  // id: z.string(),
  title: z
    .string({ message: "Title is required" })
    .min(2, "Title has to be at least 4 characters"),
  desc: z.coerce.string(),
  content: z.coerce
    .string()
    .min(3, "Content has to be at least 5 characters"),
  category: z.coerce.string(),
  tags: z.array(z.coerce.string().min(1)),
});

export const categorySchema = z.object({
  name: z.coerce
    .string()
    .min(3, "Category name has to be at least 3 characters"),
  imageUrl: z.coerce.string().min(1),
  // posts: z.array(z.any()).optional(),
});

export const tagsSchema = z.object({
  name: z
    .string()
    .min(3, "Category name has to be at least 3 characters"),
  posts: z.array(z.any()).optional(),
});

export const commentSchema = z.object({
  text: z.string().min(2).max(250),
});

export const replySchema = z.object({
  text: z.string().min(2).max(250),
});

export type PostSchema = z.infer<typeof postSchema>;

export type CategorySchema = z.infer<typeof categorySchema>;

export type TagSchema = z.infer<typeof tagsSchema>;

export type CommentSchema = z.infer<typeof commentSchema>;

export type ReplySchema = z.infer<typeof replySchema>;
