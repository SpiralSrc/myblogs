import { checkRole } from "@/lib/utils/roles";
import { notFound } from "next/navigation";

export default async function page() {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <div className="wrapper">
      <h1>Admin Dashboard</h1>
    </div>
  );
}
