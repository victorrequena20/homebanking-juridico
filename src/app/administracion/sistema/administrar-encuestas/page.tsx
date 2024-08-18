import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function AdministrarEncuestasPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar encuestas"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar encuestas" },
        ]}
      />
    </Wrapper>
  );
}
