import { getPost } from "@/actions/action";
import Link from "next/link";

const BlogList = async ({ query }: { query: string }) => {
  const post = await getPost();
  const filteredPost = Array.isArray(post)
    ? post.filter((item) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <div className="mt-5">
      {Array.isArray(post) && post.length === 0 && (
        <p>No post found.</p>
      )}
      <div className="flex gap-5">
        {Array.isArray(post) &&
          filteredPost.map((item) => (
            <Link
              href={`/categories/blogs/${item.slug}`}
              key={item.id}
              className="card bg-section-gradient1 backdrop-blur-sm"
            >
              <h3 className="font-bold text-lg">{item.title}</h3>
              <div className="flex justify-start items-center gap-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="py-1 px-2 rounded-md text-sm bg-slate-500/50 backdrop-blur-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default BlogList;
