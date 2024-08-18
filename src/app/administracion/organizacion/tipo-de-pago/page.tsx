import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function TipoDePago() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Tipo de pago"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Tipo de pago" },
        ]}
      />
    </Wrapper>
  );
}
