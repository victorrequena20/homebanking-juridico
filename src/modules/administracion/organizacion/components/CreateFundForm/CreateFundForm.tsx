"use client";
import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ICreateFundForm } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./yup";
import { toast } from "sonner";
import { ICreateFundFormProps } from "./CreateFundFormProps";
import { createFund, updateFund } from "@/services/Funds.service";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

export default function CreateFundForm({ fundData }: ICreateFundFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ICreateFundForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: fundData?.name || "",
      externalId: fundData?.externalId || "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: ICreateFundForm) => {
    const { name, externalId } = data;
    setIsLoading(true);
    if (fundData) {
      const response = await updateFund({ name, externalId }, fundData.id);
      if (response?.status === 200) {
        toast.success("Fondo actualizado con exito!");
        router.push("/administracion/organizacion/administrar-fondos");
        reset();
      } else {
        toast.error("Error al actualizar el fondo.");
      }
    } else {
      const response = await createFund({ name, externalId });
      if (response?.status === 200) {
        toast.success("Fondo creado con exito!");
        router.push("/administracion/organizacion/administrar-fondos");
        reset();
      } else {
        toast.error("Error al crear el fondo.");
      }
    }
    setIsLoading(false);
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
      container
      mt={3}
    >
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input label="Nombre*" type="text" isValidField={!errors.name} hint={errors.name?.message} value={value} onChange={onChange} />
            )}
          />
        </Stack>
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="externalId"
            render={({ field: { value, onChange } }) => (
              <Input label="Id externo" type="text" isValidField={!errors.externalId} hint={errors.externalId?.message} value={value} onChange={onChange} />
            )}
          />
        </Stack>
      </InputResponsiveContainer>
      <Grid xs={12}>
        <Stack sx={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 3 }}>
          <Button
            type="button"
            size="small"
            text="Cancelar"
            onClick={() => router.push("/administracion/organizacion/administrar-fondos")}
            variant="navigation"
          />
          <Button type="submit" isLoading={isLoading} disabled={!isValid} size="small" text="Aceptar" variant="primary" />
        </Stack>
      </Grid>
    </Grid>
  );
}
