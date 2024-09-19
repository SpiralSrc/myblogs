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
import CommentForm from "@/components/shared/CommentForm";
import ReplyForm from "@/components/shared/ReplyForm";
import { auth } from "@clerk/nextjs/server";
import LikePostButton from "@/components/shared/LikePostButton";
import DeleteComment from "@/components/shared/DeleteComment";
import DeleteReply from "@/components/shared/DeleteReply";
import BlogList from "@/components/BlogList";

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
              clerkId: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true,
                  clerkId: true,
                },
              },
            },
          },
        },
      },
      likes: {
        include: {
          user: {
            select: {
              clerkId: true,
            },
          },
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
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
    description: `Post is about ${post.title} which is related to ${post.category.name}.`,
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
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { query?: string };
}) {
  const { userId } = auth();

  const user = userId;

  const id = params.slug;

  const post = await getSinglePost(id);

  const query = searchParams?.query || "";

  return (
    <>
      {/* ----- Top Image ----- */}

      <div className="w-full h-[25vh] lg:h-[35vh] xl:h-[40vh] relative">
        <Image
          src={post.category.imageUrl}
          alt={post.category.name}
          fill
          className="object-cover"
        />
        <div className="img-overlay"></div>
      </div>

      {/* ----- Search Query Results ----- */}
      {query && (
        <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}

      {/* ----- Main body page ----- */}
      <div className="wrapper">
        <div className="w-full h-full flex flex-col lg:flex-row md:gap-2 gap-10">
          <div className="w-full lg:w-[80%] mx-auto flex flex-col">
            <h1>{post?.title}</h1>
            <div className="line"></div>

            {/* ----- Author Owner ------ */}

            <div className="w-[60%] mx-auto flex justify-between items-center gap-2 mt-3">
              {/* Author */}
              <div className="flex gap-2">
                <span className="text-sm text-secondary/90">by:</span>
                <div className="relative w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden flex justify-center items-center">
                  <div className="flex gap-2">
                    {post.user.avatar ? (
                      <Image
                        src={post.user.avatar}
                        sizes="100%"
                        fill
                        alt="user avatar"
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-full h-full p-1 bg-slate-400/50" />
                    )}
                  </div>
                </div>
                <h4 className="font-medium text-sm md:text-base">
                  {post.user.firstName} {post.user.lastName}
                </h4>
              </div>

              {/* ----- Like Button ----- */}

              <div className="flex justify-center items-center gap-2 my-2">
                <LikePostButton
                  slug={post.slug}
                  user={user}
                  likes={post.likes.map((like) => like.user.clerkId)}
                />

                <div className="flex gap-1 text-sm">
                  <span className="text-sm">{post.likes.length}</span>
                  <span className="text-sm">
                    {post.likes.length > 1 ? "Likes" : "Like"}
                  </span>
                </div>
              </div>
            </div>

            {/* ----- Category and Tags ----- */}

            <div className="flex flex-col justify-center items-center gap-3 mt-1">
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

            {/* ----- Blog Content ----- */}

            <div className="p-2 mt-10 mb-20">
              <ReactMarkdown
                components={{ code: CodeBlock }}
                className="w-full mx-auto max-w-none prose prose-stone post-body"
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* ----- Line Break ----- */}

            <div className="line mt-5"></div>

            {/* ----- Comments ----- */}

            <div className="w-[98%] mx-auto mt-10 lg:w-full flex flex-col">
              <h3 className="text-left font-bold text-lg lg:text-xl mt-10">
                Write a Comment
              </h3>

              {!user ? (
                <span className="text-sm italic mb-5">
                  *Please log in or sign up to post a comment
                </span>
              ) : null}

              {/* Comment Form */}

              {user ? (
                <CommentForm post={post} />
              ) : (
                <div className="w-full h-20 flex gap-2 justify-center items-center rounded-md bg-slate-500/5 backdrop-blur-md overflow-hidden shadow-inner">
                  <Link
                    href={"/sign-in"}
                    className="hover:text-blue-300/90 smooth-effect font-bold"
                  >
                    Login
                  </Link>
                  <span className="text-sm">or</span>
                  <Link
                    href={"/sign-up"}
                    className="hover:text-blue-300/90 smooth-effect font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Fetched comments below */}
              <div className="w-full  flex flex-col gap-2">
                {post.comments &&
                  post.comments.map((item) => (
                    <div
                      key={item.id}
                      className="w-[95%] mx-auto mt-5 flex flex-col justify-center items-start border border-secondary/20 py-3 p-3 rounded-lg"
                    >
                      {/* user */}
                      <div className="w-full flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="relative w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden flex justify-center items-center">
                            {item.user.avatar ? (
                              <Image
                                src={item.user.avatar}
                                sizes="100%"
                                fill
                                alt="user avatar"
                                className="object-cover"
                              />
                            ) : (
                              <User className="w-full h-full p-1 bg-slate-400/50" />
                            )}
                          </div>
                          <h4 className="font-medium text-sm md:text-base">
                            {item.user?.firstName}{" "}
                            {item.user?.lastName}
                          </h4>
                        </div>
                        {item.user.clerkId === user ? (
                          <div className="flex">
                            <DeleteComment id={item.id} />
                          </div>
                        ) : null}
                      </div>

                      {/* ----- Comment Text ----- */}
                      <div className="w-[95%] mx-auto mt-2 ">
                        <p className="mb-1">{item.text}</p>
                        {item.replies.length > 0 ? (
                          <div className="h-1 border-b border-secondary/20 mx-auto mb-3"></div>
                        ) : null}
                      </div>

                      {/* ----- Reply Button ----- */}
                      {user && (
                        <ReplyForm comment={item} slug={post.slug} />
                      )}

                      {/* ----- Fetched Replies ----- */}
                      <div className="w-[90%] mx-auto flex flex-col gap-2 mb-2">
                        {item.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-slate-500/5 py-2 p-2 rounded-lg"
                          >
                            {/* user */}
                            <div className="w-full flex justify-between items-center">
                              <div className="flex gap-2">
                                <div className="relative w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden flex justify-center items-center">
                                  {reply.user.avatar ? (
                                    <Image
                                      src={reply.user.avatar}
                                      sizes="100%"
                                      fill
                                      alt="user avatar"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <User className="w-full h-full p-1 bg-slate-400/50" />
                                  )}
                                </div>
                                <h4 className="font-medium text-sm md:text-base">
                                  {reply.user.firstName}{" "}
                                  {reply.user.lastName}
                                </h4>
                              </div>
                              {reply.user.clerkId === user ? (
                                <div className="flex">
                                  <DeleteReply id={reply.id} />
                                </div>
                              ) : null}
                            </div>

                            {/* Reply Text */}
                            <div className="w-[95%] mx-auto mt-2">
                              <p className="mb-1">{reply.text}</p>

                              {/* <div className="h-1 border-b border-secondary/20 mx-auto mb-2"></div> */}
                            </div>
                          </div>
                        ))}
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
