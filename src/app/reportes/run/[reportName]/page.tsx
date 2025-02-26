"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import RunReportForm from "@/modules/reportes/components/RunReportForm";
import { useParams } from "next/navigation";
import { reports } from "@/constants/global";
export default function RunReportsPage() {
  const params = useParams();
  const decodeUri = decodeURIComponent(params?.reportName?.toString());
  return (
    <Wrapper>
      <Breadcrumbs
        title={`Reportes -> ${reports?.find(item => item.id?.toString() == params?.reportName)?.fecha}`}
        items={[{ title: "Inicio", href: "/dashboard" }, { title: `Reportes -> ${decodeUri}` }]}
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
