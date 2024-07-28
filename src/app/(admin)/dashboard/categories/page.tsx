import Link from "next/link";

export default function page() {
  return (
    <div className="wrapper">
      <h1 className="text-5xl font-bold text-center font-sacramento">
        Categories
      </h1>
      <div className="w-full flex flex-col">
        <Link
          href={"/dashboard/categories/add-category"}
          className="self-end"
        >
          Add Category
        </Link>
        <div>
          <p>Lists of categories...</p>
        </div>
      </div>
    </div>
  );
}
