import { Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputSelect from "@/components/InputSelect";
import Toggle from "@/components/Toggle";
import SectionTextSeparator from "@/modules/productos/creditos/components/SectionTextSeparator";
import { CreatePassiveContext } from "@/modules/productos/creditos/context/CreateProductPassive.contex";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

export default function CreateProductPassiveConditionsForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreatePassiveContext);
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
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="conditionsPrincipalDefault"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Tasa de interés nominal anual *"
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
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="conditionsPrincipalMax"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Periodo de contabilización de interes"
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
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="conditionsPrincipalMax"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Periodo de capitalización de intereses *"
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
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="conditionsPrincipalMax"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Interes calculando usando *"
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
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="conditionsPrincipalMax"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Días en el año *"
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
      </InputResponsiveContainer>
      <InputResponsiveContainer empty />
    </Grid>
  );
}
