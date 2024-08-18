import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function PlantillasPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Plantillas"
        items={[{ title: "Inicio", href: "/dashboard" }, { title: "Administración" }, { title: "Plantillas" }]}
      />
    </Wrapper>
  );
}
