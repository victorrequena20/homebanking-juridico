"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { toast } from "sonner";
import { createAccountingRule, getAccountingRulesTemplate, updateAccoutingRule } from "@/services/Accounting.service";
import { useRouter } from "next/navigation";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("El nombre de la regla contable es obligatorio"),
  officeId: yup.mixed().required("La oficina es obligatoria"),
  accountToDebit: yup.mixed(),
  accountToCredit: yup.mixed(),
  description: yup.string(),
});

export default function AccountingRuleForm({ accountingRuleData }: { accountingRuleData?: any }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: accountingRuleData?.name || "",
      officeId: accountingRuleData?.officeId || "",
      accountToDebit: accountingRuleData?.debitAccounts?.[0]?.id || "",
      accountToCredit: accountingRuleData?.creditAccounts?.[0]?.id || "",
      description: accountingRuleData?.description || "",
    },
  });

  async function handleGetTemplateData() {
    const response = await getAccountingRulesTemplate();
    if (response?.status === 200) {
      setTemplateData(response?.data);
    } else {
      toast.error("Error al obtener la plantilla de reglas contables.");
    }
  }
  async function handleEditAccountingRule(data?: any) {
    setIsLoading(true);
    const response = await updateAccoutingRule(
      {
        name: data?.name,
        officeId: data?.officeId?.value || data?.officeId,
        accountToCredit: data?.accountToDebit?.value || data?.accountToDebit,
        accountToDebit: data?.accountToCredit?.value || data?.accountToCredit,
        description: data?.description,
      },
      accountingRuleData?.id
    );
    if (response?.status === 200) {
      toast.success("Regla contable actualizada correctamente.");
      router.push("/contabilidad/reglas-de-contabilidad");
    } else {
      toast.error("Error al actualizar la regla contable.");
    }
    setIsLoading(false);
  }
  async function handleCreateAccountingRule(data?: any) {
    setIsLoading(true);
    const response = await createAccountingRule({
      name: data?.name,
      officeId: data?.officeId?.value,
      accountToCredit: data?.accountToDebit?.value,
      accountToDebit: data?.accountToCredit?.value,
      description: data?.description,
    });
    if (response?.status === 200) {
      toast.success("Regla contable creada correctamente.");
      router.push("/contabilidad/reglas-de-contabilidad");
    } else {
      toast.error("Error al crear la regla contable.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTemplateData();
    if (accountingRuleData) {
      setValue("name", accountingRuleData?.name);
      setValue("officeId", accountingRuleData?.officeId);
      setValue("accountToDebit", accountingRuleData?.debitAccounts?.[0]?.id);
      setValue("accountToCredit", accountingRuleData?.creditAccounts?.[0]?.id);
      setValue("description", accountingRuleData?.description);
    }
  }, []);

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    if (accountingRuleData) {
      await handleEditAccountingRule(data);
      return;
    }
    await handleCreateAccountingRule(data);
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      container
      sx={{
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        gap: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      {/* Nombre de la regla contable */}
      <Grid item>
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nombre de la regla contable *"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.name}
                hint={errors.name?.message}
                defaultValue={accountingRuleData?.name}
              />
            )}
          />
        </Stack>
      </Grid>

      {/* Oficina */}
      <Grid item>
        <Stack>
          <Controller
            control={control}
            name="officeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Oficina *"
                options={keyValueAdapter(templateData?.allowedOffices, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.officeId}
                hint={errors.officeId?.message}
                defaultValue={accountingRuleData?.officeId}
              />
            )}
          />
        </Stack>
      </Grid>

      {/* Cuenta a débito */}
      <Grid item>
        <Stack>
          <Controller
            control={control}
            name="accountToDebit"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Cuenta a débito"
                options={keyValueAdapter(templateData?.allowedAccounts, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.accountToDebit}
                hint={errors.accountToDebit?.message}
                defaultValue={accountingRuleData?.debitAccounts?.[0]?.id}
              />
            )}
          />
        </Stack>
      </Grid>

      {/* Cuenta para acreditar */}
      <Grid item>
        <Stack>
          <Controller
            control={control}
            name="accountToCredit"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Cuenta para acreditar"
                options={keyValueAdapter(templateData?.allowedAccounts, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.accountToCredit}
                hint={errors.accountToCredit?.message}
                defaultValue={accountingRuleData?.creditAccounts?.[0]?.id}
              />
            )}
          />
        </Stack>
      </Grid>

      {/* Descripción */}
      <Grid item>
        <Stack>
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Descripción"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.description}
                hint={errors.description?.message}
                defaultValue={accountingRuleData?.description}
              />
            )}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ gap: 3, mt: 3, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <Button text="Cancelar" variant="navigation" type="button" onClick={() => router.back()} />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
