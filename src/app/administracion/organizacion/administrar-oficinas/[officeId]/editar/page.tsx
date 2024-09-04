"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { getOfficeById } from "@/services/Office.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import CreateOfficeForm from "@/modules/administracion/organizacion/components/CreateOfficeForm";

export default function EditOfficePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [officeData, setOfficeData] = React.useState<any | null>(null);
  const params = useParams();

  async function handleGetOfficeData() {
    setIsLoading(true);
    const response = await getOfficeById(params?.officeId, { template: true });
    if (response?.status === 200) {
      setOfficeData(response?.data);
    } else {
      toast.error("Error al obtener la información de la oficina.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetOfficeData();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={`Editar oficina -> ${officeData?.name}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar oficinas", href: "/administracion/organizacion/administrar-oficinas" },
          { title: `${officeData?.name}` },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <CreateOfficeForm officeData={officeData} />
    </Wrapper>
  );
}
