"use client";
import { Grid, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  loanStatus: any;
  loanProducts?: any;
  offices?: any;
  loanDateOption: any;
  loanFromDate: string;
  loanToDate: string;
  outStandingAmountPercentageCondition: any;
  minOutStandingAmountPercentage: string;
  maxOutStandingAmountPercentage: string;
  outstandingAmountCondition: any;
  minOutstandingAmount: string;
  maxOutstandingAmount: string;
}

const schema = yup.object().shape({
  loanStatus: yup.mixed().required("El estado del crédito es obligatorio"),
  loanProducts: yup.mixed(),
  offices: yup.mixed(),
  loanDateOption: yup.mixed().required("El tipo de fecha es obligatorio"),
  loanFromDate: yup.string().required("La fecha 'Desde' es obligatoria"),
  loanToDate: yup.string().required("La fecha 'Hasta' es obligatoria"),
  outStandingAmountPercentageCondition: yup.mixed().required("La condición de comparación es obligatoria"),
  minOutStandingAmountPercentage: yup.string().required("El valor mínimo es obligatorio"),
  maxOutStandingAmountPercentage: yup.string().required("El valor máximo es obligatorio"),
  outstandingAmountCondition: yup.mixed().required("La condición de comparación es obligatoria"),
  minOutstandingAmount: yup.string().required("El valor mínimo es obligatorio"),
  maxOutstandingAmount: yup.string().required("El valor máximo es obligatorio"),
});

export default function FundMapping() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: IForm) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <Grid
      container
      component="form"
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item>
        <Controller
          control={control}
          name="loanStatus"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Estado del crédito *"
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.loanStatus?.message}
              isValidField={!errors.loanStatus}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="loanProducts"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Producto"
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.loanProducts?.message}
              isValidField={!errors.loanProducts}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="offices"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Oficina"
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.offices?.message}
              isValidField={!errors.offices}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="loanDateOption"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Tipo de fecha *"
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.loanDateOption?.message}
              isValidField={!errors.loanDateOption}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="loanFromDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Desde la fecha *"
              value={value}
              onChange={onChange}
              hint={errors.loanFromDate?.message}
              isValidField={!errors.loanFromDate}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="loanToDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Hasta la fecha *"
              value={value}
              onChange={onChange}
              hint={errors.loanToDate?.message}
              isValidField={!errors.loanToDate}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="outStandingAmountPercentageCondition"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Condición de comparación *"
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.outStandingAmountPercentageCondition?.message}
              isValidField={!errors.outStandingAmountPercentageCondition}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="minOutStandingAmountPercentage"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Valor mínimo *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.minOutStandingAmountPercentage?.message}
              isValidField={!errors.minOutStandingAmountPercentage}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="maxOutStandingAmountPercentage"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Valor máximo *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.maxOutStandingAmountPercentage?.message}
              isValidField={!errors.maxOutStandingAmountPercentage}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="outstandingAmountCondition"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Condición de comparación *"
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.outstandingAmountCondition?.message}
              isValidField={!errors.outstandingAmountCondition}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="minOutstandingAmount"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Valor mínimo *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.minOutstandingAmount?.message}
              isValidField={!errors.minOutstandingAmount}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="maxOutstandingAmount"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Valor máximo *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.maxOutstandingAmount?.message}
              isValidField={!errors.maxOutstandingAmount}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3, gap: 3 }}>
          <Button text="Cancelar" variant="navigation" onClick={() => console.log("Cancelado")} />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
