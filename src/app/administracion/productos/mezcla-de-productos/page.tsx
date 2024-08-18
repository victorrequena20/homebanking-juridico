import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MezclaDeProductos() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Mezcla de productos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Mezcla de productos", href: "/administracion/mezcla-de-productos" },
        ]}
      />
    </Wrapper>
  );
}
