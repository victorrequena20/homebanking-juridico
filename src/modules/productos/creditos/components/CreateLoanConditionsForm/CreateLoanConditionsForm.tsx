import { Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import SectionTextSeparator from "../SectionTextSeparator";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputSelect from "@/components/InputSelect";
import { CreateLoanContext } from "../../context/CreateLoan.context";

export default function CreateLoanConditionsForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreateLoanContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    // resolver: yupResolver(schema),
    mode: "onChange",
  });
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
      //   onSubmit={handleSubmit(onSubmit)}
    >
      <SectionTextSeparator label="Principal" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Mínimo"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Predeterminado"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
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
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }}></Stack>
        </Stack>
      </Grid>

      <SectionTextSeparator label="Número de reembolsos" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Mínimo"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Predeterminado"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
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
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }}></Stack>
        </Stack>
      </Grid>

      <SectionTextSeparator label="Tasas de interés" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Mínimo"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Predeterminado"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.value?.message}
                  isValidField={!errors.value}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="loanScheduleType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Frecuencia *"
                  options={keyValueAdapter(loanProductsTemplate?.interestRateFrequencyTypeOptions, "value", "id")} // Here you should provide the options
                  setItem={onChange}
                  value={value}
                  hint={errors.loanScheduleType?.message}
                  isValidField={!errors.loanScheduleType}
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
