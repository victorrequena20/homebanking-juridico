import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function Configuraciones() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Configuraciones"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Configuraciones" },
        ]}
      />
    </Wrapper>
  );
}
