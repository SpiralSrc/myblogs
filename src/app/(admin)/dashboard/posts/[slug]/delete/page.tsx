import { deletePost } from "@/actions/action";
import SubmitButton from "@/components/reusable_ui/SubmitButton";
import Link from "next/link";

export default function DeletePostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="wrapper h-screen">
      <div className="h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10 bg-pink-100 rounded-xl shadow-lg text-slate-600 p-5">
          <p className="font-semibold">
            Are you sure you want to delete this post? This action
            cannot be undone.
          </p>
          <div className="flex flex-row gap-10 justify-center items-end self-end">
            <Link
              href={"/dashboard/posts"}
              className="py-2 px-3 smooth-effect border border-transparent hover:border-slate-400 hover:bg-slate-400/50 hover:shadow-md rounded-md"
            >
              No
            </Link>
            <form action={deletePost}>
              <input type="hidden" name="id" value={params.slug} />
              <SubmitButton>Yes</SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
