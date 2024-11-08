import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import React, { useContext, useEffect } from "react";
import { schema } from "./yup";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Toggle from "@/components/Toggle";
import { Box } from "@mui/material";
import Input from "@/components/Input";
import { Divider } from "@mui/material";
import { CreatePassiveContext } from "@/modules/productos/creditos/context/CreateProductPassive.contex";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

interface IForm {
  amortizationType?: any;
  interestType?: any;
  interestCalculationPeriodType?: any;
  loanScheduleType?: any;
  transactionProccessingStrategyCode?: any;
  isEqualAmortization?: boolean;
  retention?: boolean;
  loanScheduleProcessingType?: any;
  maximumDisbursements?: string;
  maximunOutstandingBalanceAllowed?: string;
  notRequireInformationOnExpectedDisbursement?: boolean;
  enableMultipleDisbursements?: boolean;
}

export default function CreateProductPassiveSettingForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreatePassiveContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      amortizationType: globalForm?.amortizationType,
      interestType: globalForm?.interestType,
      interestCalculationPeriodType: globalForm?.interestCalculationPeriodType,
      loanScheduleType: globalForm?.loanScheduleType,
      transactionProccessingStrategyCode: globalForm?.transactionProccessingStrategyCode,
      isEqualAmortization: globalForm?.isEqualAmortization || false,
      retention: globalForm?.retention || false,
      loanScheduleProcessingType: globalForm?.loanScheduleProcessingType,
      maximumDisbursements: globalForm?.maximumDisbursements,
      maximunOutstandingBalanceAllowed: globalForm?.maximunOutstandingBalanceAllowed,
      notRequireInformationOnExpectedDisbursement: globalForm?.notRequireInformationOnExpectedDisbursement,
      enableMultipleDisbursements: globalForm?.enableMultipleDisbursements,
    },
  });

  const onSubmit = (data: IForm) => {
    console.log("Formulario enviado:", data);
  };

  useEffect(() => {
    setValue("amortizationType", globalForm?.amortizationType);
    setValue("interestType", globalForm?.interestType);
    setValue("interestCalculationPeriodType", globalForm?.interestCalculationPeriodType);
    setValue("loanScheduleType", globalForm?.loanScheduleType);
    setValue("transactionProccessingStrategyCode", globalForm?.transactionProccessingStrategyCode);
    setValue("isEqualAmortization", globalForm?.isEqualAmortization || false);
    setValue("retention", globalForm?.retention || false);
    setValue("loanScheduleProcessingType", globalForm?.loanScheduleProcessingType);
    setValue("maximumDisbursements", globalForm?.maximumDisbursements);
    setValue("maximunOutstandingBalanceAllowed", globalForm?.maximunOutstandingBalanceAllowed);
    setValue("notRequireInformationOnExpectedDisbursement", globalForm?.notRequireInformationOnExpectedDisbursement);
  }, []);

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
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          {/* Amortizacion */}
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="amortizationType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Saldo mínimo de apertura"
                  options={keyValueAdapter(loanProductsTemplate?.amortizationTypeOptions, "value", "id")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, amortizationType: item });
                  }}
                  value={value}
                  hint={errors.amortizationType?.message}
                  isValidField={!errors.amortizationType}
                  defaultValue={globalForm?.amortizationType?.value}
                  width="100%"
                />
              )}
            />
          </InputResponsiveContainer>
          {/* Metodo de interes */}
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="interestType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Período de bloqueo *"
                  options={keyValueAdapter(loanProductsTemplate?.interestTypeOptions, "value", "id")} // Here you should provide the options
                  setItem={(item: any) => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, interestType: item });
                  }}
                  value={value}
                  hint={errors.interestType?.message}
                  isValidField={!errors.interestType}
                  defaultValue={globalForm?.interestType?.value}
                  width="100%"
                />
              )}
            />
          </InputResponsiveContainer>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="interestCalculationPeriodType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Periodo de cálculo de intereses *"
                  options={keyValueAdapter(loanProductsTemplate?.interestCalculationPeriodTypeOptions, "value", "id")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, interestCalculationPeriodType: item });
                  }}
                  value={value}
                  hint={errors.interestCalculationPeriodType?.message}
                  isValidField={!errors.interestCalculationPeriodType}
                  defaultValue={globalForm?.interestCalculationPeriodType?.value}
                  width="100%"
                />
              )}
            />
          </InputResponsiveContainer>

          <InputResponsiveContainer empty />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <InputResponsiveContainer>
            <Box
              sx={{
                flexDirection: "row",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                alignContent: "center",
                mt: 4,
                pb: 2,
              }}
            >
              <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle
                  isChecked={watch("isEqualAmortization")}
                  size="small"
                  label={"Aplicar comisión de retiro para transferencias"}
                  secondaryEffect={() => {
                    if (watch("isEqualAmortization")) {
                      setValue("isEqualAmortization", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        isEqualAmortization: false,
                      });
                    } else {
                      setValue("isEqualAmortization", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        isEqualAmortization: true,
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </InputResponsiveContainer>
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="interestCalculationPeriodType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Periodo de cálculo de intereses *"
                  options={keyValueAdapter(loanProductsTemplate?.interestCalculationPeriodTypeOptions, "value", "id")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, interestCalculationPeriodType: item });
                  }}
                  value={value}
                  hint={errors.interestCalculationPeriodType?.message}
                  isValidField={!errors.interestCalculationPeriodType}
                  defaultValue={globalForm?.interestCalculationPeriodType?.value}
                  width="100%"
                />
              )}
            />
          </InputResponsiveContainer>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <InputResponsiveContainer>
            <Box
              sx={{
                flexDirection: "row",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                alignContent: "center",
                mt: 4,
                pb: 2,
              }}
            >
              <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle
                  isChecked={watch("isEqualAmortization")}
                  size="small"
                  label={"Saldo mínimo requerido"}
                  secondaryEffect={() => {
                    if (watch("isEqualAmortization")) {
                      setValue("isEqualAmortization", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        isEqualAmortization: false,
                      });
                    } else {
                      setValue("isEqualAmortization", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        isEqualAmortization: true,
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </InputResponsiveContainer>
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="interestCalculationPeriodType"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Balance minimo"
                  value={value}
                  hint={errors.interestCalculationPeriodType?.message}
                  isValidField={!errors.interestCalculationPeriodType}
                  defaultValue={globalForm?.interestCalculationPeriodType?.value}
                  width="100%"
                />
              )}
            />
          </InputResponsiveContainer>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <InputResponsiveContainer>
            <Box
              sx={{
                flexDirection: "row",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                alignContent: "center",
                mt: 4,
                pb: 2,
              }}
            >
              <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle
                  isChecked={watch("retention")}
                  size="small"
                  label={"Se aplica la retención de impuestos?"}
                  secondaryEffect={() => {
                    if (watch("retention")) {
                      setValue("retention", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        retention: false,
                      });
                    } else {
                      setValue("retention", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        retention: true,
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </InputResponsiveContainer>
          {watch("retention") ? (
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="interestCalculationPeriodType"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Grupo de impuesto *"
                    options={keyValueAdapter(loanProductsTemplate?.interestCalculationPeriodTypeOptions, "value", "id")}
                    setItem={item => {
                      onChange(item);
                      handleChangeGlobalFormValues({ ...globalForm, interestCalculationPeriodType: item });
                    }}
                    value={value}
                    hint={errors.interestCalculationPeriodType?.message}
                    isValidField={!errors.interestCalculationPeriodType}
                    defaultValue={globalForm?.interestCalculationPeriodType?.value}
                    width="100%"
                  />
                )}
              />
            </InputResponsiveContainer>
          ) : (
            <InputResponsiveContainer empty />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <InputResponsiveContainer>
            <Box
              sx={{
                flexDirection: "row",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                alignContent: "center",
                mt: 4,
                pb: 2,
              }}
            >
              <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle
                  isChecked={watch("retention")}
                  size="small"
                  label={"Se permite el sobregiro?"}
                  secondaryEffect={() => {
                    if (watch("retention")) {
                      setValue("retention", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        retention: false,
                      });
                    } else {
                      setValue("retention", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        retention: true,
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </InputResponsiveContainer>
          {watch("retention") ? (
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="interestCalculationPeriodType"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Grupo de impuesto *"
                    options={keyValueAdapter(loanProductsTemplate?.interestCalculationPeriodTypeOptions, "value", "id")}
                    setItem={item => {
                      onChange(item);
                      handleChangeGlobalFormValues({ ...globalForm, interestCalculationPeriodType: item });
                    }}
                    value={value}
                    hint={errors.interestCalculationPeriodType?.message}
                    isValidField={!errors.interestCalculationPeriodType}
                    defaultValue={globalForm?.interestCalculationPeriodType?.value}
                    width="100%"
                  />
                )}
              />
            </InputResponsiveContainer>
          ) : (
            <InputResponsiveContainer empty />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <InputResponsiveContainer>
            <Box
              sx={{
                flexDirection: "row",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                alignContent: "center",
                mt: 4,
                pb: 2,
              }}
            >
              <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle
                  isChecked={watch("retention")}
                  size="small"
                  label={"Habilitar seguimiento de inactividad"}
                  secondaryEffect={() => {
                    if (watch("retention")) {
                      setValue("retention", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        retention: false,
                      });
                    } else {
                      setValue("retention", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        retention: true,
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </InputResponsiveContainer>
          {watch("retention") ? (
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="interestCalculationPeriodType"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Grupo de impuesto *"
                    options={keyValueAdapter(loanProductsTemplate?.interestCalculationPeriodTypeOptions, "value", "id")}
                    setItem={item => {
                      onChange(item);
                      handleChangeGlobalFormValues({ ...globalForm, interestCalculationPeriodType: item });
                    }}
                    value={value}
                    hint={errors.interestCalculationPeriodType?.message}
                    isValidField={!errors.interestCalculationPeriodType}
                    defaultValue={globalForm?.interestCalculationPeriodType?.value}
                    width="100%"
                  />
                )}
              />
            </InputResponsiveContainer>
          ) : (
            <InputResponsiveContainer empty />
          )}
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
