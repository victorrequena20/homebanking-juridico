"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import MassiveCreditReallocationForm from "@/modules/administracion/organizacion/components/MassiveCreditReallocationForm";
import { Stack } from "@mui/material";
import { getOffices } from "@/services/Office.service";

export default function ReasignacionDeCreditosMasivaPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getOffices();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setOffices(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Reasignación de créditos masiva"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Reasignación de créditos masiva" },
        ]}
      />

      <Stack sx={{ mt: 5 }}>
        <MassiveCreditReallocationForm />
      </Stack>
    </Wrapper>
  );
}
