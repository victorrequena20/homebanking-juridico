"use client";
import React, { useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { IKeyValue } from "@/types/common";
import { addComission, createCollateralManagement, getTemplateCollateralManagement } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

const schema = yup.object().shape({
  warranty: yup.mixed().required(),
  basePrice: yup.mixed(),
  typeUnity: yup.mixed(),
  typeQuality: yup.mixed(),
  name: yup.mixed(),
  pctToBase: yup.mixed(),
  quantity: yup.mixed().required(),
});

export default function CreateWarranty() {
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
      setTemplate(data);
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

  const setInputs = (item: any) => {
    setValue("name", item?.name);
    setValue("typeQuality", item?.quality);
    setValue("typeUnity", item?.unitType);
    setValue("basePrice", item?.basePrice);
    setValue("pctToBase", item?.pctToBase);
  };

  const calculatedWarranty = (value: string) => {
    const total = watch("basePrice") * parseInt(value);
    const totalWarranty = (total * watch("pctToBase")) / 100;
    setValue("total", total);
    setValue("totalWarranty", totalWarranty);
  };

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
              name="warranty"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Garantia *"
                  options={template}
                  setItem={(item: IKeyValue) => {
                    onChange(item);
                    setInputs(item);
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
        {watch("warranty") && (
          <>
            {/* Cálculo de comisión */}
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Nombre"
                    disabled
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.name?.message}
                    isValidField={!errors.name}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="typeQuality"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Tipo/Calidad"
                    disabled
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.typeQuality?.message}
                    isValidField={!errors.typeQuality}
                  />
                )}
              />
            </InputResponsiveContainer>

            {/* Tipo de tiempo de comisión */}
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="typeUnity"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Tipo de unidad"
                    disabled
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.typeUnity?.message}
                    isValidField={!errors.typeUnity}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="basePrice"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Precio base"
                    disabled
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.basePrice?.message}
                    isValidField={!errors.basePrice}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="pctToBase"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Porcentaje a la base"
                    disabled
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.pctToBase?.message}
                    isValidField={!errors.pctToBase}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="quantity"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Cantidad *"
                    value={value}
                    type="number"
                    onChange={e => {
                      onChange(e.target.value);
                      calculatedWarranty(e.target.value);
                    }}
                    width="100%"
                    hint={errors.quantity?.message}
                    isValidField={!errors.quantity}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="total"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Total"
                    type="number"
                    disabled
                    value={value || 0}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.total?.message}
                    isValidField={!errors.total}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="totalWarranty"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Valor total de la garantia"
                    disabled
                    type="number"
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.totalWarranty?.message}
                    isValidField={!errors.totalWarranty}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Stack sx={{ width: "392px" }} />
            </InputResponsiveContainer>
          </>
        )}

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
