import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateAdhocForm from "@/modules/administracion/organizacion/components/CreateAdhocForm/CreateAdhocForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";

export default function CreateFund() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear Consulta Adhoc"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion/" },
          { title: "Consulta Ad Hoc", href: "/administracion/organizacion/consulta-ad-hoc" },
          { title: "Crear consulta Ad Hoc" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <CreateAdhocForm />
    </Wrapper>
  );
}
