import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { kimbieDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import CopyButton from "@/components/shared/CopyButton";
import Link from "next/link";

interface PostProps {
  params: {
    slug: string;
    name: string;
  };
}

const getSinglePost = cache(async (slug: string) => {
  const tag = await prisma.post.findFirst({
    where: { slug },
    include: {
      category: true,
      tags: true,
      comments: true,
      likes: true,
    },
  });

  if (!tag) notFound();

  return tag;
});

export async function generateMetadata({
  params: { slug },
}: PostProps): Promise<Metadata> {
  const post = await getSinglePost(slug);

  return {
    title: post.title + " - Tags",
    description: `Posts related to ${post.title}`,
  };
}

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
  const id = params.slug;

  const post = await getSinglePost(id);

  return (
    <div className="wrapper">
      <h1 className="text-5xl font-bold text-center font-sacramento capitalize mt-10">
        {post?.title}
      </h1>
      <div className="flex justify-center items-center gap-5 mt-10">
        {post?.tags.map((tag) => {
          return (
            <Link
              href={`/dashboard/tags/${tag.name}`}
              key={tag.id}
              className="py-2 px-3 bg-pink-500/20 rounded-md"
            >
              {tag.name}
            </Link>
          );
        })}
      </div>
      <div className="p-2 mt-10">
        <ReactMarkdown
          components={{ code: CodeBlock }}
          className="w-[98%] mx-auto max-w-none prose prose-stone post-body"
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
