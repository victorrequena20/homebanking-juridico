import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import RunReportForm from "@/modules/reportes/components/RunReportForm";

export default function RunReportsPage() {
  return (
    <Wrapper>
      <Breadcrumbs title="Reportes" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Reportes" }]} />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ alignItems: "center" }}>
        <RunReportForm />
      </Stack>
    </Wrapper>
  );
}
