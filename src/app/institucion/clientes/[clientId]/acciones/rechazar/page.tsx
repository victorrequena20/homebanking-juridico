"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { IKeyValue } from "@/types/common";
import InputCalendar from "@/components/InputCalendar";
import { clientActions, getTemplate } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { dateFormat } from "@/constants/global";
import { useParams, useRouter } from "next/navigation";

const schema = yup.object().shape({
  rejectionDate: yup.string().required("La fecha de rechazo es obligatoria"),
  rejectionReasonId: yup.mixed().required("Motivo del rechazo es obligatorio"),
});

export default function RejectPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [template, setTemplate] = React.useState<any>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const params = useParams();
  const router = useRouter();

  async function handleGetTemplate() {
    const response = await getTemplate({ commandParam: "reject" });
    if (response?.status === 200) {
      setTemplate(response.data);
    } else {
      toast.error("Servicio de cierre no disponible");
    }
  }
  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await clientActions(
      params?.clientId?.toString(),
      { ...data, ...dateFormat, rejectionReasonId: data?.rejectionReasonId?.value },
      { command: "reject" }
    );
    if (response?.status === 200) {
      toast.success("Cliente rechazado con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al rechazar al cliente");
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
        {/* Fecha de retiro  */}
        <Grid xs={12}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="rejectionDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar
                  width="100%"
                  label="Fecha de rechazo *"
                  value={value}
                  onChange={onChange}
                  maxToday
                  hint={errors.rejectionDate?.message}
                  isValidField={!errors.rejectionDate}
                />
              )}
            />
          </Stack>
        </Grid>
        {/* Motivo del retiro */}
        <Grid xs={12}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="rejectionReasonId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Motivo del rechazo *"
                  options={keyValueAdapter(template?.narrations, "name", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                  width="100%"
                  hint={errors.rejectionReasonId?.message}
                  isValidField={!errors.rejectionReasonId}
                />
              )}
            />
          </Stack>
        </Grid>

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
