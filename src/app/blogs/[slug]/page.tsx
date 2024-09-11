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
// import CommentForm from "@/components/shared/CommentForm";
import { User } from "lucide-react";

interface PostProps {
  params: {
    id?: string;
    slug: string;
    name: string;
  };
}

const getSinglePost = cache(async (slug: string) => {
  const post = await prisma.post.findFirst({
    where: { slug },
    include: {
      category: true,
      tags: true,
      comments: {
        include: {
          user: {
            // only select what info you need for the client side
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
              replyToComments: true,
            },
          },
        },
      },
      likes: true,
    },
  });

  if (!post) notFound();

  return post;
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
      <div className="w-full h-[25vh] lg:h-[35vh] xl:h-[38vh] relative">
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
            <div className="line"></div>
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
                      className="tag"
                    >
                      #{tag.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="p-2 mt-10 mb-20">
              <ReactMarkdown
                components={{ code: CodeBlock }}
                className="w-full mx-auto max-w-none prose prose-stone post-body"
              >
                {post.content}
              </ReactMarkdown>
            </div>
            <div className="line mt-5"></div>
            <div className="mt-10 w-full flex flex-col">
              <h3 className="text-left font-bold text-xl mt-10">
                Write a Comment
              </h3>
              {/* <CommentForm post={post} /> */}
              {/* Fetched comment below */}
              <div className="w-full  flex flex-col gap-2">
                {post.comments &&
                  post.comments.map((item) => (
                    <div
                      key={item.id}
                      className="w-[95%] mx-auto mt-5 flex flex-col justify-center items-start"
                    >
                      <div className="flex gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden flex justify-center items-center">
                          {item.user?.avatar ? (
                            <Image
                              src={item.user?.avatar}
                              sizes="100%"
                              alt="user avatar"
                              className="object-cover"
                            />
                          ) : (
                            <User className="w-full h-full p-1 bg-slate-400/50" />
                          )}
                        </div>
                        <h4 className="font-bold">
                          {item.user?.firstName} {item.user?.lastName}
                        </h4>
                      </div>
                      <div className="w-[95%] mx-auto mt-2">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
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
