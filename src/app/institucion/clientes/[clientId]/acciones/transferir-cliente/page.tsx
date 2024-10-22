"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputCalendar from "@/components/InputCalendar";
import { clientActions, getTemplate } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { dateFormat } from "@/constants/global";
import { useParams, useRouter } from "next/navigation";
import { getOffices } from "@/services/Office.service";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

const schema = yup.object().shape({
  officeId: yup.mixed().required("Oficina es obligatoria"),
  transferDate: yup.string().required("Cerrado el día es obligatorio"),
  note: yup.string(),
});

export default function TransferClientPage() {
  const [offices, setOffices] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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

  async function handleGetOffices() {
    const response = await getOffices();
    if (response?.status === 200) {
      setOffices(response?.data);
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await clientActions(
      params?.clientId?.toString(),
      { ...dateFormat, destinationOfficeId: data?.officeId?.value, transferDate: data?.transferDate, note: data?.note },
      { command: "proposeTransfer" }
    );
    if (response?.status === 200) {
      toast.success("Transferencia de cliente aceptada");
      router.push(`/institucion/clientes`);
      reset();
    } else {
      toast.error("Error al aceptar la transferencia de el cliente");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetOffices();
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
        {/* Offices */}
        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="officeId"
              render={({ field: { onChange, value } }) => (
                <InputSelect label="Oficina *" options={keyValueAdapter(offices, "name", "id")} setItem={value => onChange(value)} width="100%" />
              )}
            />
          </Stack>
        </InputResponsiveContainer>
        {/* Cerrado el dia  */}
        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="transferDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar
                  width="100%"
                  label="Fecha de transferencia *"
                  value={value}
                  onChange={onChange}
                  maxToday
                  hint={errors.transferDate?.message}
                  isValidField={!errors.transferDate}
                />
              )}
            />
          </Stack>
        </InputResponsiveContainer>

        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => <Input label="Nota" type="text" value={value} onChange={onChange} width="100%" />}
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
