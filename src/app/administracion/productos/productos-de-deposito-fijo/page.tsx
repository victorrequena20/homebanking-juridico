import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductosDeDepositoPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Productos de depósito fijo"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Productos de depósito fijo" },
        ]}
      />
    </Wrapper>
  );
}
