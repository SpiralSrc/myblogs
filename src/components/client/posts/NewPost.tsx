import { truncate } from "@/lib/utils/truncate";
import { Category, Post as PostData, Tag } from "@prisma/client";
import Link from "next/link";

interface PostWithRelations extends PostData {
  category: Category;
  tags: Tag[];
}
interface PostProps {
  post: PostWithRelations;
}

export default async function NewPost({ post }: PostProps) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <>
      {post && (
        <Link
          href={`/blogs/${post.slug}`}
          className="w-full card py-5 px-2 group relative"
        >
          <div className="w-full h-full gr-overlay absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:zoom-in"></div>
          <h2>{post.title}</h2>

          {/* Separator */}
          <div className="line mt-2 mb-3" />

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="mt-3">
              <span className="cat2">{post.category.name}</span>
            </div>
            <div className="flex gap-5">
              {post.tags.map((tag) => (
                <span key={tag.id} className="text-sm text-stone-500">
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 indent-8 lg:w-[85%] mx-auto">
            <p>{truncate(post.desc)}</p>
          </div>
        </Link>
      )}
    </>
  );
}
