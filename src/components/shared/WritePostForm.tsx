"use client";

import Form from "../reusable_ui/Form";
import Input from "../reusable_ui/Input";
import { createPost } from "@/actions/action";
import { useState } from "react";
import SubmitButton from "../reusable_ui/SubmitButton";
import CategoryList from "./CategoryList";
import { Eye, X } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { kimbieDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import CopyButton from "./CopyButton";

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

const WritePostForm = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const [preview, setPreview] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set("title", title);
    formData.set("desc", desc);
    formData.set("content", content);
    formData.set("category", category);
    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    try {
      await createPost(formData);
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

  const deleteTag = (id: number) => {
    setTags((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <>
      <div className="relative">
        <span
          className={`absolute top-10 right-5 flex gap-1 ${
            !preview ? "text-secondary" : "text-secondary/50"
          }`}
          onClick={() => setPreview(!preview)}
        >
          <Eye /> Preview
        </span>
        {!preview ? (
          <div>
            <h1 className="text-4xl text-center font-bold mb-10">
              Write a post
            </h1>
            <Form
              action={handleSubmit}

              // className="w-3/4 mx-auto my-5 border border-red-400/70 rounded-xl flex flex-col gap-4 px-5 pt-16 pb-10"
            >
              <Input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
              <textarea
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Short description..."
                className="w-full py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
              />

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
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
                className="py-2 px-5 rounded-xl border border-red-400/70 bg-red-400/70 transition-all focus:outline-none hover:text-red-400/70 hover:bg-red-200"
              >
                <option value="">Choose a category...</option>

                <CategoryList />
              </select>
              {/* <p className="text-red-500 text-sm">
          {fields.category.errors}
        </p> */}

              <textarea
                required
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-44 py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-transparent focus:border focus:border-red-400/70"
              ></textarea>

              {/* <p className="text-red-500 text-sm">
          {fields.content.errors}
        </p> */}

              <SubmitButton>Publish</SubmitButton>
            </Form>
          </div>
        ) : (
          <div className="wrapper">
            <div>
              <h1 className="text-5xl font-bold text-center font-sacramento capitalize mt-10">
                {title}
              </h1>
              <div className="flex flex-col justify-center items-center gap-5 mt-10">
                {/* <div>
                  <span className="cat">{category}</span>
                </div> */}
                <div className="flex gap-5">
                  {tags.map((tag) => {
                    return (
                      <p key={tag} className="text-secondary/90">
                        #{tag}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <ReactMarkdown
              components={{ code: CodeBlock }}
              className="w-[98%] mx-auto max-w-none prose prose-stone post-body"
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
};
export default WritePostForm;
