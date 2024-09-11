"use client";

import { useState } from "react";

const PostLike = ({
  slug,
  likes,
}: {
  slug: string;
  likes: string[];
}) => {
  // //clerk user for csr
  // const {isLoaded, userId} = useAuth()

  // const [likeState, setLikeState] = useState({
  //     likeCount: likes.length,
  //to check if there's a user id which means the user liked the post, if not then false
  //     isLiked: userId ? likes.include(userId) : false
  // })

  //   const handleClick = async () => {
  //     try {
  //         await switchLike(slug)
  //         setLikeState((prev) => [...prev, likeState])
  //     } catch (error) {
  //         console.error(error)
  //     }
  //   }

  return (
    <div>
      <form>
        <button>Like</button>
      </form>
    </div>
  );
};
export default PostLike;
