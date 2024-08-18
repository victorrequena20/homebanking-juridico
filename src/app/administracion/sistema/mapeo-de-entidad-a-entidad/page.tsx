import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";

export default function MapeoDeEntidadAEntidadPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Mapeo de entidad a entidad"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Mapeo de entidad a entidad" },
        ]}
      />
    </Wrapper>
  );
}
