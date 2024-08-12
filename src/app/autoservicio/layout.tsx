import React from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";

export default function layout({ children }: any) {
  return (
    <div>
      <head>
        <title>BDC - Gestión de usuarios</title>
      </head>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </div>
  );
}
