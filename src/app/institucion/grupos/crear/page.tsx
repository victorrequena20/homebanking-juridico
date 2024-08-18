import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import { Stack } from "@mui/material";
import CreateGroupForm from "@/modules/institucion/grupos/components/CreateGroupForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CrearGrupoPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Grupos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Grupos", href: "/institucion/grupos" },
          { title: "Crear grupo" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <CreateGroupForm />
      </Stack>
    </Wrapper>
  );
}
