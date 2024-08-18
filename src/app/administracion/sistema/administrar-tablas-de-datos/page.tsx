import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function AdministrarTablasDeDatos() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar tablas de datos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar tablas de datos" },
        ]}
      />
    </Wrapper>
  );
}
