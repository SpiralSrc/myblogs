import EditPostForm from "@/components/shared/EditPostForm";
import WritePostForm from "@/components/shared/WritePostForm";
import { checkRole } from "@/lib/utils/roles";
import { notFound } from "next/navigation";

import React from "react";

export default async function WritePost() {
  if (!checkRole("admin")) {
    return notFound();
  }

  return (
    <section>
      <div className="wrapper">
        <EditPostForm />
      </div>
    </section>
  );
}
