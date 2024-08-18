import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function BuscarEntradasDeDiarioPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Buscar entradas de diario"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Buscar entradas de diario" },
        ]}
      />
    </Wrapper>
  );
}
