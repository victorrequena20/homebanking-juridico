import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonBack from "@/components/ButtonBack";
import Wrapper from "@/components/Wrapper";
import CashierForm from "@/modules/administracion/organizacion/components/CreateCashierForm/CreateCashierForm";
import { Stack } from "@mui/material";
import React from "react";

export default function CreateCashier() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear cajero"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          {
            title: "Gestión de ventanillas y cajeros",
            href: "/administracion/organizacion/gestion-ventanillas-cajeros",
          },
          { title: "Crear cajero" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <CashierForm />
      </Stack>
    </Wrapper>
  );
}
