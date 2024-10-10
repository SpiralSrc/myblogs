"use client";

import Form from "@/components/reusable_ui/Form";
import Input from "@/components/reusable_ui/Input";
import { updatePost } from "@/actions/action";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/reusable_ui/SubmitButton";
import CategoryList from "@/components/shared/CategoryList";
import { Check, Eye, X } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { kimbieDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import gfm from "remark-gfm";
import CopyButton from "@/components/shared/CopyButton";
import { useUser } from "@clerk/nextjs";
import { Post as PostData, Category, Tag } from "@prisma/client";

interface PostWithRelations extends PostData {
  category: Category;
  tags: Tag[];
}

interface PostProps {
  post: PostWithRelations;
}

const CodeBlock = ({ children, className, node, ...rest }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <div className="w-[90%] mx-auto">
      <div>
        <CopyButton code={String(children).replace(/\n$/, "")} />
      </div>

      <SyntaxHighlighter
        {...rest}
        showLineNumbers
        PreTag="div"
        language={match[1]}
        style={kimbieDark}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

// Custom Table component
const TableDiv = ({ children, ...props }: any) => {
  return (
    <div className="max-w-[60%] flex mx-auto">
      <table {...props}>{children}</table>
    </div>
  );
};

const EditPostForm = ({ post }: PostProps) => {
  const { isLoaded } = useUser();

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState(post?.category.name);
  const [title, setTitle] = useState(post?.title);
  const [desc, setDesc] = useState(post?.desc);
  const [content, setContent] = useState(post?.content);
  const [isPublished, setIsPublished] = useState(post?.isPublished);

  const [preview, setPreview] = useState(false);

  //   useEffect for tags from database

  useEffect(() => {
    {
      post ? setTags(post.tags.map((tag: any) => tag.name)) : null;
    }
  }, [post]);

  if (!isLoaded) {
    return "Loading...";
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set("title", title || post.title);
    formData.set("desc", desc || post.desc);
    formData.set("content", content || post.content);
    formData.set("category", category || post.category.name);
    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });
    formData.set("isPublished", isPublished ? "true" : "false");

    try {
      {
        await updatePost(post.slug, formData);
      }
    } catch (error) {
      console.error(error);
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

  // const deleteTag = (id: number) => {
  //   setTags((prev) => prev.filter((_, i) => i !== id));
  // };

  const deleteTag = (id: number) => {
    setTags((prev) => {
      const newTags = prev.filter((_, i) => i !== id);
      // Update the post object with the new tags
      const updatedPost = { ...post, tags: newTags };
      return newTags;
    });
  };

  return (
    <>
      <div className="relative">
        {/* ----- Preview Button ----- */}
        <div className="absolute top-10 right-5 flex gap-1 cursor-pointer">
          {!preview ? (
            <span
              className={
                "cursor-pointer py-1 rounded-lg pr-2 flex gap-2 justify-center items-center border border-transparent smooth-effect pl-1 text-secondary/90 hover:text-pink-400/70 hover:border-pink-400/20 hover:bg-red-300/20"
              }
              onClick={() => setPreview(true)}
            >
              <Eye /> Preview
            </span>
          ) : (
            <span
              onClick={() => setPreview(false)}
              className="close-btn cursor-pointer py-1 rounded-lg pr-2 bg-pink-400/5 flex gap-2 justify-center items-center text-pink-400/70"
            >
              <X className="p-1" />
              Close Preview
            </span>
          )}
        </div>

        {!preview ? (
          <div className="flex w-full flex-col">
            <h1 className="text-4xl text-center font-bold mb-10">
              Write/Edit a Post
            </h1>
            <div className="line mb-10"></div>
            <Form
              action={handleSubmit}

              // className="w-3/4 mx-auto my-5 border border-red-400/70 rounded-xl flex flex-col gap-4 px-5 pt-16 pb-10"
            >
              {/* ----- ispublished switch ----- */}
              <Input
                type="hidden"
                name="isPublished"
                value={isPublished ? "true" : "false"}
                placeholder="Publish?"
              />
              <div className="flex flex-row gap-3 justify-end items-center">
                <span>Publish Post?</span>
                <div
                  className="text-pink-500/80 rounded-md border border-red-400/70"
                  onClick={() => setIsPublished((prev: any) => !prev)}
                >
                  <Check
                    className={`text-pink-400/70 p-1 font-bold && ${
                      isPublished
                        ? "opacity-100 bg-red-300/20"
                        : "opacity-0"
                    }`}
                  />
                </div>
              </div>
              <Input
                type="text"
                name="title"
                defaultValue={post?.title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
              <textarea
                name="desc"
                defaultValue={post?.desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Short description..."
                className="w-full py-2 pl-3 bg-zinc-100/95 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
              />

              <div className="w-full flex flex-row gap-2">
                {tags &&
                  tags.map((tag, i) => (
                    <div
                      key={i}
                      className="relative flex py-1 pl-1 pr-4 bg-red-400/70 rounded-md"
                    >
                      <span>{tag}</span>
                      <X
                        size={15}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          deleteTag(i);
                        }}
                        className="absolute top-0 right-0 rounded-md bg-red-300 text-red-500/50 hover:text-red-500"
                      />
                    </div>
                  ))}
              </div>

              <div className="w-1/2 flex justify-center items-center gap-1">
                <Input
                  type="text"
                  name="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                />
                <SubmitButton onClick={addTag}>Add</SubmitButton>
              </div>

              <select
                name="category"
                defaultValue={post?.category.name}
                onChange={(e) => setCategory(e.target.value)}
                className="py-2 px-5 rounded-xl border border-red-400/70 bg-red-400/70 transition-all focus:outline-none hover:text-red-400/70 hover:bg-red-200"
              >
                {post ? (
                  <option value="">{post?.category.name}</option>
                ) : (
                  <option value="">Choose category...</option>
                )}

                <CategoryList />
              </select>
              {/* <p className="text-red-500 text-sm">
          {fields.category.errors}
        </p> */}

              <textarea
                required
                name="content"
                defaultValue={post?.content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[60vh] flex py-2 pl-3 pr-2 bg-zinc-100/95 text-slate-500 rounded-xl focus:outline-none focus:ring-transparent focus:border focus:border-red-400/70"
              ></textarea>

              {/* <p className="text-red-500 text-sm">
          {fields.content.errors}
        </p> */}

              <SubmitButton>Publish</SubmitButton>
            </Form>
          </div>
        ) : (
          <div className="wrapper">
            <h1 className="text-5xl font-bold text-center font-sacramento capitalize mt-10">
              {title}
            </h1>
            <div className="line"></div>
            <div className="flex flex-col justify-center items-center gap-5 mt-10">
              {category && (
                <div>
                  <span className="cat">{category}</span>
                </div>
              )}

              <div className="flex gap-5">
                {tags &&
                  tags.map((tag) => (
                    <span key={tag} className="text-secondary/90">
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* ------ Content ------ */}

            <div className="p-2 mt-10">
              <ReactMarkdown
                components={{ code: CodeBlock, table: TableDiv }}
                remarkPlugins={[gfm]}
                className="w-[98%] mx-auto max-w-none prose prose-stone post-body"
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default EditPostForm;
