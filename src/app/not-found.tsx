import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="wrapper w-full h-full justify-center items-center">
        <div className="leading-8">
          <h2 className="text-xl font-bold">Page Not Found</h2>
          <p>Could not find requested resource</p>
          <Link
            href="/"
            className="text-blue-700/60 hover:text-blue-700 hover:underline underline-offset-2 smooth-effect"
          >
            Return to homepage...
          </Link>
        </div>
      </div>
    </div>
  );
}
