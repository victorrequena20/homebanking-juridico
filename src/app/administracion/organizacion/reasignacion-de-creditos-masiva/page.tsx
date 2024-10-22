"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import MassiveCreditReallocationForm from "@/modules/administracion/organizacion/components/MassiveCreditReallocationForm";
import { Stack } from "@mui/material";

export default function ReasignacionDeCreditosMasivaPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Reasignación de créditos masiva"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Reasignación de créditos masiva" },
        ]}
      />

      <Stack sx={{ alignItems: "center" }}>
        <MassiveCreditReallocationForm />
      </Stack>
    </Wrapper>
  );
}
