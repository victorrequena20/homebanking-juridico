import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateRoleForm from "@/modules/administracion/sistema/components/CreateRolForm/CreateRoleForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";

export default function CreateFund() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear rol"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar roles y permisos", href: "/administracion/sistema/roles-permisos" },
          { title: "Crear rol" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <CreateRoleForm />
    </Wrapper>
  );
}
