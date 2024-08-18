import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PublicacionesFrecuentes() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Publicaciones frecuentes"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Publicaciones frecuentes" },
        ]}
      />
    </Wrapper>
  );
}
