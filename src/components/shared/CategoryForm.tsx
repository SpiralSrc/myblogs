"use client";

import { createCategory } from "@/actions/action";
import Form from "../reusable_ui/Form";
import Input from "../reusable_ui/Input";
import SubmitButton from "../reusable_ui/SubmitButton";
import { useState } from "react";
import { CldImage } from "next-cloudinary";

const CategoryForm = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center font-bold mb-10">
        Add a category
      </h1>
      <Form action={createCategory}>
        {imageUrl ? (
          <div className="relative cursor-pointer w-64 h-64 overflow-hidden rounded-xl flex justify-center items-center border border-teal-500/20">
            <CldImage
              src={imageUrl}
              fill
              alt="Category image banner"
            />
          </div>
        ) : (
          <Input
            type="url"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Category image url..."
          />
        )}

        <Input
          type="text"
          name="name"
          placeholder="Category name..."
        />

        <SubmitButton>Add Category</SubmitButton>
      </Form>
    </div>
  );
};
export default CategoryForm;
