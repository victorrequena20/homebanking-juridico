import { Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { IForm } from "./types";
import { validationSchema } from "./yup";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/Button";
import { createGlAccount, getGlAccountsTemplate } from "@/services/Accounting.service";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Toggle from "@/components/Toggle";
import { toast } from "sonner";

export default function CreateGlAccountForm() {
  const [glAccountsTemplate, setGlAccountsTemplate] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [manualEntriesAllowed, setManualEntriesAllowed] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<IForm>({ resolver: yupResolver(validationSchema), mode: "onChange" });

  async function handleGetTemplate() {
    const response = await getGlAccountsTemplate();
    console.log("🚀 ~ handleGetTemplate ~ response:", response);
    if (response?.status === 200) setGlAccountsTemplate(response?.data);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await createGlAccount({
      ...data,
      manualEntriesAllowed,
    });
    if (response?.status === 200) {
      toast.success("Cuenta contable creada con exito");
      router.push("/contabilidad/catalogo-de-cuentas");
    } else {
      toast.error("Error al crear la cuenta contable");
    }
    setIsLoading(false);
    console.log("🚀 ~ onSubmit ~ response:", response);
  }

  return (
    <Grid
      container
      columnSpacing={1}
      rowSpacing={3}
      maxWidth={"860px"}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={6}>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Tipo de cuenta*"
              options={keyValueAdapter(glAccountsTemplate?.accountTypeOptions, "value", "id")}
              setItem={value => onChange(value?.value)}
              //   defaultValue={defaultValueForType}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre de la cuenta*" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="usage"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Uso de la cuenta*"
              options={keyValueAdapter(glAccountsTemplate?.usageOptions, "value", "id")}
              setItem={value => onChange(value?.value)}
              //   defaultValue={defaultValueForUsage}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="glCode"
          render={({ field: { onChange, value } }) => (
            <Input label="Número de la cuenta*" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="parentId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Cuenta mayor"
              options={keyValueAdapter([], "value", "id")}
              setItem={value => onChange(value?.value)}
              //   defaultValue={defaultValueForParentId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="tagId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Etiqueta"
              options={keyValueAdapter([], "value", "id")}
              setItem={value => onChange(value?.value)}
              //   defaultValue={defaultValueForTagId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input label="Descripción" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Stack sx={{ height: "100%", justifyContent: "flex-end" }}>
          <Stack
            sx={{
              flexDirection: "row",
              width: "392px",
              maxWidth: "392px",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "1px solid #cccccc80",
              pb: 2,
            }}
          >
            <Typography variant="body2" fontWeight="400" color="#12141a">
              ¿Permitir entradas manuales?
            </Typography>
            <Box>
              <Toggle isChecked={manualEntriesAllowed} size="small" setIsChecked={setManualEntriesAllowed} />
            </Box>
          </Stack>
        </Stack>
      </Grid>

      <Grid md={6} sx={{ mt: 4 }}>
        <Stack
          sx={{
            width: "100%",
            maxWidth: "394px",
            flexDirection: "row",
            justifyContent: "flex-end",
            columnGap: 3,
            px: 1,
          }}
        >
          <Button
            type="button"
            size="small"
            text="cancelar"
            variant="navigation"
            onClick={() => router.push("/administracion/organizacion/administrar-oficinas")}
          />
        </Stack>
      </Grid>
      <Grid md={6} sx={{ mt: 4 }}>
        <Stack
          sx={{
            width: "100%",
            maxWidth: "394px",
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: 3,
            px: 1,
          }}
        >
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || Object.keys(dirtyFields).length < 4}
            size="small"
            text="Aceptar"
            variant="primary"
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
