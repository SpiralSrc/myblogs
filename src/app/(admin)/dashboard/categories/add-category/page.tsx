import CategoryForm from "@/components/admin/categories/CategoryForm";
import { checkRole } from "@/lib/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function AddCategory() {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <section>
      <div className="wrapper relative">
        <div className="absolute top-10 right-10">
          <Link
            href={"/dashboard/categories"}
            className="close-btn cursor-pointer py-1 rounded-full px-2 bg-pink-400/5 flex gap-2 justify-center items-center text-pink-400/70"
          >
            <X size={19} />
          </Link>
        </div>

        <h1>Add category</h1>
        <div className="line mb-10"></div>

        <CategoryForm />
      </div>
    </section>
  );
}
