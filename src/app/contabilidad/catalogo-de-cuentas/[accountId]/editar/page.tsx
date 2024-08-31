"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import CreateGlAccountForm from "@/modules/contabilidad/CreateGlAccountForm/CreateGlAccountForm";
import { toast } from "sonner";
import { getGlAccountsTemplateById } from "@/services/Accounting.service";
import { useParams } from "next/navigation";

export default function EditPage() {
  const [isLoadingInfo, setIsLoadingInfo] = React.useState<boolean>(false);
  const [templateByIdData, setTemplateByIdData] = React.useState<any>({});
  const params = useParams();

  async function handleGetTemplateById() {
    setIsLoadingInfo(true);
    const response = await getGlAccountsTemplateById(params?.accountId?.toString());
    if (response?.status === 200) {
      setTemplateByIdData(response?.data);
    } else {
      toast.error("Error al obtener los datos de la cuenta.");
    }
    setIsLoadingInfo(false);
  }

  React.useEffect(() => {
    handleGetTemplateById();
  }, []);

  return (
    <Wrapper isLoading={isLoadingInfo}>
      <Breadcrumbs
        title="Editar cuenta"
        items={[
          { title: "Inicio" },
          { title: "Administración" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Catálogo de cuentas", href: "/contabilidad/catalogo-de-cuentas" },
          { title: "Editar cuenta" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <CreateGlAccountForm glAccountData={templateByIdData} />
      </Stack>
    </Wrapper>
  );
}
