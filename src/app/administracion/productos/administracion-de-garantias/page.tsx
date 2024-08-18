import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministracionDeGarantias() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administración de garantias"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Administración de garantias" },
        ]}
      />
    </Wrapper>
  );
}
