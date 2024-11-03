"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { IKeyValue } from "@/types/common";
import { createCollateralManagement, getTemplateCollateralManagement } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

const schema = yup.object().shape({
  customerScreenReports: yup.mixed().required(),
});

export default function CustomerScreenReports() {
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
    const response = await getTemplateCollateralManagement();
    if (response?.status === 200) {
      const data = response?.data?.map((item: any) => {
        return {
          label: item.name,
          value: item?.id,
          ...item,
        };
      });
      //   setTemplate(data);
    } else {
      toast.error("Servicio de cierre no disponible");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await createCollateralManagement(params?.clientId?.toString(), {
      collateralId: data.warranty.id,
      quantity: data.quantity.toString(),
    });
    if (response?.status === 200) {
      toast.success("Garantia creada con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al crear la garantia");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  return (
    <Grid xs={10.2} sx={{ overflow: "auto", height: "100%", paddingBottom: 15 }}>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 6,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mt: 3,
          columnGap: 3,
          rowGap: 3,
        }}
        container
        mt={3}
      >
        {/* Comisión */}
        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="customerScreenReports"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Reportes de pantalla del cliente *"
                  options={template}
                  setItem={(item: IKeyValue) => {
                    onChange(item);
                  }}
                  value={value}
                  width="100%"
                  hint={errors.warranty?.message}
                  isValidField={!errors.warranty}
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
