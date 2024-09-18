"use client";

import { useState } from "react";
import SubmitButton from "../reusable_ui/SubmitButton";
import { createComment, createReply } from "@/actions/action";
import { useRouter } from "next/navigation";

interface ReplyProps {
  slug: any;
  comment: any;
}

const ReplyForm = ({ slug, comment }: ReplyProps) => {
  const [text, setText] = useState("");
  const [reply, setReply] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set("text", text);

    try {
      await createReply(comment.id, slug, formData);
    } catch (error) {
      console.error(error);
    }

    setText("");
    setReply(false);
    router.refresh();
  };

  return (
    <div className="w-[95%] flex flex-col mx-auto">
      <div className="flex place-self-end mb-2">
        {reply ? (
          <span
            className="text-[12px] text-red-400 flex hover:text-red-400/60 smooth-effect cursor-pointer"
            onClick={(e) => setReply(!reply)}
          >
            Cancel
          </span>
        ) : (
          <span
            className="text-[12px] flex hover:text-blue-300/60 smooth-effect cursor-pointer"
            onClick={(e) => setReply(!reply)}
          >
            Reply
          </span>
        )}
      </div>

      {reply ? (
        <form
          action={handleSubmit}
          className="w-[90%] mx-auto flex flex-col mt-5"
        >
          {/* <span className="text-sm italic mb-5">
        *Please log in or register to post a comment
      </span> */}
          <textarea
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your response..."
            className="w-full h-28 py-2 pl-3 pr-2 bg-zinc-100/95 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70 mb-4"
          />
          <SubmitButton>Submit</SubmitButton>
        </form>
      ) : null}
    </div>
  );
};
export default ReplyForm;
