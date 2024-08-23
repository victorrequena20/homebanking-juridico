"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Checkbox, FormControlLabel } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createAdhocquery } from "@/services/Adhoc.service";

// Definición de la interfaz del formulario
interface IForm {
  name: string;
  query: string;
  tableName: string;
  tableFields: string;
  email?: string;
  reportRunFrequency: number;
  isActive: boolean;
}

// Esquema de validación utilizando yup.object().shape()
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  query: yup.string().required("La consulta SQL es obligatoria"),
  tableName: yup.string().required("El campo 'Insertar en la tabla' es obligatorio"),
  tableFields: yup.string().required("El campo 'Campos de tabla' es obligatorio"),
  email: yup.string().email("Debe ser un correo electrónico válido").optional(),
  reportRunFrequency: yup
    .number()
    .required("La frecuencia del reporte es obligatoria")
    .typeError("La frecuencia del reporte debe ser un número"),
  isActive: yup.boolean().default(false).required("El estado es obligatorio"),
});

export default function ReportForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    const response = await createAdhocquery({
      ...data,
      reportRunFrequency: data.reportRunFrequency,
    });
    if (response?.status === 200) {
      toast.success("Consulta Ad hoc creada correctamente");
      router.push("/administracion/organizacion/consulta-ad-hoc");
    } else {
      toast.error("Ocurrió un error al crear la consulta Ad Hoc");
    }
    setIsLoading(false);
    console.log(data);
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        columnGap: 3,
        maxWidth: "1000px",
        backgroundColor: "#fff",
        rowGap: 3,
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <Grid item>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.name?.message}
              isValidField={!errors.name}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="query"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Consulta SQL *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.query?.message}
              isValidField={!errors.query}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="tableName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Insertar en la tabla *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.tableName?.message}
              isValidField={!errors.tableName}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="tableFields"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Campos de tabla *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.tableFields?.message}
              isValidField={!errors.tableFields}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="reportRunFrequency"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Frecuencia del reporte *"
              options={[
                { label: "Diario", value: 1 },
                { label: "Semanal", value: 2 },
                { label: "Mensual", value: 3 },
                { label: "Anual", value: 4 },
                { label: "Personalizado", value: 5 },
              ]}
              setItem={item => onChange(item)} // Asignar solo el valor numérico
              value={value}
              hint={errors.reportRunFrequency?.message}
              isValidField={!errors.reportRunFrequency}
            />
          )}
        />
      </Grid>

      {/* Añadir campo de email después de "Frecuencia del reporte" */}
      <Grid item>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Correo electrónico"
              type="email"
              value={value}
              onChange={onChange}
              hint={errors.email?.message}
              isValidField={!errors.email}
            />
          )}
        />
      </Grid>

      <Grid item xs={10}>
        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
              label="Activo"
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
  );
}
