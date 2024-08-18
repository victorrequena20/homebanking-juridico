import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function GanchosPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar gachos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar gachos" },
        ]}
      />
    </Wrapper>
  );
}
