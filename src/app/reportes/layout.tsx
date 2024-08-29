import React from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";

export default function layout({ children }: any) {
  return (
    <div>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </div>
  );
}
