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

export default async function RecentPosts({ post }: PostProps) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <Link
      href={`/blogs/${post.slug}`}
      key={post.id}
      className="card p-5 group relative"
    >
      <div className="w-full h-full gr-overlay absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:zoom-in"></div>

      <h3 className="text-center font-bold text-lg">{post.title}</h3>

      {/* Separator */}
      <div className="line mb-3" />

      <div className="flex flex-col justify-center items-center gap-2">
        <div>
          <span className="cat">{post.category.name}</span>
        </div>
        <div className="flex gap-5">
          {post.tags.map((tag) => (
            <span key={tag.id} className="tag">
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 indent-8 text-wrap">
        <p>{truncate(post.desc)}</p>
      </div>
    </Link>
  );
}
