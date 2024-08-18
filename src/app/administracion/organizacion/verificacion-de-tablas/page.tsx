import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function VerificacionDeTablasPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Verificación de tablas de la entidad"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Verificación de tablas de la entidad" },
        ]}
      />
    </Wrapper>
  );
}
