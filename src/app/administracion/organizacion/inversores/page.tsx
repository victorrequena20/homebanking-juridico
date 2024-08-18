import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function Inversores() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Inversores"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Inversores" },
        ]}
      />
    </Wrapper>
  );
}
