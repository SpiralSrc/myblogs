"use client";

import { deleteComment } from "@/actions/action";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteSubmitButton from "@/components/reusable_ui/DeleteSubmitButton";

const DeleteComment = ({ id }: any) => {
  const [modal, setModal] = useState(false);

  const router = useRouter();

  return (
    <div>
      {!modal && (
        <Trash2
          onClick={() => setModal(true)}
          size={19}
          className="text-red-300/20 hover:text-red-500 smooth-effect"
        />
      )}

      {modal && (
        <div
          className="w-screen h-screen top-0 left-0 fixed z-50 flex bg-black/80 backdrop-blur-sm justify-center items-center"
          onClick={() => setModal(false)}
        >
          <X
            size={30}
            className="absolute top-4 right-6 cursor-pointer select-none z-[2] p-2 rounded-full transition-all duration-700 ease-in-out hover:shadow-lg hover:backdrop-blur-md hover:bg-orange-400/20"
          />
          <div
            className="flex flex-col justify-center items-center gap-10 bg-pink-100 rounded-xl shadow-lg text-slate-600 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold">
              Are you sure you want to delete this comment? This
              action cannot be undone.
            </p>
            <div className="flex flex-row gap-10 justify-center items-end self-end">
              <button
                onClick={() => setModal(false)}
                className="py-2 px-3 smooth-effect border border-transparent hover:border-slate-400 hover:bg-slate-400/50 hover:shadow-md rounded-md"
              >
                Cancel
              </button>
              <form
                action={async (formData: FormData) => {
                  await deleteComment(formData);
                  setModal(false);
                  router.refresh();
                }}
              >
                <input type="hidden" name="id" value={id} />
                <DeleteSubmitButton>Delete</DeleteSubmitButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeleteComment;
