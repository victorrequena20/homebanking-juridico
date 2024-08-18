import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function GestionVentanillasCajeros() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Gestión de ventanillas y cajeros"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Gestión de ventanillas y cajeros" },
        ]}
      />
    </Wrapper>
  );
}
