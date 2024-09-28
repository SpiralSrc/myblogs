import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { kimbieDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import CopyButton from "@/components/shared/CopyButton";
import Link from "next/link";
import { checkRole } from "@/lib/utils/roles";
import { Edit, Trash2 } from "lucide-react";

// code block
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

export default async function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!checkRole("admin")) {
    return notFound();
  }

  const slug = params.slug;

  const post = await prisma.post.findFirst({
    where: { slug },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      tags: true,
      comments: true,
      likes: true,
    },
  });

  if (!post) notFound();

  return (
    <div className="wrapper relative">
      <div className="absolute top-10 right-10 flex justify-center items-center gap-2">
        <Link href={`/dashboard/posts/${post.slug}/edit`}>
          <Edit
            size={18}
            className="text-teal-300/20 hover:text-teal-500 smooth-effect"
          />
        </Link>
        <Link
          href={`/dashboard/posts/${post.slug}/delete`}
          className=""
        >
          <Trash2
            size={18}
            className="text-red-300/20 hover:text-red-500 smooth-effect"
          />
        </Link>
      </div>

      <h1 className="mt-10">{post.title}</h1>
      <div className="line"></div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <div>
          <span className="cat">{post.category.name}</span>
        </div>
        <div className="flex gap-5">
          {post.tags.map((tag) => {
            return (
              <Link
                href={`/dashboard/tags/${tag.name}`}
                key={tag.id}
                className="text-secondary/90"
              >
                #{tag.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="p-2 mt-10">
        <ReactMarkdown
          components={{ code: CodeBlock }}
          className="w-[98%] mx-auto max-w-none prose prose-stone post-body"
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <div className="line mt-10"></div>
      <div className="w-full flex justify-between items-center mt-5">
        <Link href={"/dashboard"} className="btn">
          Back to Dashboard...
        </Link>
        <Link href={"/dashboard/posts"} className="btn">
          Back to Posts...
        </Link>
      </div>
    </div>
  );
}
