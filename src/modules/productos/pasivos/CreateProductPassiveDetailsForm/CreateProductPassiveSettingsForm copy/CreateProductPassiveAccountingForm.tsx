import { useForm, Controller } from "react-hook-form";

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
  none?: boolean;
  cash?: boolean;
  accrual?: boolean;
}

export default function CreateProductPassiveAccountingForm() {
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
      none: globalForm?.none,
      cash: globalForm?.cash,
      accrual: globalForm?.accrual,
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
    setValue("none", globalForm?.none);
    setValue("cash", globalForm?.cash);
    setValue("accrual", globalForm?.accrual);
  }, []);

  const checkedToggle = (valueSwitch: "none" | "cash" | "accrual", valueFalse1: "none" | "cash" | "accrual", valueFalse2: "none" | "cash" | "accrual") => {
    const newGlobalFormValues = {
      ...globalForm,
      [valueSwitch]: !watch(valueSwitch),
      [valueFalse1]: false,
      [valueFalse2]: false,
    };

    // Cambia los valores en el formulario
    setValue(valueSwitch, !watch(valueSwitch));
    setValue(valueFalse1, false);
    setValue(valueFalse2, false);

    // Actualiza el estado global solo una vez
    handleChangeGlobalFormValues(newGlobalFormValues);
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
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12}>
        <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <Stack sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 4 }}>
            <Toggle
              isChecked={watch("none")}
              size="small"
              label={"Ninguno"}
              secondaryEffect={() => {
                checkedToggle("none", "cash", "accrual");
              }}
            />

            <Toggle
              isChecked={watch("cash")}
              size="small"
              label={"Efectivo"}
              secondaryEffect={() => {
                checkedToggle("cash", "none", "accrual");
              }}
            />

            <Toggle
              isChecked={watch("accrual")}
              size="small"
              label={"Devengo (periódico)"}
              secondaryEffect={() => {
                checkedToggle("accrual", "none", "cash");
              }}
            />
          </Stack>
        </Box>

        {/* ------------------- */}
        {watch("cash") || watch("accrual") ? (
          <>
            <>
              <Typography
                sx={{
                  mt: 3,
                  mb: 3,
                  ml: 4,
                }}
              >
                Activos
              </Typography>
              <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
                {/* Amortizacion */}
                <InputResponsiveContainer>
                  <Controller
                    control={control}
                    name="amortizationType"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        label="Referencia pasiva *"
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
                        label="Cartera de sobregiro *"
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
              {watch("accrual") && (
                <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", mt: 3 }}>
                  {/* Amortizacion */}
                  <InputResponsiveContainer>
                    <Controller
                      control={control}
                      name="amortizationType"
                      render={({ field: { onChange, value } }) => (
                        <InputSelect
                          label="Comisiones por cobrar *"
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
                          label="Personalizaciones por cobrar *"
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
              )}

              <Typography
                sx={{
                  mt: 3,
                  mb: 3,
                  ml: 4,
                }}
              >
                Pasivo
              </Typography>
              <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
                {/* Amortizacion */}
                <InputResponsiveContainer>
                  <Controller
                    control={control}
                    name="amortizationType"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        label="Control de ahorro *"
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
                        label="Transferencias de ahoroo en suspenso *"
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
              {watch("accrual") && (
                <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", mt: 3 }}>
                  {/* Amortizacion */}
                  <InputResponsiveContainer>
                    <Controller
                      control={control}
                      name="amortizationType"
                      render={({ field: { onChange, value } }) => (
                        <InputSelect
                          label="Intereses a pagar *"
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
                  <InputResponsiveContainer empty />
                </Stack>
              )}
              <Typography
                sx={{
                  mt: 3,
                  mb: 3,
                  ml: 4,
                }}
              >
                Gastos
              </Typography>
              <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
                {/* Amortizacion */}
                <InputResponsiveContainer>
                  <Controller
                    control={control}
                    name="amortizationType"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        label="Intereses sobre ahorros *"
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
                        label="Cancelaciones *"
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
              <Typography
                sx={{
                  mt: 3,
                  mb: 3,
                  ml: 4,
                }}
              >
                Ingreso
              </Typography>
              <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
                {/* Amortizacion */}
                <InputResponsiveContainer>
                  <Controller
                    control={control}
                    name="amortizationType"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        label="Ingresos por comisiones *"
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
                        label="Ingresos por personalizaciones *"
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
              <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", mt: 3 }}>
                <InputResponsiveContainer>
                  <Controller
                    control={control}
                    name="interestType"
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        label="Ingresos por intereses de sobregiro *"
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
                <InputResponsiveContainer empty />
              </Stack>
            </>
          </>
        ) : null}
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
