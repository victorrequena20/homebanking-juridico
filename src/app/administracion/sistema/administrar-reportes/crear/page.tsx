"use client";
import { Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import * as yup from "yup";
import { createReport, getReportsTemplate } from "@/services/Reports.service";
import React from "react";
import { toast } from "sonner";
import Toggle from "@/components/Toggle";
import { useRouter } from "next/navigation";

export interface IForm {
  reportName: string;
  reportType: any;
  reportSubType?: any;
  reportCategory?: any;
  description?: string;
  reportSql: string;
}

export const validationSchema = yup.object().shape({
  reportName: yup.string().required("Nombre del reporte es requerido"),
  reportType: yup.mixed().required("Tipo de reporte es requerido"),
  reportSubType: yup.mixed(),
  reportCategory: yup.mixed(),
  description: yup.string(),
  reportSql: yup.string().required("SQL es requerido"),
});

const reportCategories = [
  { label: "Cliente", value: "Client" },
  { label: "Crédito", value: "Loan" },
  { label: "Ahorro", value: "Saving" },
  { label: "Fondo", value: "Fund" },
  { label: "Contabilidad", value: "Accounting" },
];

export default function ReportForm() {
  const [templateData, setTemplateData] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const router = useRouter();

  async function handleGetReportsTemplate() {
    const response = await getReportsTemplate();
    if (response?.status === 200) {
      setTemplateData(response?.data);
    }
  }

  const onSubmit = async (data: any) => {
    const dataToSend = {
      ...data,
      useReport: isActive,
      reportType: watch("reportType")?.value,
      reportSubType: watch("reportSubType")?.value,
      reportCategory: watch("reportCategory")?.value,
    };
    setIsLoading(true);
    const response = await createReport(dataToSend);
    if (response?.status === 200) {
      toast.success("Reporte creado correctamente.");
      router.push("/administracion/sistema/administrar-reportes");
    } else {
      toast.error("Error al crear el reporte.");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleGetReportsTemplate();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear reporte"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar reportes", href: "/administracion/sistema/administrar-reportes" },
          { title: "Crear reporte" },
        ]}
      />
      <Grid
        container
        columnSpacing={1}
        rowSpacing={3}
        maxWidth={"860px"}
        component="form"
        sx={{ mt: 5 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={6}>
          <Controller
            control={control}
            name="reportName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nombre del reporte*"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.reportName?.message}
                isValidField={!errors.reportName}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            control={control}
            name="reportType"
            render={({ field: { onChange } }) => (
              <InputSelect
                label="Tipo de reporte*"
                options={templateData?.allowedReportTypes?.map((el: any) => {
                  return {
                    label: el,
                    value: el,
                  };
                })}
                setItem={item => onChange(item)}
                hint={errors.reportType?.message}
                isValidField={!errors.reportType}
              />
            )}
          />
        </Grid>

        {watch("reportType")?.value === "Chart" && (
          <Grid item xs={6}>
            <Controller
              control={control}
              name="reportSubType"
              render={({ field: { onChange } }) => (
                <InputSelect
                  label="Sub tipo del reporte"
                  options={templateData?.allowedReportSubTypes?.map((el: any) => {
                    return {
                      label: el,
                      value: el,
                    };
                  })}
                  setItem={item => onChange(item)}
                  hint={errors.reportSubType?.message}
                  isValidField={!errors.reportSubType}
                />
              )}
            />
          </Grid>
        )}

        <Grid item xs={6}>
          <Controller
            control={control}
            name="reportCategory"
            render={({ field: { onChange } }) => (
              <InputSelect
                label="Categoría del reporte"
                options={keyValueAdapter(reportCategories, "label", "value")}
                setItem={item => onChange(item)}
                hint={errors.reportCategory?.message}
                isValidField={!errors.reportCategory}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Descripción"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.description?.message}
                isValidField={!errors.description}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            control={control}
            name="reportSql"
            render={({ field: { onChange, value } }) => (
              <Input
                label="SQL"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.reportSql?.message}
                isValidField={!errors.reportSql}
              />
            )}
          />
          <Stack
            sx={{
              width: "100%",
              maxWidth: "394px",
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: 3,
              px: 1,
              mt: 3,
            }}
          >
            <Toggle
              toggleLeft
              label="Reporte de usuario (UI)"
              isChecked={isActive}
              setIsChecked={setIsActive}
              size="small"
            />
          </Stack>
        </Grid>
        {watch("reportType")?.value !== "Chart" && <Grid xs={6} />}

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
              text="Cancelar"
              variant="navigation"
              onClick={() => {
                router.push("/administracion/sistema/administrar-reportes");
              }}
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
              size="small"
              text="Aceptar"
              variant="primary"
              isLoading={isLoading}
              disabled={!isValid}
            />
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
