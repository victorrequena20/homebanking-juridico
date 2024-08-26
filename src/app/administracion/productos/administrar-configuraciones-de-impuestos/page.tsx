import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import IntermediateMenuItem from "@/components/IntermediateMenuItem";
import OfficesIcon from "@/assets/icons/OfficesIcon";

export default function AdministrarConfiguracionesDeImpuestos() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar configuraciones de impuesto"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Administrar configuraciones de impuesto" },
        ]}
      />
      <Stack
        sx={{
          border: "1px solid transparent",
          mt: 5,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          gap: 3,
          maxWidth: "800px",
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <IntermediateMenuItem
            title="Gestionar componentes fiscales"
            subtitle="Definir impuestos"
            path="/administracion/productos/administrar-configuraciones-de-impuestos/gestionar-componentes-fiscales"
            icon={<OfficesIcon size={28} color="#153075" />}
          />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <IntermediateMenuItem
            title="Administrar grupos de impuestos"
            subtitle="Definir grupos de impuestos"
            path="/administracion/productos/administrar-configuraciones-de-impuestos/grupos-de-impuestos"
            icon={<OfficesIcon size={28} color="#153075" />}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
