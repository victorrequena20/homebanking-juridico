"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@/components/Button";
import { toast } from "sonner";
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

interface IStep {
  level: number;
  role: string;
}

interface IForm {
  name: string;
  type: string;
  category: string;
  steps: IStep[];
  status: string;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre del flujo es requerido"),
  type: yup.string().required("El tipo es requerido"),
  category: yup.string().required("La categoría es requerida"),
  steps: yup
    .array()
    .of(
      yup.object().shape({
        level: yup.number().required("El nivel es requerido").min(1, "El nivel debe ser mayor a 0"),
        role: yup.string().required("El rol es requerido"),
      })
    )
    .min(1, "Debe haber al menos un paso"),
  status: yup.string().required("El estado es requerido"),
});

export default function ApprovalFlowForm() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IForm>({
    defaultValues: {
      name: "",
      type: "",
      category: "",
      steps: [{ level: 1, role: "" }],
      status: "Activo",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = async (data: IForm) => {
    console.log("Datos enviados:", data);
    // Aquí puedes llamar a tu API para enviar los datos
    toast.success("Flujo de aprobación creado con éxito!");
    reset();
  };

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear Flujo de Aprobación"
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Administración" },
          { title: "Flujos de Aprobación", href: "/administracion/flujos" },
          { title: "Crear Flujo" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <Grid
          container
          component="form"
          md={12}
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
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Nombre del flujo */}
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input label="Nombre del Flujo*" {...field} isValidField={!errors.name} hint={errors.name?.message} />}
            />
          </InputResponsiveContainer>

          {/* Tipo */}
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <InputSelect
                  label="Tipo*"
                  options={[
                    { label: "Pago", value: "Pago" },
                    { label: "Compra", value: "Compra" },
                    { label: "Presupuesto", value: "Presupuesto" },
                    { label: "Contrato", value: "Contrato" },
                  ]}
                  {...field}
                  isValidField={!errors.type}
                  hint={errors.type?.message}
                />
              )}
            />
          </InputResponsiveContainer>

          {/* Categoría */}
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <InputSelect
                  label="Categoría*"
                  options={[
                    { label: "Gastos Corporativos", value: "Gastos Corporativos" },
                    { label: "Compras", value: "Compras" },
                  ]}
                  {...field}
                  isValidField={!errors.category}
                  hint={errors.category?.message}
                />
              )}
            />
          </InputResponsiveContainer>
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <InputSelect
                  label="Estado*"
                  options={[
                    { label: "Activo", value: "Activo" },
                    { label: "Inactivo", value: "Inactivo" },
                  ]}
                  {...field}
                  isValidField={!errors.status}
                  hint={errors.status?.message}
                />
              )}
            />
          </InputResponsiveContainer>

          {/* Pasos */}
          {fields.map((field, index) => (
            <div style={{ display: "flex", width: "85%", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ marginRight: 0 }}>
                <Controller
                  control={control}
                  name={`steps.${index}.level`}
                  render={({ field }) => (
                    <Input width="350px" label="Nivel*" {...field} isValidField={!errors.steps?.[index]?.level} hint={errors.steps?.[index]?.level?.message} />
                  )}
                />
              </div>
              <div style={{}}>
                <Controller
                  control={control}
                  name={`steps.${index}.role`}
                  render={({ field }) => (
                    <Input width="350px" label="Rol*" {...field} isValidField={!errors.steps?.[index]?.role} hint={errors.steps?.[index]?.role?.message} />
                  )}
                />
              </div>
              <div style={{ paddingTop: 24 }}>
                <Button size="small" text="Eliminar" variant="primary" type="button" onClick={() => remove(index)} />
              </div>
            </div>
          ))}

          <InputResponsiveContainer empty />
          <Button size="small" text="Agregar Paso" variant="secondary" type="button" onClick={() => append({ level: fields.length + 1, role: "" })} />

          {/* Botones */}
          <Grid md={12}>
            <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 3, mt: 3 }}>
              <Button size="small" text="Cancelar" variant="navigation" type="button" />
              <Button size="small" text="Guardar" variant="primary" type="submit" disabled={!isValid} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Wrapper>
  );
}
