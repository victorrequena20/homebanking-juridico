"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";

import { assignAndDeallocateAdviser, getTemplateAssignAdviser } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useParams, useRouter } from "next/navigation";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import { IKeyValue } from "@/types/common";

const schema = yup.object().shape({
  adviser: yup.mixed().required("El asesor es obligatorio"),
});

export default function AssignAdviser() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [template, setTemplate] = React.useState<any>(null);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const params: { clientId: string } = useParams();
  const router = useRouter();

  async function handleGetTemplate() {
    const response = await getTemplateAssignAdviser(params?.clientId);
    if (response?.status === 200) {
      setTemplate(keyValueAdapter(response?.data?.staffOptions, "displayName", "id"));
    } else {
      toast.error("Servicio de asesores no disponible");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);

    const response = await assignAndDeallocateAdviser(
      params?.clientId?.toString(),
      {
        staffId: watch("adviser").value,
      },
      true
    );
    if (response?.status === 200) {
      toast.success("Asesor asignado con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al asignar el asesor");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  return (
    <Grid xs={10.2} sx={{ overflow: "auto", height: "100%" }}>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: 3,
          maxWidth: "600px",
          backgroundColor: "#fff",
          px: 6,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
        }}
        container
        mt={3}
      >
        {/* Comisión */}
        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="adviser"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Asesor *"
                  options={template}
                  setItem={(item: IKeyValue) => {
                    onChange(item);
                  }}
                  value={value}
                  width="100%"
                  hint={errors.comission?.message}
                  isValidField={!errors.comission}
                />
              )}
            />
          </Stack>
        </InputResponsiveContainer>

        {/* Buttons */}
        <Grid md={10}>
          <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 3 }}>
            <Button
              type="button"
              size="small"
              text="cancelar"
              variant="navigation"
              onClick={() => {
                reset();
              }}
            />
            <Button size="small" text="Confirmar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
