"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import StandingInstructionsForm from "@/modules/administracion/organizacion/components/StandingInstructionsForm";

export default function HistorialInstruccionesPermanentes() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Historial de instrucciones permanentes"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administración/organización" },
          { title: "Historial de instrucciones permanentes" },
        ]}
      />
      <StandingInstructionsForm />
    </Wrapper>
  );
}
