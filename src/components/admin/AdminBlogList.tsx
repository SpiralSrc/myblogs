import { getPost } from "@/actions/action";
import Link from "next/link";

const AdminBlogList = async ({ query }: { query: string }) => {
  const post = await getPost();
  const filteredPost = Array.isArray(post)
    ? post.filter((item) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <div className="w-full">
      {Array.isArray(post) && post.length === 0 && (
        <p>No post found.</p>
      )}
      <div className="w-full flex flex-col">
        {Array.isArray(post) &&
          filteredPost.map((item) => (
            <Link
              href={`/dashboard/posts/${item.slug}`}
              key={item.id}
              className="w-full bg-stone-600 backdrop-blur-sm border-b border-secondary/40 p-4"
            >
              <h3 className="font-bold text-lg">{item.title}</h3>
              <span className="cat">{item.category.name}</span>
              <div className="flex justify-start items-center gap-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="mt-2 py-1 px-2 rounded-md text-sm text-secondary/95"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default AdminBlogList;
