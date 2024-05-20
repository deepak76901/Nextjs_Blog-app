import PostPage from "@/components/pages/PostPage";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <PostPage />
    </Suspense>
  );
}
