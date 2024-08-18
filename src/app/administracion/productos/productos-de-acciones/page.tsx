import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductosDeAhorroPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Productos de acciones"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Productos de acciones" },
        ]}
      />
    </Wrapper>
  );
}
