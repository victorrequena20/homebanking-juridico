"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { createEntityDataTablesChecks, getEntityDataTablesChecksTemplate } from "@/services/Core.service";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IForm {
  entity: any;
  status: any;
  datatableName: any;
}

const schema = yup.object().shape({
  entity: yup.mixed().required("La entidad es obligatoria"),
  status: yup.mixed().required("El estado es obligatorio"),
  datatableName: yup.mixed().required("La tabla de datos es obligatoria"),
});

export default function CreateDataTableVerification() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  async function getTemplate() {
    const response = await getEntityDataTablesChecksTemplate();
    if (response?.status === 200) {
      setTemplateData(response?.data);
    }
  }

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createEntityDataTablesChecks({
      datatableName: watch("datatableName")?.value,
      entity: watch("entity")?.value,
      status: watch("status")?.value,
    });
    if (response?.status === 200) {
      reset();
      router.push("/administracion/organizacion/verificacion-de-tablas");
      toast.success("Verificación de tabla de datos de la entidad creada correctamente");
    } else {
      toast.error("Error al crear verificación de tabla de datos de la entidad");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getTemplate();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Verificación de tablas de la entidad"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Verificación de tablas de la entidad", href: "/administracion/organizacion/verificar-tablas" },
          { title: "Crear verificación de tabla de datos de la entidad" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <Grid
        container
        component="form"
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 3,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          mx: "auto",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item>
          <Controller
            control={control}
            name="entity"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Entidad *"
                options={templateData?.entities?.map((el: string) => {
                  return { label: el, value: el };
                })}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.entity?.message}
                isValidField={!errors.entity}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Estado *"
                options={keyValueAdapter(
                  watch("entity")?.value === "m_client"
                    ? templateData?.statusClient
                    : watch("entity")?.value === "m_group"
                    ? templateData?.statusGroup
                    : templateData?.statusClient,
                  "name",
                  "code"
                )}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.status?.message}
                isValidField={!errors.status}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="datatableName"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Tabla de datos *"
                options={keyValueAdapter(templateData?.datatables, "dataTableName", "dataTableName")}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.datatableName?.message}
                isValidField={!errors.datatableName}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button text="Cancelar" variant="navigation" type="button" />
            <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
