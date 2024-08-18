import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function MigrarSaldosIniciales() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Migrar saldos iniciales"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Migrar saldos iniciales" },
        ]}
      />
    </Wrapper>
  );
}
