import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";
import React from "react";

export default function layout({ children }: any) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
