"use client";

import { createCategory } from "@/actions/action";
import Form from "../../reusable_ui/Form";
import Input from "../../reusable_ui/Input";
import SubmitButton from "../../reusable_ui/SubmitButton";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Trash2 } from "lucide-react";

const CategoryForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set("name", name);
    formData.set("imageUrl", imageUrl);

    try {
      await createCategory(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex">
      <Form action={handleSubmit}>
        {imageUrl ? (
          <div className="relative cursor-pointer w-64 h-64 overflow-hidden rounded-xl flex justify-center items-center border border-teal-500/20">
            <CldImage
              src={imageUrl}
              fill
              alt="Category image banner"
              className="object-cover"
            />
            <Trash2
              size={18}
              onClick={(e) => setImageUrl("")}
              className="text-red-400 hover:text-red-500 absolute top-1 right-1"
            />
          </div>
        ) : (
          <Input
            type="url"
            name="imageUrl"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Category image url..."
          />
        )}

        <Input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name..."
        />

        <SubmitButton>Add Category</SubmitButton>
      </Form>
    </div>
  );
};
export default CategoryForm;
