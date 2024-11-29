"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import { useParams } from "next/navigation";
import RunReportForm from "@/modules/flujo-de-aprobacion/components/RunReportForm";

export default function RunReportsPage() {
  const params = useParams();
  const decodeUri = decodeURIComponent(params?.reportName?.toString());
  console.warn(params);
  return (
    <Wrapper>
      <Breadcrumbs
        title={`Flujos de Aprobación -> ${decodeUri}`}
        items={[{ title: "Inicio", href: "/dashboard" }, { title: `Flujos de Aprobación -> ${decodeUri}` }]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ alignItems: "center" }}>
        <RunReportForm params={params} />
      </Stack>
    </Wrapper>
  );
}
