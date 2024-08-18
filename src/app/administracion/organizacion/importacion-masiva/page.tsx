import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function ImportacionMasivaPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Importación masiva"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Importación masiva" },
        ]}
      />
    </Wrapper>
  );
}
