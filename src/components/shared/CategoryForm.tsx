"use client";

import { createCategory } from "@/actions/action";
import Form from "../reusable_ui/Form";
import Input from "../reusable_ui/Input";
import SubmitButton from "../reusable_ui/SubmitButton";

const CategoryForm = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center font-bold mb-10">
        Add a category
      </h1>
      <Form action={createCategory}>
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
