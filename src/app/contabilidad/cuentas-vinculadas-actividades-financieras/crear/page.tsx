"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import CreateGlMappingForm from "@/modules/contabilidad/components/CreateGlAccountMapping/CreateGlAccountMapping";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";

export default function CreateGlAccountMappingPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Mapeos de actividades financieras"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Contabilidad" },
          {
            title: "Cuentas vinculadas a actividades financieras",
            href: "/contabilidad/cuentas-vinculadas-actividades-financieras",
          },
          { title: "Mapeos de actividades financieras", href: "/contabilidad" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <Stack alignItems="center">
        <CreateGlMappingForm />
      </Stack>
    </Wrapper>
  );
}
