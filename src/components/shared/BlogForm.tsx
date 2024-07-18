import React from "react";
import Form from "../reusable_ui/Form";
import Input from "../reusable_ui/Input";
import SubmitButton from "../reusable_ui/SubmitButton";

const BlogForm = () => {
  return (
    <div className="wrapper">
      <h1 className="text-4xl text-center font-bold mb-10">Write a post</h1>
      <Form>
        <Input type="text" placeholder="Title" />
        <Input type="text" placeholder="Description" />
        <textarea
          name=""
          id=""
          placeholder="Tell your story..."
          className="h-44 py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-transparent focus:border focus:border-red-400/70"
        />
        <SubmitButton>Publish</SubmitButton>
      </Form>
    </div>
  );
};

export default BlogForm;
