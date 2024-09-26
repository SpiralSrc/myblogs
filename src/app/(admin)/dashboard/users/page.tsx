import { prisma } from "@/lib/prismadb";
import { checkRole } from "@/lib/utils/roles";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UsersPage() {
  if (!checkRole("admin")) {
    return notFound();
  }

  const users = await prisma.user.findMany({
    orderBy: {
      firstName: "asc",
    },
  });

  return (
    <div className="wrapper">
      <h1>Users Page</h1>
      <div className="line mb-10"></div>
      <div className="w-full h-full flex flex-col">
        {users?.length !== 0 ? (
          <table className="w-[95%] sm:w-3/4 mx-auto">
            <thead>
              <tr>
                <td className="flex-1">First Name</td>
                <td className="flex-1">Last Name</td>
                <td className="flex-1">Email</td>
                <td className="flex w-20 justify-end items-center">
                  Option
                </td>
              </tr>
            </thead>
            {users?.map((user) => (
              <tbody key={user.id}>
                <tr className="border-pink-400/5">
                  <td className="flex-1">{user.firstName}</td>
                  <td className="flex-1">{user.lastName}</td>
                  <td className="flex-1 truncate">{user.email}</td>
                  <td className="flex w-20 justify-end items-center gap-3">
                    <Link
                      href={`/dashboard/users/${user.clerkId}/delete`}
                    >
                      <Trash2
                        size={15}
                        className="text-red-300/20 hover:text-red-500 smooth-effect"
                      />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p>No users registered.</p>
          </div>
        )}
      </div>
    </div>
  );
}
