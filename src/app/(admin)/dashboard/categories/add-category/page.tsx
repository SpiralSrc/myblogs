import CategoryForm from "@/components/shared/CategoryForm";
import { auth } from "@clerk/nextjs/server";

export default function AddCategory() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    return null;
  }

  return (
    <section>
      <div className="wrapper min-h-screen flex justify-center">
        <CategoryForm />
      </div>
    </section>
  );
}
