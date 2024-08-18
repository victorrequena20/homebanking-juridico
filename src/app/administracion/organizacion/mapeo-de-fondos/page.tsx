import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function MapeoDeFondos() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
