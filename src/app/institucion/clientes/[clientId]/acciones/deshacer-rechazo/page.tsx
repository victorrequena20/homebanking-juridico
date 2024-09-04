"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputCalendar from "@/components/InputCalendar";
import { clientActions, getTemplate } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { dateFormat } from "@/constants/global";
import { useParams, useRouter } from "next/navigation";

const schema = yup.object().shape({
  reopenedDate: yup.string().required("Cerrado el día es obligatorio"),
});

export default function UndoRejectPage() {
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
    const response = await getTemplate({ commandParam: "undoRejection" });
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
      { ...data, ...dateFormat, withdrawalReasonId: data?.withdrawalReasonId?.value },
      { command: "undoRejection" }
    );
    if (response?.status === 200) {
      toast.success("Cliente reabierto con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al reabrir el cliente");
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
              name="reopenedDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar
                  width="100%"
                  label="Reabierto en la fecha *"
                  value={value}
                  onChange={onChange}
                  maxToday
                  hint={errors.reopenedDate?.message}
                  isValidField={!errors.reopenedDate}
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
