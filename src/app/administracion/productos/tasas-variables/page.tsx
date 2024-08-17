import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function TasasVariablesPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Tasas variables"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Tasas variables" },
        ]}
      />
    </Wrapper>
  );
}
