import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateAdhocForm from "@/modules/administracion/organizacion/components/CreateAdhocForm/CreateAdhocForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import CreateHolidayForm from '@/modules/administracion/organizacion/components/CreateHolidayForm/CreateHolidayForm';

export default function CreateFund() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear día festivo"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion/" },
          { title: "Administrar festivos", href: "/administracion/organizacion/administrar-festivos/" },
          { title: "Crear día festivo" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <CreateHolidayForm />
    </Wrapper>
  );
}
