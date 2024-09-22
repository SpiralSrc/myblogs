"use client";

import { fetchUrl } from "@/lib/utils/utils";
import { useEffect } from "react";

const ReportViews = ({ slug }: { slug: string }) => {
  useEffect(() => {
    const postView = async () => {
      try {
        console.log(
          `Sending POST request to ${fetchUrl} with slug: ${slug}`
        );
        await fetch(fetchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    postView();
  }, [slug]);
  return <></>;
};
export default ReportViews;
