import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateOfficeForm from "@/modules/administracion/organizacion/components/CreateOfficeForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";

export default function CreateFund() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear oficina"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar oficinas", href: "/administracion/organizacion/administrar-oficinas" },
          { title: "Crear oficina" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <CreateOfficeForm />
    </Wrapper>
  );
}
