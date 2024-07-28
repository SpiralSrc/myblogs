import { z } from "zod";

export const postSchema = z.object({
  title: z.string(),
  desc: z.string(),
  imageUrl: z.string(),
  content: z.coerce.string(),
  slug: z.string(),
  category: z.coerce.string(),
  userId: z.coerce.string(),
});

export type PostSchema = z.infer<typeof postSchema>;
