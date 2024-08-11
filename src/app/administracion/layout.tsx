import React from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";

export default function layout({ children }: any) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
