import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function ConsultaAdHoc() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Consulta Ad Hoc"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Consulta Ad Hoc" },
        ]}
      />
    </Wrapper>
  );
}
