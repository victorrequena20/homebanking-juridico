import React from "react";
import ClientDetailsLayout from "@/components/Layouts/ClientDetailsLayout";

export default function layout({ children }: any) {
  return <ClientDetailsLayout>{children}</ClientDetailsLayout>;
}
