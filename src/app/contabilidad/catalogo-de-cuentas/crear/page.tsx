"use client";
import React from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import CreateGlAccountForm from "@/modules/contabilidad/CreateGlAccountForm/CreateGlAccountForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getGlAccountsTemplate } from "@/services/Accounting.service";

export default function CreateGlAccount() {
  const [glAccountsTemplate, setGlAccountsTemplate] = React.useState<any>({});
  const router = useRouter();

  async function handleGetTemplate() {
    const response = await getGlAccountsTemplate();
    console.log("🚀 ~ handleGetTemplate ~ response:", response);
    if (response?.status === 200) setGlAccountsTemplate(response?.data);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear cuenta GL"
        items={[
          { title: "Inicio" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Catálogo de cuentas", href: "/contabilidad/catalogo-de-cuentas" },
          { title: "Crear cuenta" },
        ]}
      />
      <Box sx={{ mt: 3 }}>
        <Button
          icon={<ArrowLeftIcon size={18} color="#484848" />}
          size="small"
          variant="navigation"
          text="Volver"
          onClick={() => router.push("/contabilidad/catalogo-de-cuentas")}
        />
      </Box>

      <Stack sx={{ mt: 3 }}>
        <CreateGlAccountForm />
      </Stack>
    </Wrapper>
  );
}
