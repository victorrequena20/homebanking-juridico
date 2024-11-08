import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import React, { useContext, useEffect } from "react";
import { schema } from "./yup";
import { CreateLoanContext } from "../../context/CreateLoan.context";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import SectionTextSeparator from "../SectionTextSeparator";
import Toggle from "@/components/Toggle";
import { Box } from "@mui/material";
import Input from "@/components/Input";
import { Divider } from "@mui/material";

interface IForm {
  amortizationType?: any;
  interestType?: any;
  interestCalculationPeriodType?: any;
  loanScheduleType?: any;
  transactionProccessingStrategyCode?: any;
  isEqualAmortization?: boolean;
  loanScheduleProcessingType?: any;
  maximumDisbursements?: string;
  maximunOutstandingBalanceAllowed?: string;
  notRequireInformationOnExpectedDisbursement?: boolean;
  enableMultipleDisbursements?: boolean;
}

export default function CreateLoanSettingForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreateLoanContext);
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
        maxWidth: "900px",
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
          {/* Amortizacion */}
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="amortizationType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Amortización *"
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
          </Stack>
          {/* Metodo de interes */}
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="interestType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Método de interés *"
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
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", flex: 1 }}>
          {/* Periodo de calculo de intereses */}
          <Stack sx={{ flex: 1 }}>
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
          </Stack>
          <Stack sx={{ flex: 1, alignItems: "flex-start" }} />
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
          <Stack sx={{ flex: 1, justifyContent: "flex-end" }}>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
              }}
            >
              <Typography variant="caption" fontWeight="400" color="#12141a">
                ¿Es igual la amortización?
              </Typography>
              <Box>
                <Toggle
                  isChecked={watch("isEqualAmortization")}
                  size="small"
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
            </Stack>
          </Stack>
          {watch("interestCalculationPeriodType")?.value === 1 ? (
            <Stack sx={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-end" }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "392px",
                  maxWidth: "392px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #cccccc80",
                  pb: 2,
                }}
              >
                <Typography variant="caption" fontWeight="400" color="#12141a">
                  Calcular intereses por días exactos en periodo parcial
                </Typography>
                <Box>
                  <Toggle
                    isChecked={watch("isEqualAmortization")}
                    size="small"
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
              </Stack>
            </Stack>
          ) : (
            <Stack sx={{ flex: 1, alignItems: "flex-start" }} />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider sx={{ color: "#f2f4f7", bgcolor: "#f2f4f7" }} color="#f05800" variant="fullWidth" />
      </Grid>
      <SectionTextSeparator label="Calendario de pagos" />

      <Grid item xs={12}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
          {/* Tipo de calendario de prestamo */}
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="loanScheduleType"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de calendario de préstamo *"
                  options={keyValueAdapter(loanProductsTemplate?.loanScheduleTypeOptions, "value", "id")}
                  setItem={(item: any) => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, loanScheduleType: item });
                  }}
                  value={value}
                  hint={errors.loanScheduleType?.message}
                  isValidField={!errors.loanScheduleType}
                  defaultValue={globalForm?.loanScheduleType?.value}
                  width="100%"
                />
              )}
            />
          </Stack>
          {/* Estrategia de pago */}
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="transactionProccessingStrategyCode"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Estrategia de pago *"
                  options={keyValueAdapter(loanProductsTemplate?.transactionProcessingStrategyOptions, "name", "code")}
                  setItem={item => {
                    onChange(item);
                    handleChangeGlobalFormValues({ ...globalForm, transactionProccessingStrategyCode: item });
                  }}
                  width="100%"
                  value={value}
                  hint={errors.transactionProccessingStrategyCode?.message}
                  isValidField={!errors.transactionProccessingStrategyCode}
                  defaultValue={globalForm?.transactionProccessingStrategyCode?.code}
                />
              )}
            />
          </Stack>
          {/* Tipo de procesamiento del calendario de pagos */}
          {watch("loanScheduleType")?.value === 2 && (
            <Stack sx={{ flex: 1 }}>
              <Controller
                control={control}
                name="loanScheduleProcessingType"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Tipo de procesamiento del calendario de pagos *"
                    options={keyValueAdapter(loanProductsTemplate?.loanScheduleProcessingTypeOptions, "value", "id")}
                    setItem={item => {
                      onChange(item);
                      handleChangeGlobalFormValues({ ...globalForm, loanScheduleProcessingType: item });
                    }}
                    width="100%"
                    value={value}
                    hint={errors.loanScheduleProcessingType?.message}
                    isValidField={!errors.loanScheduleProcessingType}
                    defaultValue={globalForm?.loanScheduleProcessingType?.code}
                  />
                )}
              />
            </Stack>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider sx={{ color: "#f2f4f7", bgcolor: "#f2f4f7" }} color="#f05800" variant="fullWidth" />
      </Grid>
      <SectionTextSeparator label="Detalles de Dispersión de Crédito" />

      <Grid item xs={12} sx={{ mt: 4 }}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Stack sx={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-end" }}>
            <Stack
              sx={{
                flexDirection: "row",
                width: "392px",
                maxWidth: "392px",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
              }}
            >
              <Typography variant="caption" fontWeight="400" color="#12141a">
                Habilitar múltiples desembolsos
              </Typography>
              <Box>
                <Toggle
                  isChecked={watch("enableMultipleDisbursements")}
                  size="small"
                  secondaryEffect={() => {
                    if (watch("enableMultipleDisbursements")) {
                      setValue("enableMultipleDisbursements", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        enableMultipleDisbursements: false,
                      });
                    } else {
                      setValue("enableMultipleDisbursements", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        enableMultipleDisbursements: true,
                      });
                    }
                  }}
                />
              </Box>
            </Stack>
            <Stack sx={{ flex: 1, alignItems: "flex-start" }} />
          </Stack>
          <Stack sx={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-end" }}>
            <Stack
              sx={{
                flexDirection: "row",
                width: "392px",
                maxWidth: "392px",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
              }}
            >
              <Typography variant="caption" fontWeight="400" color="#12141a" maxWidth="40ch">
                No requiere información de desembolsos esperados
              </Typography>
              <Box>
                <Toggle
                  isChecked={watch("notRequireInformationOnExpectedDisbursement")}
                  size="small"
                  secondaryEffect={() => {
                    if (watch("notRequireInformationOnExpectedDisbursement")) {
                      setValue("notRequireInformationOnExpectedDisbursement", false);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        notRequireInformationOnExpectedDisbursement: false,
                      });
                    } else {
                      setValue("notRequireInformationOnExpectedDisbursement", true);
                      handleChangeGlobalFormValues({
                        ...globalForm,
                        notRequireInformationOnExpectedDisbursement: true,
                      });
                    }
                  }}
                />
              </Box>
            </Stack>
            <Stack sx={{ flex: 1, alignItems: "flex-start" }} />
          </Stack>
          {/* <Stack sx={{ flex: 1, alignItems: "flex-start" }} /> */}
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="maximumDisbursements"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Número máximo de desembolsos *"
                  type="number"
                  onChange={(e: any) => {
                    onChange(e?.target?.value);
                    handleChangeGlobalFormValues({ ...globalForm, maximumDisbursements: e?.target?.value });
                  }}
                  value={value}
                  hint={errors.maximumDisbursements?.message}
                  isValidField={!errors.maximumDisbursements}
                  defaultValue={globalForm?.maximumDisbursements?.value}
                  width="100%"
                />
              )}
            />
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="maximunOutstandingBalanceAllowed"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Saldo pendiente máximo permitido"
                  type="number"
                  onChange={(e: any) => {
                    onChange(e?.target?.value);
                    handleChangeGlobalFormValues({ ...globalForm, maximunOutstandingBalanceAllowed: e?.target?.value });
                  }}
                  value={value}
                  hint={errors.maximunOutstandingBalanceAllowed?.message}
                  isValidField={!errors.maximunOutstandingBalanceAllowed}
                  defaultValue={globalForm?.maximunOutstandingBalanceAllowed?.value}
                  width="100%"
                />
              )}
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider sx={{ color: "#f2f4f7", bgcolor: "#f2f4f7" }} color="#f05800" variant="fullWidth" />
      </Grid>
      <SectionTextSeparator label="Pago inicial" />

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ gap: 3, mt: 3 }}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
