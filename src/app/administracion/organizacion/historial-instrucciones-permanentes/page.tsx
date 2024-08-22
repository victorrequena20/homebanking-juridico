import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function HistorialInstruccionesPermanentes() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Historial de instrucciones permanentes"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Historial de instrucciones permanentes" },
        ]}
      />
    </Wrapper>
  );
}
