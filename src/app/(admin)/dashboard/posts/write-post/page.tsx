import { getCategories } from "@/actions/action";
import BlogForm from "@/components/shared/BlogForm";
import CategoryList from "@/components/shared/CategoryList";
import WritePostForm from "@/components/shared/WritePostForm";
import { CategorySchema } from "@/lib/validation";
import React from "react";

export default async function WritePost() {
  return (
    <section>
      <div className="wrapper">
        <WritePostForm />
      </div>
    </section>
  );
}
