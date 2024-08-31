"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { getAccountingRuleById } from "@/services/Accounting.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import AccountingRuleForm from "@/modules/contabilidad/components/AccountingRuleForm";

export default function AccountRuleEdit() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accountingRuleData, setAccountingRuleData] = React.useState<any | null>(null);
  const params = useParams();

  async function handleGetAccountingRuleById() {
    setIsLoading(true);
    const response = await getAccountingRuleById(params?.ruleId || "");
    if (response?.status === 200) {
      setAccountingRuleData(response?.data);
    } else {
      toast.error("Error al obtener la regla de contabilidad.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetAccountingRuleById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={`Editar regla contable -> ${accountingRuleData?.name}` || "Reglas de contabilidad"}
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Reglas de contabilidad", href: "/contabilidad/reglas-de-contabilidad" },
          { title: accountingRuleData?.name || "" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <Stack sx={{ mt: 3, alignItems: "center" }}>
        <AccountingRuleForm accountingRuleData={accountingRuleData} />
      </Stack>
    </Wrapper>
  );
}
