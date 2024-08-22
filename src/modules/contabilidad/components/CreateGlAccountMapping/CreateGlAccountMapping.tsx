import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { createFinancialActivity, getFinancialActivityAccountsTemplate } from "@/services/Accounting.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IForm {
  financialActivityId: any;
  glAccountId: any;
}

const schema = yup.object().shape({
  financialActivityId: yup.mixed().required("La actividad financiera es obligatoria"),
  glAccountId: yup.object().required("La cuenta es obligatoria"),
});

export default function CreateGlMappingForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any>({});
  const [accounts, setAccounts] = React.useState<any>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createFinancialActivity(data);
    if (response?.status === 200) {
      toast.success("Mapeo creado correctamente");
      router.push("/contabilidad/cuentas-vinculadas-actividades-financieras");
    } else {
      toast.error("Error al crear el mapeo");
    }
    setIsLoading(false);
  };

  async function handleGetTemplate() {
    const response = await getFinancialActivityAccountsTemplate();
    const glAccounts = response?.data?.glAccountOptions;
    const glAccountsArray = glAccounts?.assetAccountOptions
      ?.concat(glAccounts?.equityAccountOptions)
      .concat(glAccounts?.incomeAccountOptions)
      .concat(glAccounts?.expenseAccountOptions)
      .concat(glAccounts?.liabilityAccountOptions);
    if (response?.status === 200) {
      setTemplateData(response?.data);
      setAccounts(glAccountsArray);
    }
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

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
      <Grid item>
        <Controller
          control={control}
          name="financialActivityId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Actividad financiera *"
              options={keyValueAdapter(templateData?.financialActivityOptions, "name", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.financialActivityId?.message}
              isValidField={!errors.financialActivityId}
            />
          )}
        />
      </Grid>

      <Grid item>
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
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" spacing={3} mt={3}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
