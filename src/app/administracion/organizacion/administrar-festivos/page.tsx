import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrarFestivos() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar festivos"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar festivos" },
        ]}
      />
    </Wrapper>
  );
}
