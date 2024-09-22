"use client";

import { switchPostLike } from "@/actions/action";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";

const LikePostButton = ({
  slug,
  likes,
  user,
}: {
  slug: string;
  user: any;
  likes: string[];
}) => {
  const { userId } = useAuth();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    isLiked,
    (state, value) => {
      return {
        likeCount: state.isLiked
          ? state.likeCount - 1
          : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const handleClick = async () => {
    switchOptimisticLike("");

    try {
      await switchPostLike(slug);
      setIsLiked((state) => ({
        likeCount: state.isLiked
          ? state.likeCount - 1
          : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {userId && (
        <form
          action={handleClick}
          className="flex justify-center items-center"
        >
          <button>
            <Heart
              size={19}
              className={`text-red-400/50 ${
                optimisticLike.isLiked && user
                  ? "fill-red-400"
                  : "fill-white"
              }`}
            />
          </button>
        </form>
      )}
    </div>
  );
};
export default LikePostButton;
