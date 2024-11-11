import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";
import React, { Suspense } from "react";

export default function layout({ children }: any) {
  return (
    <Suspense fallback={<AuthenticatedLayout>
      {children}</AuthenticatedLayout>}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>;
    </Suspense>
  );
}
