"use client";

import { useState } from "react";
import SubmitButton from "@/components/reusable_ui/SubmitButton";
import { createComment } from "@/actions/action";
import { useRouter } from "next/navigation";

const CommentForm = ({ post }: any) => {
  const [text, setText] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set("text", text);

    try {
      await createComment(post.slug, formData);
    } catch (error) {
      console.error(error);
    }

    setText("");
    router.refresh();
  };

  return (
    <form
      action={handleSubmit}
      className="w-[90%] mx-auto flex flex-col mt-5"
    >
      <textarea
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full h-32 py-2 pl-3 pr-2 bg-zinc-100/95 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70 mb-4"
      />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};
export default CommentForm;
