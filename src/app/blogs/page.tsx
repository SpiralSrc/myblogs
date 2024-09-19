// import { prisma } from "@/lib/prismadb";

// export default async function BlogsPage() {
//   const posts = await prisma.post.findMany({
//     orderBy: {
//       title: "asc",
//     },
//     include: {
//       category: true,
//       tags: true,
//     },
//   });

//   return (
//     <div className="wrapper">
//       <h1>Blogs</h1>
//     </div>
//   );
// }
