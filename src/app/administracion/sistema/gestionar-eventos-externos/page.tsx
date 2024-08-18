import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function GestionarEventosExternosPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Gestionar eventos externos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Gestionar eventos externos" },
        ]}
      />
    </Wrapper>
  );
}
