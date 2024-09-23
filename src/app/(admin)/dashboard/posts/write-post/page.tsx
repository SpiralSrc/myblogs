import WritePostForm from "@/components/admin/posts/WritePostForm";
import { checkRole } from "@/lib/utils/roles";
import { X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import React from "react";

export default async function WritePost() {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <section>
      <div className="wrapper relative">
        <div className="absolute top-10 right-10">
          <Link
            href={"/dashboard/posts"}
            className="close-btn cursor-pointer py-1 rounded-full px-2 bg-pink-400/5 flex gap-2 justify-center items-center text-pink-400/70"
          >
            <X size={19} />
          </Link>
        </div>
        <h1>Write a Post</h1>
        <div className="line mb-10"></div>
        <WritePostForm />
      </div>
    </section>
  );
}
