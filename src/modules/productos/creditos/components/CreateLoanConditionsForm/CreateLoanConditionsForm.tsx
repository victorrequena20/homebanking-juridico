import { Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import SectionTextSeparator from "../SectionTextSeparator";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputSelect from "@/components/InputSelect";
import { CreateLoanContext } from "../../context/CreateLoan.context";
import Toggle from "@/components/Toggle";
import InputCalendar from "@/components/InputCalendar";

export default function CreateLoanConditionsForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreateLoanContext);
  const [allowApprovalAboveCreditAmount, setAllowApprovalAboveCreditAmount] = React.useState<boolean>(false);
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
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsPrincipalMin"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Mínimo"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({
                      ...globalForm,
                      conditionsPrincipalMin: e.target.value,
                    });
                  }}
                  hint={errors.conditionsPrincipalMin?.message}
                  isValidField={!errors.conditionsPrincipalMin}
                  defaultValue={globalForm.conditionsPrincipalMin}
                  width="100%"
                />
              )}
            />
          </Stack>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsPrincipalDefault"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Predeterminado"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({
                      ...globalForm,
                      conditionsPrincipalDefault: e.target.value,
                    });
                  }}
                  hint={errors.conditionsPrincipalDefault?.message}
                  isValidField={!errors.conditionsPrincipalDefault}
                  defaultValue={globalForm.conditionsPrincipalDefault}
                  width="100%"
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="conditionsPrincipalMax"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({
                      ...globalForm,
                      conditionsPrincipalMax: e.target.value,
                    });
                  }}
                  hint={errors.conditionsPrincipalMax?.message}
                  isValidField={!errors.conditionsPrincipalMax}
                  defaultValue={globalForm.conditionsPrincipalMax}
                  width="100%"
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-start" }}>
            <Toggle
              toggleLeft
              label="Permitir aprobación/desembolso por encima del monto aplicado del crédito"
              isChecked={allowApprovalAboveCreditAmount}
              setIsChecked={setAllowApprovalAboveCreditAmount}
              size="small"
              secondaryEffect={() => {
                handleChangeGlobalFormValues({
                  ...globalForm,
                  conditionsAllowApprovalAboveCreditAmount: !allowApprovalAboveCreditAmount,
                });
              }}
            />
          </Stack>
        </Stack>
      </Grid>
      {/* Tipo de calculo y monto extra */}
      {allowApprovalAboveCreditAmount && (
        <Grid item xs={12}>
          <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
            <Stack sx={{ flex: 1 }}>
              <Controller
                control={control}
                name="conditionsCalculeType"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Tipo de calculo *"
                    options={keyValueAdapter(
                      [
                        {
                          label: "Porcentaje",
                          value: "PERCENTAGE",
                        },
                        {
                          label: "Monto fijo",
                          value: "FIXED_AMOUNT",
                        },
                      ],
                      "label",
                      "value"
                    )}
                    setItem={item => {
                      onChange(item);
                      handleChangeGlobalFormValues({ ...globalForm, conditionsCalculeType: item });
                    }}
                    value={value}
                    hint={errors.conditionsCalculeType?.message}
                    isValidField={!errors.conditionsCalculeType}
                    defaultValue={globalForm.conditionsCalculeType?.value}
                    width="100%"
                  />
                )}
              />
            </Stack>
            <Stack sx={{ flex: 1 }}>
              <Controller
                control={control}
                name="conditionsExtraAmount"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Monto extra *"
                    type="text"
                    value={value}
                    onChange={e => {
                      onChange(e);
                      handleChangeGlobalFormValues({ ...globalForm, conditionsExtraAmount: e.target.value });
                    }}
                    hint={errors.conditionsExtraAmount?.message}
                    isValidField={!errors.conditionsExtraAmount}
                    defaultValue={globalForm.conditionsExtraAmount}
                    width="100%"
                  />
                )}
              />
            </Stack>
          </Stack>
        </Grid>
      )}
      {/* Fecha de desembolso */}
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="conditionsRepaymentStartDateType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Cálculo del día de pago a partir de *"
                  options={keyValueAdapter(loanProductsTemplate?.repaymentStartDateTypeOptions, "value", "id")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsRepaymentStartDateType: item });
                  }}
                  value={value}
                  hint={errors.conditionsRepaymentStartDateType?.message}
                  isValidField={!errors.conditionsRepaymentStartDateType}
                  defaultValue={globalForm.conditionsRepaymentStartDateType?.value}
                  width="100%"
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }} />
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider sx={{ color: "#f2f4f7", bgcolor: "#f2f4f7" }} color="#f05800" variant="fullWidth" />
      </Grid>

      <SectionTextSeparator label="Número de reembolsos" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsNumberOfRepaymentsMin"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Mínimo"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsNumberOfRepaymentsMin: e.target.value });
                  }}
                  hint={errors.conditonsNumberOfRepaymentsMin?.message}
                  isValidField={!errors.conditonsNumberOfRepaymentsMin}
                  width="100%"
                  defaultValue={globalForm.conditionsNumberOfRepaymentsMin}
                />
              )}
            />
          </Stack>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsNumberOfRepaymentsDefault"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Predeterminado"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({
                      ...globalForm,
                      conditionsNumberOfRepaymentsDefault: e.target.value,
                    });
                  }}
                  hint={errors.conditionsNumberOfRepaymentsDefault?.message}
                  isValidField={!errors.conditionsNumberOfRepaymentsDefault}
                  defaultValue={globalForm.conditionsNumberOfRepaymentsDefault}
                  width="100%"
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="conditionsNumberOfRepaymentsMax"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsNumberOfRepaymentsMax: e.target.value });
                  }}
                  hint={errors.conditionsNumberOfRepaymentsMax?.message}
                  isValidField={!errors.conditionsNumberOfRepaymentsMax}
                  defaultValue={globalForm.conditionsNumberOfRepaymentsMax}
                  width="100%"
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }}></Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider sx={{ color: "#f2f4f7", bgcolor: "#f2f4f7" }} color="#f05800" variant="fullWidth" />
      </Grid>

      <SectionTextSeparator label="Tasas de interés" />
      <Grid item xs={12}>
        <Typography variant="body2" fontWeight="300">
          Tasa de interés nominal
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="conditionsInterestRateMin"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Mínimo"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsInterestRateMin: e.target.value });
                  }}
                  hint={errors.conditionsInterestRateMin?.message}
                  isValidField={!errors.conditionsInterestRateMin}
                  width="100%"
                  defaultValue={globalForm.conditionsInterestRateMin}
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="conditionsInterestRateDefault"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Predeterminado"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsInterestRateDefault: e.target.value });
                  }}
                  hint={errors.conditionsInterestRateDefault?.message}
                  isValidField={!errors.conditionsInterestRateDefault}
                  width="100%"
                  defaultValue={globalForm.conditionsInterestRateDefault}
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsInterestRateMax"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsInterestRateMax: e.target.value });
                  }}
                  hint={errors.conditionsInterestRateMax?.message}
                  isValidField={!errors.conditionsInterestRateMax}
                  width="100%"
                  defaultValue={globalForm.conditionsInterestRateMax}
                />
              )}
            />
          </Stack>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsInterestRateFrequencyType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Frecuencia *"
                  options={keyValueAdapter(loanProductsTemplate?.interestRateFrequencyTypeOptions, "value", "id")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsInterestRateFrequencyType: item });
                  }}
                  value={value}
                  hint={errors.conditionsInterestRateFrequencyType?.message}
                  isValidField={!errors.conditionsInterestRateFrequencyType}
                  width="100%"
                  defaultValue={globalForm.conditionsInterestRateFrequencyType?.value}
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider sx={{ color: "#f2f4f7", bgcolor: "#f2f4f7" }} color="#f05800" variant="fullWidth" />
      </Grid>

      <SectionTextSeparator label="Frecuencia de pago" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsRepaymentEvery"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Frecuencia *"
                  type="number"
                  value={value}
                  onChange={e => {
                    onChange(e);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsRepaymentEvery: e.target.value });
                  }}
                  hint={errors.conditionsRepaymentEvery?.message}
                  isValidField={!errors.conditionsRepaymentEvery}
                  width="100%"
                  defaultValue={globalForm.conditionsRepaymentEvery}
                />
              )}
            />
          </Stack>
          <Stack flex={1}>
            <Controller
              control={control}
              name="conditionsRepaymentFrequencyType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de frecuencia *"
                  options={keyValueAdapter(loanProductsTemplate?.repaymentFrequencyTypeOptions, "value", "id")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, conditionsRepaymentFrequencyType: item });
                  }}
                  value={value}
                  hint={errors.conditionsRepaymentFrequencyType?.message}
                  isValidField={!errors.conditionsRepaymentFrequencyType}
                  defaultValue={globalForm.conditionsRepaymentFrequencyType?.value}
                  width="100%"
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
