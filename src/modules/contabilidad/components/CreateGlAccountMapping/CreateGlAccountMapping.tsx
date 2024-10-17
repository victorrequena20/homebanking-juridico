import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { createFinancialActivity, getFinancialActivityAccountsTemplate, updateFinancialActivity } from "@/services/Accounting.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

interface IForm {
  financialActivityId: any;
  glAccountId: any;
}

const schema = yup.object().shape({
  financialActivityId: yup.mixed().required("La actividad financiera es obligatoria"),
  glAccountId: yup.mixed().required("La cuenta es obligatoria"),
});

export default function CreateGlMappingForm({ accountData }: { accountData?: any }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any>({});
  const [accounts, setAccounts] = React.useState<any>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      financialActivityId: accountData?.financialActivityData?.id || null,
      glAccountId: accountData?.glAccountData?.id || null,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    if (!accountData) {
      const response = await createFinancialActivity({
        financialActivityId: data.financialActivityId?.value || data.financialActivityId,
        glAccountId: data.glAccountId?.value || data.glAccountId,
      });
      if (response?.status === 200) {
        toast.success("Mapeo creado correctamente");
        router.push("/contabilidad/cuentas-vinculadas-actividades-financieras");
      } else {
        toast.error("Error al crear el mapeo");
      }
    } else {
      const response = await updateFinancialActivity(
        {
          financialActivityId: data.financialActivityId?.value || data.financialActivityId,
          glAccountId: data.glAccountId?.value || data.glAccountId,
        },
        accountData?.id
      );
      if (response?.status === 200) {
        toast.success("Mapeo actualizado correctamente");
        router.push("/contabilidad/cuentas-vinculadas-actividades-financieras");
      } else {
        toast.error("Error al actualizar el mapeo");
      }
    }
    setIsLoading(false);
  };

  const mapFinancialActivityOptions = (financialActivityOptions: any) => {
    try {
      return financialActivityOptions.map((option: any) => {
        switch (option.name) {
          case "assetTransfer":
            return { ...option, name: "(100) Transferencia de Activos" };
          case "liabilityTransfer":
            return { ...option, name: "(200) Transferencia de Pasivo" };
          case "cashAtMainVault":
            return { ...option, name: "(101) Efectivo en la bóveda principal" };
          case "cashAtTeller":
            return { ...option, name: "(102) Efectivo en el cajero" };
          case "openingBalancesTransferContra":
            return { ...option, name: "(300) Saldos de apertura transferencia contra" };
          case "fundSource":
            return { ...option, name: "(103) Fuente del fondo" };
          case "payableDividends":
            return { ...option, name: "(201) Dividendos a pagar" };
          default:
            return option;
        }
      });
    } catch (error) {
      return financialActivityOptions;
    }
  };

  async function handleGetTemplate() {
    const response = await getFinancialActivityAccountsTemplate();
    if (response?.status === 200) {
      const translatedData = mapFinancialActivityOptions(response?.data?.financialActivityOptions);
      setTemplateData({ ...response?.data, financialActivityOptions: translatedData });
      handleSetAccounts(response?.data?.glAccountOptions);
    } else {
      toast.error("Error al obtener la plantilla de actividades financieras");
    }
  }

  async function handleSetAccounts(glAccounts: any) {
    let selectedAccounts;
    const financialActivityId = watch("financialActivityId")?.value || watch("financialActivityId");

    const activityId = typeof financialActivityId === "string" ? parseInt(financialActivityId, 10) : financialActivityId;

    if (activityId === 100 || activityId === 101 || activityId === 102 || activityId === 103) {
      selectedAccounts = glAccounts?.assetAccountOptions;
    } else if (activityId === 200 || activityId === 201) {
      glAccounts?.assetAccountOptions?.filter((item: any) => (item.name = `(${item.glCode}) ${item.name}`));
      selectedAccounts = glAccounts?.liabilityAccountOptions;
    } else if (activityId === 300) {
      selectedAccounts = glAccounts?.equityAccountOptions;
    } else {
      selectedAccounts = glAccounts?.assetAccountOptions
        ?.concat(glAccounts?.equityAccountOptions)
        .concat(glAccounts?.incomeAccountOptions)
        .concat(glAccounts?.expenseAccountOptions)
        .concat(glAccounts?.liabilityAccountOptions);
    }
    console.warn(selectedAccounts);
    setAccounts(selectedAccounts);
  }

  React.useEffect(() => {
    handleGetTemplate();
    if (accountData) {
      setValue("financialActivityId", accountData?.financialActivityData?.id);
      setValue("glAccountId", accountData?.glAccountData?.id);
    }
  }, []);

  useEffect(() => {
    if (templateData?.glAccountOptions) {
      handleSetAccounts(templateData?.glAccountOptions);
    }
  }, [watch("financialActivityId"), templateData]);

  return (
    <Grid
      container
      maxWidth={"860px"}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        gap: 3,
        mt: 3,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="financialActivityId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Actividad financiera *"
              options={keyValueAdapter(templateData?.financialActivityOptions, "name", "id")}
              setItem={item => {
                onChange(item);
                setValue("glAccountId", "");
              }}
              value={value}
              hint={errors.financialActivityId?.message}
              isValidField={!errors.financialActivityId}
              defaultValue={accountData?.financialActivityData?.id}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="glAccountId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Cuenta *"
              options={keyValueAdapter(accounts, "name", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.glAccountId?.message}
              isValidField={!errors.glAccountId}
              defaultValue={accountData?.glAccountData?.id}
            />
          )}
        />
      </InputResponsiveContainer>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" spacing={3} mt={3}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
