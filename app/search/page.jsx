import Search from "@/components/pages/Search";
import PrivateRoute from "@/components/PrivateRoute";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <PrivateRoute>
        <Search />
      </PrivateRoute>
    </Suspense>
  );
}
