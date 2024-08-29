import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import CreateJournalEntryForm from "@/modules/contabilidad/components/CreateJournalEntryForm";

export default function CrearEntradasDeDiarioPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear entradas de diario"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Crear entradas de diario" },
        ]}
      />

      <CreateJournalEntryForm />
    </Wrapper>
  );
}
