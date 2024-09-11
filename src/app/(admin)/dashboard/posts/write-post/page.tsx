import WritePostForm from "@/components/shared/WritePostForm";
import { auth } from "@clerk/nextjs/server";

import React from "react";

export default async function WritePost() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    return null;
  }

  return (
    <section>
      <div className="wrapper">
        <WritePostForm />
      </div>
    </section>
  );
}
