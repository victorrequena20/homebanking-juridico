import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import CreatePaymentTypeForm from "@/modules/administracion/organizacion/components/CreatePaymentTypeForm";

export default function CreatePaymentType() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear tipo de pago"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Crear tipo de pago" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ alignItems: "center" }}>
        <CreatePaymentTypeForm />
      </Stack>
    </Wrapper>
  );
}
