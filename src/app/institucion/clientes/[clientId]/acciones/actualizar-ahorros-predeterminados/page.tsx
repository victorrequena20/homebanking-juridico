"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputCalendar from "@/components/InputCalendar";
import { clientActions, getClientById, getTemplateUpdateDefaultSavings, updateDefaultSavings } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { dateFormat } from "@/constants/global";
import { useParams, useRouter } from "next/navigation";
import { getOffices } from "@/services/Office.service";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

const schema = yup.object().shape({
  product: yup.mixed().required("Producto pasivo predeterminado es obligatorio"),
});

export default function UpdateDefaultSavings() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const params = useParams();
  const router = useRouter();

  async function handleGetOffices() {
    try {
      const response = await getTemplateUpdateDefaultSavings(params?.clientId?.toString());
      const responseClient = await getClientById(params?.clientId?.toString());
      if (response?.status === 200) {
        console.warn(responseClient.data);
        setProducts(response.data.savingAccountOptions);
        setValue("product", responseClient.data?.savingsAccountId);
      }
    } catch (error) {
      toast.error("Error al obtener la data");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);
    console.warn("da", params?.clientId?.toString(), { savingsAccountId: data.product.value });
    const response = await updateDefaultSavings(params?.clientId?.toString(), { savingsAccountId: data.product.value });
    if (response?.status === 200) {
      toast.success("Producto pasivo predeterminado actualizado");
      router.push(`/institucion/clientes`);
      reset();
    } else {
      toast.error("Error al actualizar el producto pasivo predeterminado");
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
              name="product"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Producto pasivo predeterminado *"
                  options={keyValueAdapter(products, "accountNo", "id")}
                  setItem={value => onChange(value)}
                  width="100%"
                  value={value}
                  defaultValue={value}
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
