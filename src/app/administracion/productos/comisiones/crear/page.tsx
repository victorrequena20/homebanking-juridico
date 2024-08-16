"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputSelect from "@/components/InputSelect";
import { createCharge, getChargesTemplate } from "@/services/Products.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Input from "@/components/Input";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { IKeyValue } from "@/types/common";
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";
import { toast } from "sonner";

interface IForm {
  chargeAppliesTo: IKeyValue | any;
  name: string;
  currencyCode: IKeyValue | any;
  chargeTimeType: IKeyValue | any;
  chargeCalculationType: IKeyValue | any;
  chargePaymentMode: IKeyValue | any;
  amount: string;
  chargeGroup?: IKeyValue | any;
}

export const schema = yup.object().shape({
  chargeAppliesTo: yup.mixed().required("El cargo se aplica a es requerido"),
  name: yup.string().required("El nombre es requerido"),
  currencyCode: yup.mixed().required("La moneda es requerida"),
  chargeTimeType: yup.mixed().required("El tipo de tiempo de comsión es requerido"),
  chargeCalculationType: yup.mixed().required("El tipo de cálculo de comsión es requerido"),
  chargePaymentMode: yup.mixed().required("La forma de pago de cargo es requerida"),
  amount: yup.string().required("El monto es requerido"),
  chargeGroup: yup.mixed(),
});

export default function CreateChargePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [chargesTemplate, setChargesTemplate] = React.useState<any>([]);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isPenalty, setIsPenalty] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  React.useEffect(() => {
    (async () => {
      const responseTemplate = await getChargesTemplate();
      if (responseTemplate?.status === 200) {
        setChargesTemplate(responseTemplate?.data);
      }
      console.log("🚀 ~ responseTemplate:", responseTemplate);
    })();
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await createCharge({
      ...data,
      chargeAppliesTo: watch("chargeAppliesTo")?.value,
      currencyCode: watch("currencyCode")?.value,
      chargeTimeType: watch("chargeTimeType")?.value,
      chargeCalculationType: watch("chargeCalculationType")?.value,
      chargePaymentMode: watch("chargePaymentMode")?.value,
      chargeGroup: watch("chargeGroup")?.value,
      penalty: isPenalty,
      active: isActive,
      locale: "es",
      monthDayFormat: "dd MMM",
    });
    if (response?.status === 200) {
      toast.success("Cargo creado con exito!");
      reset();
      router.push("/administracion/productos/comisiones");
    }
    setIsLoading(false);
    console.log("🚀 ~ onSubmit ~ data:", data);
    console.log("🚀 ~ onSubmit ~ response:", response);
  };

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear cargo"
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Administración" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Comisiones", href: "/administracion/productos/comisiones" },
          { title: "Crear cargo" },
        ]}
      />

      <Stack sx={{ mt: 5, width: "100%", maxWidth: "900px" }}>
        <Grid container component="form" spacing={3} md={12} onSubmit={handleSubmit(onSubmit)}>
          {/* El cargo se aplica a */}
          <Grid>
            <Controller
              control={control}
              name="chargeAppliesTo"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="El cargo se aplica a*"
                  options={keyValueAdapter(chargesTemplate?.chargeAppliesToOptions, "value", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                  isValidField={!errors.chargeAppliesTo}
                  hint={errors.chargeAppliesTo?.message}
                />
              )}
            />
          </Grid>
          {/* Nombre */}
          <Grid>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input label="Nombre*" {...field} isValidField={!errors.name} hint={errors.name?.message} />
              )}
            />
          </Grid>
          {/* Moneda */}
          <Grid>
            <Controller
              control={control}
              name="currencyCode"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Moneda*"
                  options={keyValueAdapter(chargesTemplate?.currencyOptions, "name", "code")}
                  isValidField={!errors.currencyCode}
                  hint={errors.currencyCode?.message}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                />
              )}
            />
          </Grid>
          {/* Tipo de tiempo de comision credito */}
          <Grid>
            <Controller
              control={control}
              name="chargeTimeType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de tiempo de comisión*"
                  options={keyValueAdapter(chargesTemplate?.loanChargeTimeTypeOptions, "value", "id")}
                  isValidField={!errors.chargeTimeType}
                  hint={errors.chargeTimeType?.message}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                />
              )}
            />
          </Grid>
          {/* Tipo de calculo de cargo */}
          <Grid>
            <Controller
              control={control}
              name="chargeCalculationType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de cálculo de cargo*"
                  options={keyValueAdapter(chargesTemplate?.chargeCalculationTypeOptions, "value", "id")}
                  isValidField={!errors.chargeCalculationType}
                  hint={errors.chargeCalculationType?.message}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                />
              )}
            />
          </Grid>
          {/* Forma de pago de cargo */}
          <Grid>
            <Controller
              control={control}
              name="chargePaymentMode"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Forma de pago de cargo*"
                  options={keyValueAdapter(chargesTemplate?.chargePaymetModeOptions, "value", "id")}
                  isValidField={!errors.chargePaymentMode}
                  hint={errors.chargePaymentMode?.message}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                />
              )}
            />
          </Grid>
          {/* Monto */}
          <Grid>
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <Input label="Monto*" {...field} isValidField={!errors.amount} hint={errors.amount?.message} />
              )}
            />
          </Grid>
          {/* Grupo de impuesto */}
          <Grid>
            <Controller
              control={control}
              name="chargeGroup"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Grupo de impuesto"
                  options={[]}
                  setItem={(item: IKeyValue) => onChange(item)}
                  value={value}
                  isValidField={!errors.chargeAppliesTo}
                  hint={errors.chargeAppliesTo?.message}
                />
              )}
            />
          </Grid>
          {/* Activo y multa */}
          <Grid md={12}>
            <Stack sx={{ gap: 3 }}>
              <Toggle label="Activo" isChecked={isActive} setIsChecked={setIsActive} size="small" />
              <Toggle label="Es multa" isChecked={isPenalty} setIsChecked={setIsPenalty} size="small" />
            </Stack>
          </Grid>

          <Grid md={12}>
            <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 3, mt: 3 }}>
              <Button
                size="small"
                text="Cancelar"
                variant="navigation"
                type="button"
                onClick={() => router.push("/administracion/productos/comisiones")}
              />
              <Button
                size="small"
                text="Aceptar"
                variant="primary"
                type="submit"
                disabled={!isValid}
                isLoading={isLoading}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Wrapper>
  );
}
