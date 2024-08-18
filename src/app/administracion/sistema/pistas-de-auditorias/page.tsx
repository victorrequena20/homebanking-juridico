import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function PistasDeAuditoria() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Pistas de auditoria"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Pistas de auditoria" },
        ]}
      />
    </Wrapper>
  );
}
