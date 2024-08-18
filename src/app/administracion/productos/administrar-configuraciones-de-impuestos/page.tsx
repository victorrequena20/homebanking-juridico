import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrarConfiguracionesDeImpuestos() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar configuraciones de impuesto"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Administrar configuraciones de impuesto" },
        ]}
      />
    </Wrapper>
  );
}
