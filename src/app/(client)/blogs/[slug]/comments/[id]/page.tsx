// import { prisma } from "@/lib/prismadb";

// export default async function SingleCommentPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = params.id;

//   const comment = await prisma.comment.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: {
//         select: {
//           firstName: true,
//           lastName: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   return <div>page</div>;
// }
