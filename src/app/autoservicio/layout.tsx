import React, { Suspense } from "react";
import AuthenticatedLayout from "@/components/Layouts/Authenticated.layout";
import { Box } from "@mui/material";
import Head from "next/head";
import Loader from "@/components/Loader";

export default function layout({ children }: any) {
  return (
    <Box>
      <Head>
        <title>SL BDC</title>
      </Head>
      <Suspense fallback={<Loader size="40" color="#484848" />}>
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </Suspense>
    </Box>
  );
}
