import { Grid, Stack } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  const [parentId, setParentId] = React.useState<number | null>(null);
  const [accountType, setAccountType] = React.useState<number | null>(null);
  const [glAccountsTemplate, setGlAccountsTemplate] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [manualEntriesAllowed, setManualEntriesAllowed] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<IForm>({ resolver: yupResolver(validationSchema), mode: "onChange" });
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleGetTemplate() {
    const response = await getGlAccountsTemplate();
    if (response?.status === 200) {
      setGlAccountsTemplate(response?.data);
      if (searchParams.get("parentId")) {
        setAccountType(parseInt(searchParams.get("accountType") || ""));
        setParentId(parseInt(searchParams.get("parentId") || ""));
        setValue("parentId", parseInt(searchParams.get("parentId") || ""));
        setValue("type", parseInt(searchParams.get("accountType") || ""));
      }
    }
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
      sx={{
        gap: 3,
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Tipo de cuenta*"
              options={keyValueAdapter(glAccountsTemplate?.accountTypeOptions, "value", "id")}
              setItem={value => onChange(value?.value)}
              defaultValue={accountType}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre de la cuenta*" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>

      <Grid item>
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

      <Grid item>
        <Controller
          control={control}
          name="glCode"
          render={({ field: { onChange, value } }) => (
            <Input label="Número de la cuenta*" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="parentId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Cuenta mayor"
              options={keyValueAdapter(glAccountsTemplate?.assetHeaderAccountOptions, "name", "id")}
              setItem={value => onChange(value?.value)}
              defaultValue={parentId}
            />
          )}
        />
      </Grid>

      <Grid item>
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

      <Grid item>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input label="Descripción" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item>
        <Stack sx={{ height: "100%", justifyContent: "flex-end" }}>
          <Stack
            sx={{
              flexDirection: "row",
              width: "392px",
              maxWidth: "392px",
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
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
      <Grid xs={12} sx={{ mt: 4 }}>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            columnGap: 3,
          }}
        >
          <Button
            type="button"
            size="small"
            text="cancelar"
            variant="navigation"
            onClick={() => router.push("/administracion/organizacion/administrar-oficinas")}
          />
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
