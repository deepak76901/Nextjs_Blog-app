import PostPage from "@/components/pages/PostPage";
import PrivateRoute from "@/components/PrivateRoute";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <PrivateRoute>
      <PostPage />
      </PrivateRoute>
    </Suspense>
  );
}
