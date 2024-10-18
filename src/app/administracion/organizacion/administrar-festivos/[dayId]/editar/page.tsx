"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import CreateGlMappingForm from "@/modules/contabilidad/components/CreateGlAccountMapping/CreateGlAccountMapping";
import { getFinancialActivityAccountsTemplateById } from "@/services/Accounting.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import CreateHolidayForm from "@/modules/administracion/organizacion/components/CreateHolidayForm/CreateHolidayForm";
import { getDetailHoliday } from "@/services/Holidays.service";

export default function FinancialActivityEditPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any>(null);
  const params = useParams();
  async function handleGetHolidayTemplateById() {
    setIsLoading(true);
    const response = await getDetailHoliday(params?.dayId?.toString());
    if (response?.status === 200) {
      setTemplateData(response?.data);
    } else {
      toast.error("Error al obtener la información de la actividad financiera");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetHolidayTemplateById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Editar cuenta"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          {
            title: "Mapeos de actividades financieras",
            href: "/contabilidad/cuentas-vinculadas-actividades-financieras",
          },
          { title: "Editar cuenta" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack alignItems="center">
        <CreateHolidayForm holidayData={templateData} edit={true} />
      </Stack>
    </Wrapper>
  );
}
