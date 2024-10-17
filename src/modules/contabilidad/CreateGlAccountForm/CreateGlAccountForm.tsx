import { Grid, Stack } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { IForm } from "./types";
import { validationSchema } from "./yup";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/Button";
import { createGlAccount, getGlAccountsTemplate, updateGlAccount } from "@/services/Accounting.service";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Toggle from "@/components/Toggle";
import { toast } from "sonner";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

export default function CreateGlAccountForm({ glAccountData }: { glAccountData?: any }) {
  console.log("🚀 ~ CreateGlAccountForm ~ glAccountData:", glAccountData);
  const [parentId, setParentId] = React.useState<number | null>(null);
  const [accountType, setAccountType] = React.useState<number | string | null>(null);
  const [glAccountsTemplate, setGlAccountsTemplate] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [manualEntriesAllowed, setManualEntriesAllowed] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      type: glAccountData?.type?.id || "",
      name: glAccountData?.name || "",
      usage: glAccountData?.usage?.id || "",
      glCode: glAccountData?.glCode || "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleGetTemplate() {
    const response = await getGlAccountsTemplate();
    if (response?.status === 200) {
      const translatedAccountTypeOptions = response?.data?.accountTypeOptions.map((option: any) => {
        switch (option.value) {
          case "ASSET":
            return { ...option, value: "ACTIVO" };
          case "LIABILITY":
            return { ...option, value: "PASIVO" };
          case "EQUITY":
            return { ...option, value: "PATRIMONIO" };
          case "INCOME":
            return { ...option, value: "INGRESO" };
          case "EXPENSE":
            return { ...option, value: "EGRESO" };
          default:
            return option;
        }
      });
      setGlAccountsTemplate({ ...response?.data, accountTypeOptions: translatedAccountTypeOptions });
      if (searchParams.get("parentId")) {
        setAccountType(parseInt(searchParams.get("accountType") || ""));
        setParentId(parseInt(searchParams.get("parentId") || ""));
        setValue("parentId", parseInt(searchParams.get("parentId") || ""));
        setValue("type", parseInt(searchParams.get("accountType") || ""));
      }
    }
  }

  async function onSubmit(data: any) {
    console.log("glAccountData", glAccountData);
    console.log("isValid", isValid);
    console.log("🚀 ~ onSubmit ~ data:", data);
    setIsLoading(true);
    if (glAccountData) {
      const response = await updateGlAccount(
        {
          type: data.type?.value || data.type,
          name: data.name,
          usage: data.usage?.value || data.usage,
          glCode: data.glCode,
          parentId: data.parentId?.value || data.parentId,
          tagId: data.tagId?.value || data.tagId,
          description: data.description,
          manualEntriesAllowed,
        },
        glAccountData?.id
      );
      if (response?.status === 200) {
        toast.success("Cuenta contable actualizada con exito");
        router.push("/contabilidad/catalogo-de-cuentas");
      } else {
        toast.error("Error al actualizar la cuenta contable");
      }
    } else {
      const response = await createGlAccount({
        type: data.type?.value || data.type,
        name: data.name,
        usage: data.usage?.value || data.usage,
        glCode: data.glCode,
        parentId: data.parentId?.value || data.parentId,
        tagId: data.tagId?.value || data.tagId,
        description: data.description,
        manualEntriesAllowed,
      });
      if (response?.status === 200) {
        toast.success("Cuenta contable creada con exito");
        router.push("/contabilidad/catalogo-de-cuentas");
      } else {
        toast.error("Error al crear la cuenta contable");
      }
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  React.useEffect(() => {
    if (glAccountData) {
      setAccountType(glAccountData?.type?.id);
      setParentId(glAccountData?.parentId || "");
      setValue("name", glAccountData?.name);
      setValue("usage", glAccountData?.usage?.id);
      setValue("glCode", glAccountData?.glCode);
      setValue("tagId", glAccountData?.tagId?.id);
      setValue("description", glAccountData?.description);
      setValue("parentId", glAccountData?.parentId || null);
      setValue("type", glAccountData?.type?.id);
      setManualEntriesAllowed(glAccountData?.manualEntriesAllowed);
    }
  }, [glAccountData]);

  React.useEffect(() => {
    console.log("🚀 ~ CreateGlAccountForm ~ watch()", watch());
    console.log("errors", errors);
  }, [watch("name"), watch("glCode"), watch("type"), watch("usage"), watch("parentId"), watch("tagId"), watch("description")]);

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
      {/* Tipo de cuenta */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Tipo de cuenta*"
              options={keyValueAdapter(glAccountsTemplate?.accountTypeOptions, "value", "id")}
              value={value}
              setItem={item => {
                onChange(item);
                setAccountType(item?.value);
              }}
              defaultValue={accountType}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre de la cuenta*" type="text" value={value} onChange={onChange} defaultValue={glAccountData?.name} />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="usage"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Uso de la cuenta*"
              value={value}
              options={keyValueAdapter(glAccountsTemplate?.usageOptions, "value", "id")}
              setItem={item => {
                onChange(item);
              }}
              defaultValue={glAccountData?.usage?.id}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="glCode"
          render={({ field: { onChange, value } }) => (
            <Input label="Número de la cuenta*" type="text" value={value} onChange={onChange} defaultValue={glAccountData?.glCode} />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
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
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="tagId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Etiqueta"
              options={keyValueAdapter([], "value", "id")}
              setItem={value => onChange(value?.value)}
              defaultValue={glAccountData?.tagId?.id}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => <Input label="Descripción" type="text" value={value} onChange={onChange} />}
        />
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Stack sx={{ height: "100%", justifyContent: "flex-end" }}>
          <Stack
            sx={{
              flexDirection: "row",
              maxWidth: "392px",
              width: { xs: "100%" },
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
      </InputResponsiveContainer>
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
          <Button type="submit" isLoading={isLoading} disabled={!isValid} size="small" text="Aceptar" variant="primary" />
        </Stack>
      </Grid>
    </Grid>
  );
}
