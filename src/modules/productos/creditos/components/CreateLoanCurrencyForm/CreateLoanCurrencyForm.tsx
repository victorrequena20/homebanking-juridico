import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import React, { useContext, useEffect } from "react";
import { CreateLoanContext } from "../../context/CreateLoan.context";

interface IForm {
  currencyCode: any;
  digitsAfterDecimal: string;
  currencyInMultiplesOf?: string;
  payInMultiplesOf?: string;
}

const schema = yup.object().shape({
  currencyCode: yup.mixed().required("La moneda es obligatoria"),
  digitsAfterDecimal: yup.string().required("Los lugares decimales son obligatorios"),
  currencyInMultiplesOf: yup.string(),
  payInMultiplesOf: yup.string(),
});

export default function CreateLoanCurrencyForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm, step } = useContext(CreateLoanContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      currencyCode: globalForm?.currencyCode,
      digitsAfterDecimal: globalForm?.digitsAfterDecimal,
      currencyInMultiplesOf: globalForm?.currencyInMultiplesOf,
      payInMultiplesOf: globalForm?.payInMultiplesOf,
    },
  });
  const formValues = watch();

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("🚀 ~ React.useEffect ~ data:", formValues);
    setValue("currencyCode", globalForm?.currencyCode);
    setValue("digitsAfterDecimal", globalForm?.digitsAfterDecimal);
    setValue("currencyInMultiplesOf", globalForm?.currencyInMultiplesOf);
    setValue("payInMultiplesOf", globalForm?.payInMultiplesOf);
  }, [step]);

  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={3}
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
        mt: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item>
        <Controller
          control={control}
          name="currencyCode"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Moneda *"
              options={keyValueAdapter(loanProductsTemplate?.currencyOptions, "name", "code")}
              setItem={item => {
                onChange(item);
                handleChangeGlobalFormValues({ ...globalForm, currencyCode: item });
              }}
              value={value}
              hint={errors.currencyCode?.message}
              isValidField={!errors.currencyCode}
              defaultValue={globalForm?.currencyCode?.value}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="digitsAfterDecimal"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Lugares decimales *"
              type="number"
              value={value}
              onChange={e => {
                onChange(e);
                handleChangeGlobalFormValues({ ...globalForm, digitsAfterDecimal: e.target.value });
              }}
              hint={errors.digitsAfterDecimal?.message}
              isValidField={!errors.digitsAfterDecimal}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="currencyInMultiplesOf"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Moneda en múltiplos de"
              type="number"
              value={value}
              onChange={e => {
                onChange(e);
                handleChangeGlobalFormValues({ ...globalForm, currencyInMultiplesOf: e.target.value });
              }}
              hint={errors.currencyInMultiplesOf?.message}
              isValidField={!errors.currencyInMultiplesOf}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="payInMultiplesOf"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Pago en múltiplos de"
              type="number"
              value={value}
              onChange={e => {
                onChange(e);
                handleChangeGlobalFormValues({ ...globalForm, payInMultiplesOf: e.target.value });
              }}
              hint={errors.payInMultiplesOf?.message}
              isValidField={!errors.payInMultiplesOf}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
