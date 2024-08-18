import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductosDeAhorroPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Productos de ahorro"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Productos de ahorro" },
        ]}
      />
    </Wrapper>
  );
}
