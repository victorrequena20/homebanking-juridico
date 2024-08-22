"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import CreateCenterForm from "@/modules/institucion/centers/components/CentrosForm/CentrosForm";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";

export default function CreateCenterPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear centro"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Centros", href: "/institucion/centros" },
          { title: "Crear centro" },
        ]}
      />
      <Stack sx={{ mt: 2 }}>
        <ButtonBack />
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <CreateCenterForm />
      </Stack>
    </Wrapper>
  );
}
