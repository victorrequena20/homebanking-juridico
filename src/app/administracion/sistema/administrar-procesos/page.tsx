import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function AdministrarProcesosPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar procesos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar procesos" },
        ]}
      />
    </Wrapper>
  );
}
