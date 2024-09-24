import BlogList from "@/components/BlogList";
import AboutBlog from "@/components/client/about/AboutBlog";
import Hero from "@/components/shared/Hero";

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  return (
    <>
      <Hero />
      {query && (
        <div className="w-96 absolute top-16 right-[40%] z-30 flex rounded-md overflow-y-scroll">
          <BlogList query={query} />
        </div>
      )}
      <div className="wrapper mb-20">
        <div className="w-full flex">
          {/* Left */}
          <div className="w-full flex flex-col justify-center items-center">
            <h1>SpiralSrc Blogs</h1>
            <div className="line mb-10"></div>

            {/* ----- About Content ------ */}

            <AboutBlog />
            <div className="line my-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}
