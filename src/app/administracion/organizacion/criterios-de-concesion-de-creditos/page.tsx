import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function CreitreiosDeConcesionDeCreditosPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Criterios de concesión de créditos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Criterios de concesión de créditos" },
        ]}
      />
    </Wrapper>
  );
}
