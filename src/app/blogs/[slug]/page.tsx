import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { kimbieDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import CopyButton from "@/components/shared/CopyButton";
import Link from "next/link";
import Image from "next/image";
import RightSideBar from "@/components/shared/RightSideBar";

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
    <div className="w-full md:w-[90%] lg:w-[85%] mx-auto text-[9.5px] xs:text-[12px] sm:text-sm lg:text-[15px]">
      <div>
        <CopyButton code={String(children).replace(/\n$/, "")} />
      </div>

      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        showLineNumbers
        showInlineLineNumbers
        wrapLines
        wrapLongLines
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
    <>
      <div className="w-full h-[25vh] relative">
        <Image
          src={post.category.imageUrl}
          alt={post.category.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="wrapper">
        <div className="w-full h-full flex flex-col lg:flex-row md:gap-2 gap-10">
          <div className="w-full lg:w-[80%]">
            <h1 className="text-5xl font-bold text-center font-sacramento capitalize mt-10">
              {post?.title}
            </h1>
            <div className="flex flex-col justify-center items-center gap-5 mt-10">
              <div>
                <Link
                  href={`/categories/${post.category.slug}`}
                  className="cat"
                >
                  {post.category.name}
                </Link>
              </div>
              <div className="flex gap-5">
                {post?.tags.map((tag) => {
                  return (
                    <Link
                      href={`/tags/${tag.name}`}
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
                className="w-full mx-auto max-w-none prose prose-stone post-body"
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
          <div className="w-full lg:w-[20%]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
