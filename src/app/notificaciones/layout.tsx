import React, { Suspense } from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";
import Loader from "@/components/Loader";

export default function layout({ children }: any) {
  return (
    <Suspense fallback={<AuthenticatedLayout>{children}</AuthenticatedLayout>}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>;
    </Suspense>
  );
}
