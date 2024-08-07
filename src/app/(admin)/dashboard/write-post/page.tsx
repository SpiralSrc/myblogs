import { getCategories } from "@/actions/action";
import BlogForm from "@/components/shared/BlogForm";
import CategoryList from "@/components/shared/CategoryList";
import CreatePostForm from "@/components/shared/CreatePostForm";
import { CategorySchema } from "@/lib/validation";
import React from "react";

export default async function WritePost() {
  const categories = await getCategories();
  console.log(categories);

  return (
    <section>
      <div className="wrapper">
        <CreatePostForm>
          <CategoryList />
        </CreatePostForm>
      </div>
    </section>
  );
}
