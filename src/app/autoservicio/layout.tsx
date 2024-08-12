import React from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";
import { Box } from "@mui/material";
import Head from "next/head";

export default function layout({ children }: any) {
  return (
    <Box>
      <Head>
        <title>SL BDC</title>
      </Head>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </Box>
  );
}
