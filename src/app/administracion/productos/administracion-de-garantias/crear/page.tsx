"use client";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toast } from "sonner";
import { createGuarantee, getGuaranteesTemplate } from "@/services/Products.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { dateFormat } from "@/constants/global";
import { useRouter } from "next/navigation";
import ButtonBack from "@/components/ButtonBack";

interface IForm {
  name: string;
  quality: string;
  unitType: string;
  basePrice: string;
  pctToBase: string;
  currency: any;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  quality: yup.string().required("El tipo/calidad es obligatorio"),
  unitType: yup.string().required("El tipo de unidad es obligatorio"),
  basePrice: yup.string().required("El precio base es obligatorio"),
  pctToBase: yup.string().required("El porcentaje a la base es obligatorio"),
  currency: yup.mixed().required("La moneda es obligatoria"),
});

export default function AdminGuaranteesPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [guaranteesTemplate, setGuaranteesTemplate] = React.useState<any>({});
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  async function handleGetGuaranteesTemplate() {
    const response = await getGuaranteesTemplate();
    if (response?.status === 200) {
      setGuaranteesTemplate(response?.data);
    } else {
      toast.error("Error al obtener las garantias");
    }
  }

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createGuarantee({
      ...data,
      ...dateFormat,
      currency: data?.currency?.value,
    });
    if (response?.status === 200) {
      toast.success("Garantia creada correctamente");
      router.push("/administracion/productos/administracion-de-garantias");
    } else {
      toast.error("Error al crear la garantia");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleGetGuaranteesTemplate();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear garantia"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Administración de garantias", href: "/administracion/productos/administracion-de-garantias" },
          { title: "Crear garantia" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Grid
        container
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 3,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          mx: "auto",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
            name="quality"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Tipo/Calidad *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.quality?.message}
                isValidField={!errors.quality}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="unitType"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Tipo de unidad *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.unitType?.message}
                isValidField={!errors.unitType}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="basePrice"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Precio base *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.basePrice?.message}
                isValidField={!errors.basePrice}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="pctToBase"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Porcentaje a la base *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.pctToBase?.message}
                isValidField={!errors.pctToBase}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="currency"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Moneda *"
                options={keyValueAdapter(guaranteesTemplate, "name", "code")}
                setItem={onChange}
                value={value}
                hint={errors.currency?.message}
                isValidField={!errors.currency}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" sx={{ gap: 3, mt: 3 }}>
            <Button text="Cancelar" variant="navigation" type="button" />
            <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
