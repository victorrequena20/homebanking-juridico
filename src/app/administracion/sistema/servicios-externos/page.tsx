import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function ExternalServicesPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Servicios externos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Servicios externos" },
        ]}
      />
    </Wrapper>
  );
}
