import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonBack from "@/components/ButtonBack";
import Wrapper from "@/components/Wrapper";
import CreateDataTableForm from "@/modules/administracion/sistema/components/CreateDataTableForm";
import { Stack } from "@mui/material";
import React from "react";

export default function CreateDataTablePage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear tabla de datos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar tablas de datos", href: "/administracion/sistema/administrar-tablas-de-datos" },
          { title: "Crear tabla de datos" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ alignItems: "center" }}>
        <CreateDataTableForm />
      </Stack>
    </Wrapper>
  );
}
