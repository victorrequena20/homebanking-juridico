import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import FundMapping from "@/modules/administracion/organizacion/components/FundMapping";
import ButtonBack from "@/components/ButtonBack";

export default function MapeoDeFondos() {
  return (
    <Wrapper>
      <Stack sx={{ width: "100%" }}>
        <Breadcrumbs
          title="Mapeo de fondos"
          items={[
            {
              title: "Inicio",
              href: "/dashboard",
            },
            { title: "Administración" },
            { title: "Organización", href: "/administracion/organizacion" },
            { title: "Mapeo de fondos" },
          ]}
        />

        <Stack sx={{ mt: 3 }}>
          <ButtonBack />
        </Stack>

        <Stack sx={{ alignItems: "center" }}>
          <FundMapping />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
