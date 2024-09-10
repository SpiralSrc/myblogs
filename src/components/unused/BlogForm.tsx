// "use client";

// import React, { useState } from "react";
// import Form from "../reusable_ui/Form";
// import Input from "../reusable_ui/Input";
// import SubmitButton from "../reusable_ui/SubmitButton";
// import { CategorySchema, PostSchema } from "@/lib/validation";
// import { createPost, deleteImage } from "@/actions/action";
// import { CldImage, CldUploadWidget } from "next-cloudinary";
// import { CloudUpload, Trash2, X } from "lucide-react";

// type AddPostProps = {
//   categories?: CategorySchema | undefined;
//   post?: PostSchema | undefined;
// };

// const BlogForm: React.FC<AddPostProps> = ({ post }) => {
//   const [title, setTitle] = useState(post?.title || "");
//   const [desc, setDesc] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState("");
//   const [category, setCategory] = useState("");
//   const [imageUrl, setImageUrl] = useState<any>("");

//   const handleFormSubmit = async (formData: FormData) => {
//     formData.set("imageUrl", imageUrl?.secure_url || imageUrl || "");
//     formData.getAll("tags");

//     // const result = post && (await createPost(formData));
//   };

//   //cloudinary image delete
//   const handleImageDelete = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       const publicId =
//         imageUrl?.public_id ||
//         post?.imageUrl?.split("/").slice(-2).join("/").split(".")[0];
//       if (publicId) {
//         await deleteImage(publicId);
//         // if (post) {
//         //   await removePostImage(post.id); // Update the database to remove the image URL
//         //   setImageUrl(""); // Clear the image URL from state
//         //   router.refresh();
//         // }
//       }
//     } catch (error) {
//       console.error("Failed to delete image:", error);
//     }
//   };

//   //Adding/Deleting Tags
//   const addTag = (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     e.preventDefault();

//     if (tagInput.trim() !== "") {
//       setTags((prev) => [...prev, tagInput]);
//       setTagInput("");
//     }
//   };

//   const deleteTag = (id: number) => {
//     setTags((prev) => prev.filter((_, i) => i !== id));
//   };

//   return (
//     <div>
//       <h1 className="text-4xl text-center font-bold mb-10">
//         Write a post
//       </h1>
//       <Form>
//         <Input
//           type="hidden"
//           name="imageUrl"
//           value={imageUrl.secure_url || ""}
//           onChange={(e) => setImageUrl(e.target.value)}
//           placeholder=""
//         />
//         <div className="w-full flex flex-col gap-5 justify-start items-start">
//           <CldUploadWidget
//             uploadPreset="essencia"
//             options={{
//               autoMinimize: true,
//             }}
//             onSuccess={(result, { widget }) => {
//               setImageUrl(result?.info); // { public_id, secure_url, etc }

//               widget.close();
//             }}
//           >
//             {({ open }) => {
//               return (
//                 <div
//                   onClick={() => open()}
//                   className="relative cursor-pointer w-64 h-64 overflow-hidden rounded-xl flex justify-center items-center border border-teal-500/20"
//                 >
//                   {imageUrl?.secure_url || post?.imageUrl ? (
//                     <CldImage
//                       src={imageUrl.secure_url || post?.imageUrl}
//                       fill
//                       alt="Product image"
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="flex flex-col justify-center items-center gap-2">
//                       <CloudUpload />
//                       <button>Upload Image</button>
//                     </div>
//                   )}
//                   {(imageUrl?.secure_url || post?.imageUrl) && (
//                     <Trash2
//                       size={25}
//                       onClick={handleImageDelete}
//                       className="absolute top-1 right-1 text-red-600 hover:fill-red-600/40 hover:shadow-lg z-10"
//                     />
//                   )}
//                 </div>
//               );
//             }}
//           </CldUploadWidget>
//         </div>
//         <Input
//           type="text"
//           name="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//         />
//         <Input
//           type="text"
//           name="desc"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           placeholder="Description"
//         />
//         <div className="w-full flex flex-row gap-2">
//           {tags &&
//             tags.map((tag, i) => {
//               return (
//                 <div
//                   key={i}
//                   className="relative flex py-1 pl-1 pr-4 bg-red-400/70 rounded-md"
//                 >
//                   <p>{tag}</p>
//                   <X
//                     size={15}
//                     onClick={(e: any) => {
//                       e.stopPropagation();
//                       deleteTag(i);
//                     }}
//                     className="absolute top-0 right-0 rounded-md bg-red-300 text-red-500/50 hover:text-red-500"
//                   />
//                 </div>
//               );
//             })}
//         </div>
//         <div className="w-1/2 flex justify-center items-center gap-1">
//           <Input
//             type="text"
//             name="tags"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             placeholder="Add a tag..."
//           />
//           <SubmitButton onClick={addTag}>Add</SubmitButton>
//         </div>

//         <textarea
//           name="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Tell your story..."
//           className="h-44 py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-transparent focus:border focus:border-red-400/70"
//         />
//         <select
//           name="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="py-2 px-5 rounded-xl border border-red-400/70 bg-red-400/70 transition-all focus:outline-none hover:text-red-400/70 hover:bg-red-200"
//         >
//           <option value="">Choose category...</option>
//         </select>
//         <SubmitButton>Publish</SubmitButton>
//       </Form>
//     </div>
//   );
// };

// export default BlogForm;
