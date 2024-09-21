import { deletePost } from "@/actions/action";
import SubmitButton from "@/components/reusable_ui/SubmitButton";
import { checkRole } from "@/lib/utils/roles";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function DeletePostPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <div className="wrapper">
      <div className="flex justify-center items-center mt-32">
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
              <input type="hidden" name="slug" value={params.slug} />
              <SubmitButton>Yes</SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
