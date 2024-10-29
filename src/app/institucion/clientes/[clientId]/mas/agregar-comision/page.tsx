"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { IKeyValue } from "@/types/common";
import InputCalendar from "@/components/InputCalendar";
import { addComission, getTemplateAddComission } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

const schema = yup.object().shape({
  comission: yup.mixed().required("La comisión es obligatorio"),
  calculatedComission: yup.mixed().required(),
  typeTimeComission: yup.mixed().required(),
  expiratedCollection: yup.mixed().required(),
  amount: yup.mixed().required(),
});

export default function AddComission() {
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
    const response = await getTemplateAddComission(params?.clientId);
    if (response?.status === 200) {
      const data = response?.data?.chargeOptions?.map((item: any) => {
        return {
          label: `${item?.name} (${item?.currency?.name})`,
          amount: item?.amount,
          value: item?.id,
          calculatedComission: item?.chargeCalculationType?.value,
          typeTimeComission: item?.chargeTimeType?.value,
        };
      });
      setTemplate(data);
    } else {
      toast.error("Servicio de cierre no disponible");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await addComission(params?.clientId?.toString(), {
      amount: data.amount,
      chargeId: data.comission.value,
      dueDate: data.expiratedCollection,
    });
    if (response?.status === 200) {
      toast.success("Comisión agregada con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al agregar la comisión");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  const setInputs = (item: any) => {
    const dataCalculatedComission = keyValueAdapter([item], "calculatedComission", "value");
    const dataTypeTimeComission = keyValueAdapter([item], "typeTimeComission", "value");
    setValue("calculatedComission", dataCalculatedComission[0]);
    setValue("typeTimeComission", dataTypeTimeComission[0]);
    setValue("amount", item?.amount);
  };

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
              name="comission"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Comisión *"
                  options={template}
                  setItem={(item: IKeyValue) => {
                    onChange(item);
                    setInputs(item);
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
        {watch("comission") && (
          <>
            {/* Cálculo de comisión */}
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="amount"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Monto *"
                    type="number"
                    value={value}
                    onChange={value => onChange(value)}
                    width="100%"
                    hint={errors.comission?.message}
                    isValidField={!errors.comission}
                  />
                )}
              />
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Stack sx={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="calculatedComission"
                  render={({ field: { value, onChange } }) => (
                    <InputSelect
                      disabled
                      label="Cálculo de comisión *"
                      options={keyValueAdapter(template, "calculatedComission", "value")}
                      setItem={(item: IKeyValue) => onChange(item)}
                      value={value}
                      width="100%"
                      hint={errors.comission?.message}
                      isValidField={!errors.comission}
                    />
                  )}
                />
              </Stack>
            </InputResponsiveContainer>

            {/* Tipo de tiempo de comisión */}
            <InputResponsiveContainer>
              <Stack sx={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="typeTimeComission"
                  render={({ field: { value, onChange } }) => (
                    <InputSelect
                      disabled
                      label="Tipo de tiempo de comisión *"
                      options={keyValueAdapter(template, "typeTimeComission", "value")}
                      setItem={(item: IKeyValue) => onChange(item)}
                      value={value}
                      width="100%"
                      hint={errors.comission?.message}
                      isValidField={!errors.comission}
                    />
                  )}
                />
              </Stack>
            </InputResponsiveContainer>
            <InputResponsiveContainer>
              <Stack sx={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="expiratedCollection"
                  render={({ field: { onChange, value } }) => (
                    <InputCalendar
                      width="100%"
                      label="Vencimiento para su cobro el *"
                      value={value}
                      onChange={onChange}
                      maxToday
                      hint={errors.expiratedCollection?.message}
                      isValidField={!errors.expiratedCollection}
                    />
                  )}
                />
              </Stack>
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
