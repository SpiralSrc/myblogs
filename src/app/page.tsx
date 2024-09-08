import BlogList from "@/components/BlogList";
import Hero from "@/components/home/Hero";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  return (
    <>
      <Hero />
      <div className="wrapper">
        <h1>Homepage</h1>
        <BlogList query={query} />
      </div>
    </>
  );
}
