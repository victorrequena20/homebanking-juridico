import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonBack from "@/components/ButtonBack";
import Wrapper from "@/components/Wrapper";
import CloseEntrieForm from "@/modules/contabilidad/components/CloseEntrieForm";
import { Stack } from "@mui/material";
import React from "react";

export default function CreateCloseEntriesPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear entrada de cierre"
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Contabiliad", href: "/contabilidad" },
          { title: "Entradas de cierre", href: "/contabilidad/entradas-de-cierre" },
          { title: "Crea entrada de cierre" },
        ]}
      />

      <Stack sx={{ mt: 2 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <CloseEntrieForm />
      </Stack>
    </Wrapper>
  );
}
