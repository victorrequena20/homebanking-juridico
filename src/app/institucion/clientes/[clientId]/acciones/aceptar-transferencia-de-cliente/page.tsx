"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { clientActions } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/Input";

const schema = yup.object().shape({
  note: yup.string(),
});

export default function AcceptClientTransferPage() {
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

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await clientActions(params?.clientId?.toString(), { note: data?.note }, { command: "acceptTransfer" });
    if (response?.status === 200) {
      toast.success("Cliente transferido con éxito");
      router.push(`/institucion/clientes`);
      reset();
    } else {
      toast.error("Error al transferir el cliente");
    }
    setIsLoading(false);
  }

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
        <Grid xs={12}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => <Input label="Nota" type="text" value={value} onChange={onChange} width="100%" />}
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
