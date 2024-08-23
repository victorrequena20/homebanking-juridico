import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import React, { useContext } from "react";
import { schema } from "./yup";
import { CreateLoanContext } from "../../context/CreateLoan.context";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import SectionTextSeparator from "../SectionTextSeparator";

interface IForm {
  amortizationType?: any;
  interestType?: any;
  interestCalculationPeriodType?: any;
  loanScheduleType?: any;
  transactionProccessingStrategyCode?: any;
}

export default function CreateLoanSettingForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreateLoanContext);
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
        backgroundColor: "#fff",
        maxWidth: "1000px",
        px: 3,
        py: 6,
        borderRadius: "16px",
        mx: "auto",
        mt: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack>
            <Controller
              control={control}
              name="amortizationType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Amortización"
                  options={keyValueAdapter(loanProductsTemplate?.amortizationTypeOptions, "value", "id")}
                  setItem={onChange}
                  value={value}
                  hint={errors.amortizationType?.message}
                  isValidField={!errors.amortizationType}
                />
              )}
            />
          </Stack>

          <Stack>
            <Controller
              control={control}
              name="interestType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de interés"
                  options={keyValueAdapter(loanProductsTemplate?.interestTypeOptions, "value", "id")} // Here you should provide the options
                  setItem={onChange}
                  value={value}
                  hint={errors.interestType?.message}
                  isValidField={!errors.interestType}
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack sx={{ flex: 1, alignItems: "flex-end" }}>
            <Controller
              control={control}
              name="interestCalculationPeriodType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Periodo de cálculo del interés"
                  options={keyValueAdapter(loanProductsTemplate?.interestCalculationPeriodTypeOptions, "value", "id")} // Here you should provide the options
                  setItem={onChange}
                  value={value}
                  hint={errors.interestCalculationPeriodType?.message}
                  isValidField={!errors.interestCalculationPeriodType}
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }}></Stack>
        </Stack>
      </Grid>

      <SectionTextSeparator label="Calendario de pagos" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack>
            <Controller
              control={control}
              name="loanScheduleType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de calendario de préstamo"
                  options={keyValueAdapter(loanProductsTemplate?.loanScheduleTypeOptions, "value", "id")} // Here you should provide the options
                  setItem={onChange}
                  value={value}
                  hint={errors.loanScheduleType?.message}
                  isValidField={!errors.loanScheduleType}
                />
              )}
            />
          </Stack>

          <Stack>
            <Controller
              control={control}
              name="transactionProccessingStrategyCode"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Código de estrategia de procesamiento de transacciones"
                  options={keyValueAdapter(loanProductsTemplate?.transactionProcessingStrategyOptions, "name", "code")} // Here you should provide the options
                  setItem={onChange}
                  value={value}
                  hint={errors.transactionProccessingStrategyCode?.message}
                  isValidField={!errors.transactionProccessingStrategyCode}
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ gap: 3, mt: 3 }}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
