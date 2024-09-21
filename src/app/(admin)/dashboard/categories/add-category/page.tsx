import CategoryForm from "@/components/admin/categories/CategoryForm";
import { checkRole } from "@/lib/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default function AddCategory() {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <section>
      <div>
        <CategoryForm />
      </div>
    </section>
  );
}
