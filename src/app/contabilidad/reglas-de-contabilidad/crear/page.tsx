import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import AccountingRuleForm from "@/modules/contabilidad/components/AccountingRuleForm";

export default function CreateAccountingRule() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear regla contable"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Reglas de contabilidad", href: "/contabilidad/reglas-de-contabilidad" },
          { title: "Crear regla contable" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ mt: 3, alignItems: "center" }}>
        <AccountingRuleForm />
      </Stack>
    </Wrapper>
  );
}
