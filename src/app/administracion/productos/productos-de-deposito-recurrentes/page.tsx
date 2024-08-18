import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductosDeDepositoRecurrentPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Productos de depósito recurrentes"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Productos de depósito recurrentes" },
        ]}
      />
    </Wrapper>
  );
}
