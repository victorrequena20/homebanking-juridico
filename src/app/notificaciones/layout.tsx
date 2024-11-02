import React, { Suspense } from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";
import Loader from "@/components/Loader";

export default function layout({ children }: any) {
  return (
    <Suspense fallback={<Loader size="40" color="#484848" />}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>;
    </Suspense>
  );
}
