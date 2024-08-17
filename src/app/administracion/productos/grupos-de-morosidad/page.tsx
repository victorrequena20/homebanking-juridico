import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function GruposDeMorosidad() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Grupos de morosidad"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Grupos de morosidad" },
        ]}
      />
    </Wrapper>
  );
}
