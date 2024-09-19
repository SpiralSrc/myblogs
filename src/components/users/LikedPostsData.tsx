import { prisma } from "@/lib/prismadb";
import { fetchLikedPosts } from "@/lib/usersData";

export default async function LikedPostsData({ userId }: any) {
  const likedPosts = await fetchLikedPosts();

  return (
    <div>
      {likedPosts?.map((post) => (
        <div key={post.id}>
          {post.likes.map((like) => (
            <div key={like.id}>
              {like.user.clerkId === userId ? (
                <div>
                  <h2>{like.post.title}</h2>
                </div>
              ) : (
                <div>
                  <p>No liked posts.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
