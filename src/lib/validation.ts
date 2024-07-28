import { z } from "zod";

export const postSchema = z.object({
  title: z.string(),
  desc: z.string(),
  imageUrl: z.string(),
  content: z.coerce.string(),
  category: z.coerce.string(),
  tags: z.array(z.string()).optional(),
  userId: z.coerce.string(),
});

export const categorySchema = z.object({
  name: z.string(),
});

export type PostSchema = z.infer<typeof postSchema>;

export type CategorySchema = z.infer<typeof categorySchema>;
