import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import Button from "@/components/Button";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import ButtonBack from "@/components/ButtonBack";
import CreateFundForm from "@/modules/administracion/organizacion/components/CreateFundForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CreateFund() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear fondo"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar fondos", href: "/administracion/organizacion/administrar-fondos" },
          { title: "Crear fondo" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <CreateFundForm />
    </Wrapper>
  );
}
