"use client";

import { useFormState } from "react-dom";
import Form from "../reusable_ui/Form";
import Input from "../reusable_ui/Input";
import { createPost, deleteImage } from "@/actions/action";
import {
  StringMap,
  ValidationResponse,
} from "@/lib/validationResponseType";
import { useState } from "react";
import SubmitButton from "../reusable_ui/SubmitButton";
import { CloudUpload, Trash2, X } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { postSchema } from "@/lib/validation";

// const initialState: ValidationResponse<StringMap> = {};

const post: any = {};

const CreatePostForm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lastResult, action] = useFormState(createPost, undefined);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<any>("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc, setDesc] = useState("");

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  //cloudinary image delete
  const handleImageDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const publicId = imageUrl?.public_id;
      // ||
      // post?.imageUrl?.split("/").slice(-2).join("/").split(".")[0];
      if (publicId) {
        await deleteImage(publicId);

        // if (post) {
        //   await removePostImage(post.id); // Update the database to remove the image URL
        //   setImageUrl(""); // Clear the image URL from state
        //   router.refresh();
        // }
      }
      setImageUrl("");
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  //Adding/Deleting Tags
  const addTag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (tagInput.trim() !== "") {
      setTags((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };

  const deleteTag = (id: number) => {
    setTags((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-10">
        Write a post
      </h1>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="w-3/4 mx-auto my-5 border border-red-400/70 rounded-xl flex flex-col gap-4 px-5 pt-16 pb-10"
      >
        <Input
          type="hidden"
          key={fields.imageUrl.key}
          name={fields.imageUrl.name}
          defaultValue={fields.imageUrl.initialValue}
          value={imageUrl.secure_url || ""}
          placeholder=""
        />
        <div className="w-full flex flex-col gap-5 justify-start items-start">
          <CldUploadWidget
            uploadPreset="rae-blog"
            options={{
              autoMinimize: true,
            }}
            onSuccess={(result, { widget }) => {
              setImageUrl(result?.info); // { public_id, secure_url, etc }

              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  onClick={() => open()}
                  className="relative cursor-pointer w-64 h-64 overflow-hidden rounded-xl flex justify-center items-center border border-teal-500/20"
                >
                  {imageUrl?.secure_url || post?.imageUrl ? (
                    <CldImage
                      src={imageUrl.secure_url || post?.imageUrl}
                      fill
                      alt="Product image"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <CloudUpload />
                      <button>Upload Image</button>
                    </div>
                  )}
                  {(imageUrl?.secure_url || post?.imageUrl) && (
                    <Trash2
                      size={25}
                      onClick={handleImageDelete}
                      className="absolute top-1 right-1 text-red-600 hover:fill-red-600/40 hover:shadow-lg z-10"
                    />
                  )}
                </div>
              );
            }}
          </CldUploadWidget>
        </div>

        <Input
          type="text"
          key={fields.title.key}
          name={fields.title.name}
          defaultValue={fields.title.initialValue}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <p className="text-red-500 text-sm">{fields.title.errors}</p>
        <Input
          type="text"
          key={fields.desc.key}
          name={fields.desc.name}
          defaultValue={fields.desc.initialValue}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          placeholder="Short description"
        />
        <p className="text-red-500 text-sm">{fields.desc.errors}</p>

        <div className="w-full flex flex-row gap-2">
          {tags &&
            tags.map((tag, i) => {
              return (
                <div
                  key={i}
                  className="relative flex py-1 pl-1 pr-4 bg-red-400/70 rounded-md"
                >
                  <p>{tag}</p>
                  <X
                    size={15}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      deleteTag(i);
                    }}
                    className="absolute top-0 right-0 rounded-md bg-red-300 text-red-500/50 hover:text-red-500"
                  />
                </div>
              );
            })}
        </div>

        <div className="w-1/2 flex justify-center items-center gap-1">
          <Input
            type="hidden"
            value={tags as any}
            key={fields.tags.key}
            name={fields.tags.name}
            defaultValue={fields.tags.initialValue as any}
            placeholder="Tags"
            // onChange={(e) => setTags(e.target.value)}
          />
          <Input
            type="text"
            name=""
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag..."
          />
          <SubmitButton onClick={addTag}>Add</SubmitButton>
        </div>

        <select
          key={fields.category.key}
          name={fields.category.name}
          defaultValue={fields.category.initialValue}
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
          className="py-2 px-5 rounded-xl border border-red-400/70 bg-red-400/70 transition-all focus:outline-none hover:text-red-400/70 hover:bg-red-200"
        >
          <option value="">Choose a category...</option>
          {/* {categories
            ? categories.map((category: any) => (
                <option
                  key={category._id}
                  value={category._id.toString()}
                >
                  {category.name}
                </option>
              ))
            : ""} */}
          {children}
        </select>
        <p className="text-red-500 text-sm">
          {fields.category.errors}
        </p>

        <textarea
          required
          key={fields.content.key}
          name={fields.content.name}
          defaultValue={fields.content.initialValue}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-44 py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-transparent focus:border focus:border-red-400/70"
        ></textarea>
        <p className="text-red-500 text-sm">
          {fields.content.errors}
        </p>

        <SubmitButton>Publish</SubmitButton>
      </form>
    </div>
  );
};
export default CreatePostForm;
