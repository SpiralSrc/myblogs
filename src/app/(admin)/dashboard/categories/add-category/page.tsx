import CategoryForm from "@/components/shared/CategoryForm";
import { checkRole } from "@/lib/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default function AddCategory() {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <section>
      <div className="wrapper min-h-screen flex justify-center">
        <CategoryForm />
      </div>
    </section>
  );
}
