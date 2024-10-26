"use client";
import { Grid, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import Toggle from "@/components/Toggle";
import React from "react";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { getLoanProducts } from "@/services/Loans.service";
import { getOffices } from "@/services/Office.service";

interface IForm {
  loanStatus: any;
  loanProducts?: any;
  offices?: any;
  loanDateOption: any;
  loanFromDate: string;
  loanToDate: string;
  outStandingAmountPercentageCondition: any;
  minOutStandingAmountPercentage: number;
  maxOutStandingAmountPercentage: number;
  outstandingAmountCondition: any;
  minOutstandingAmount: number;
  maxOutstandingAmount: number;
}

const schema = yup.object().shape({
  loanStatus: yup.mixed().required("El estado del crédito es obligatorio"),
  loanProducts: yup.mixed(),
  offices: yup.mixed(),
  loanDateOption: yup.mixed().required("El tipo de fecha es obligatorio"),
  loanFromDate: yup.string().required("La fecha 'Desde' es obligatoria"),
  loanToDate: yup
    .string()
    .required("Desde la fecha es obligatoria")
    .test("is-greater", "Hasta la fecha debe ser mayor que Desde la fecha", function (value) {
      const { loanFromDate } = this.parent;
      return new Date(value) >= new Date(loanFromDate);
    }),
  outStandingAmountPercentageCondition: yup.mixed().required("La condición de comparación es obligatoria"),
  minOutStandingAmountPercentage: yup.number().required("El valor mínimo es obligatorio"),
  maxOutStandingAmountPercentage: yup.number().required("El valor máximo es obligatorio"),
  outstandingAmountCondition: yup.mixed().required("La condición de comparación es obligatoria"),
  minOutstandingAmount: yup.number().required("El valor mínimo es obligatorio"),
  maxOutstandingAmount: yup.number().required("El valor máximo es obligatorio"),
});

export default function FundMapping() {
  const [offices, setOffices] = React.useState<any[]>([]);
  const [isPercentageActive, setIsPercentageActive] = React.useState(false);
  const [isAmountActive, setIsAmountActive] = React.useState(false);
  const [percentageComparisonCondition, setPercentageComparisonCondition] = React.useState("");
  const [amountComparisonCondition, setAmountComparisonCondition] = React.useState("");
  const [loanProducts, setLoanProducts] = React.useState<any | null>([]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: IForm) => {
    console.log("Formulario enviado:", data);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [offices, products] = await Promise.all([getOffices(), getLoanProducts()]);

        if (offices?.status === 200) {
          setOffices(offices?.data);
          console.log("Respuesta:::", offices);
        }

        if (products?.status === 200) {
          setLoanProducts(products?.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid
      container
      component="form"
      xs={12}
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
      {/* Estado del Crédito */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="loanStatus"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Estado del crédito *"
              multiple
              options={[]} // Agrega las opciones aquí
              setItem={onChange}
              value={value}
              hint={errors.loanStatus?.message}
              isValidField={!errors.loanStatus}
            />
          )}
        />
      </InputResponsiveContainer>

      {/* Producto */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="loanProducts"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Producto"
              multiple
              options={keyValueAdapter(loanProducts, "name", "id")}
              setItem={onChange}
              value={value}
              hint={errors.loanProducts?.message}
              isValidField={!errors.loanProducts}
            />
          )}
        />
      </InputResponsiveContainer>

      {/* Oficina */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="offices"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Oficina"
              multiple
              options={keyValueAdapter(offices, "name", "id")}
              setItem={onChange}
              value={value}
              hint={errors.offices?.message}
              isValidField={!errors.offices}
            />
          )}
        />
      </InputResponsiveContainer>

      {/* Tipo de Fecha */}
      <InputResponsiveContainer>
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
      </InputResponsiveContainer>

      {/* Desde la fecha */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="loanFromDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar label="Desde la fecha *" value={value} onChange={onChange} hint={errors.loanFromDate?.message} isValidField={!errors.loanFromDate} />
          )}
        />
      </InputResponsiveContainer>

      {/* Hasta la fecha */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="loanToDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar label="Hasta la fecha *" value={value} onChange={onChange} hint={errors.loanToDate?.message} isValidField={!errors.loanToDate} />
          )}
        />
      </InputResponsiveContainer>

      {/* Toggle para "Porcentaje pendiente del Crédito" */}
      <InputResponsiveContainer>
        <Stack sx={{ alignItems: "flex-start" }}>
          <Toggle label="Porcentaje pendiente del Crédito" isChecked={isPercentageActive} setIsChecked={setIsPercentageActive} size="small" />
        </Stack>
      </InputResponsiveContainer>
      {/* Padding */}
      <InputResponsiveContainer>
        <Stack sx={{ width: "392px" }} />
      </InputResponsiveContainer>

      {/* Si el toggle "Porcentaje pendiente" está activo */}
      {isPercentageActive && (
        <>
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="outStandingAmountPercentageCondition"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Condición de comparación *"
                  options={[
                    { label: "Entre", value: "entre" },
                    { label: "<=", value: "<=" },
                    { label: ">=", value: ">=" },
                    { label: "<", value: "<" },
                    { label: ">", value: ">" },
                    { label: "=", value: "=" },
                  ]}
                  setItem={newValue => {
                    onChange(newValue);
                    setPercentageComparisonCondition(String(newValue?.value));
                  }}
                  value={percentageComparisonCondition} // Valor por defecto
                  hint={errors.outStandingAmountPercentageCondition?.message}
                  isValidField={!errors.outStandingAmountPercentageCondition}
                />
              )}
            />
          </InputResponsiveContainer>

          {percentageComparisonCondition === "entre" ? (
            <>
              {/* Padding */}
              <InputResponsiveContainer>
                <Stack sx={{ width: "392px" }} />
              </InputResponsiveContainer>
              <InputResponsiveContainer>
                <Controller
                  control={control}
                  name="minOutStandingAmountPercentage"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Valor mínimo *"
                      type="number"
                      value={value ? String(value) : ""}
                      onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : "")}
                      hint={errors.minOutStandingAmountPercentage?.message}
                      isValidField={!errors.minOutStandingAmountPercentage}
                    />
                  )}
                />
              </InputResponsiveContainer>
              <InputResponsiveContainer>
                <Controller
                  control={control}
                  name="maxOutStandingAmountPercentage"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Valor máximo *"
                      type="number"
                      value={value ? String(value) : ""}
                      onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : "")}
                      hint={errors.maxOutStandingAmountPercentage?.message}
                      isValidField={!errors.maxOutStandingAmountPercentage}
                    />
                  )}
                />
              </InputResponsiveContainer>
            </>
          ) : (
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="minOutStandingAmountPercentage"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Valor de comparación *"
                    type="number"
                    value={value ? String(value) : ""}
                    onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : "")}
                    hint={errors.minOutStandingAmountPercentage?.message}
                    isValidField={!errors.minOutStandingAmountPercentage}
                  />
                )}
              />
            </InputResponsiveContainer>
          )}
        </>
      )}

      {/* Toggle para "Monto pendiente del Crédito" */}
      <InputResponsiveContainer>
        <Stack sx={{ alignItems: "flex-start" }}>
          <Toggle label="Monto pendiente del Crédito" isChecked={isAmountActive} setIsChecked={setIsAmountActive} size="small" />
        </Stack>
      </InputResponsiveContainer>

      {/* Padding */}
      <InputResponsiveContainer>
        <Stack sx={{ width: "392px" }} />
      </InputResponsiveContainer>

      {/* Si el toggle "Monto pendiente" está activo */}
      {isAmountActive && (
        <>
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="outstandingAmountCondition"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Condición de comparación *"
                  options={[
                    { label: "Entre", value: "entre" },
                    { label: "<=", value: "<=" },
                    { label: ">=", value: ">=" },
                    { label: "<", value: "<" },
                    { label: ">", value: ">" },
                    { label: "=", value: "=" },
                  ]}
                  setItem={newValue => {
                    onChange(newValue);
                    setAmountComparisonCondition(String(newValue?.value));
                  }}
                  value={amountComparisonCondition} // Valor por defecto
                  hint={errors.outstandingAmountCondition?.message}
                  isValidField={!errors.outstandingAmountCondition}
                />
              )}
            />
          </InputResponsiveContainer>

          {/* Mostrar Valor mínimo y máximo solo si la condición es "entre" */}
          {amountComparisonCondition === "entre" ? (
            <>
              {/* Padding */}
              <InputResponsiveContainer>
                <Stack sx={{ width: "392px" }} />
              </InputResponsiveContainer>
              <InputResponsiveContainer>
                <Controller
                  control={control}
                  name="minOutstandingAmount"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Valor mínimo *"
                      type="number"
                      value={value ? String(value) : ""}
                      onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : "")}
                      hint={errors.minOutstandingAmount?.message}
                      isValidField={!errors.minOutstandingAmount}
                    />
                  )}
                />
              </InputResponsiveContainer>
              <InputResponsiveContainer>
                <Controller
                  control={control}
                  name="maxOutstandingAmount"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Valor máximo *"
                      type="number"
                      value={value ? String(value) : ""}
                      onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : "")}
                      hint={errors.maxOutstandingAmount?.message}
                      isValidField={!errors.maxOutstandingAmount}
                    />
                  )}
                />
              </InputResponsiveContainer>
            </>
          ) : (
            <InputResponsiveContainer>
              <Controller
                control={control}
                name="minOutstandingAmount"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Valor de comparación *"
                    type="number"
                    value={value ? String(value) : ""}
                    onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : "")}
                    hint={errors.minOutstandingAmount?.message}
                    isValidField={!errors.minOutstandingAmount}
                  />
                )}
              />
            </InputResponsiveContainer>
          )}
        </>
      )}

      {/* Botones */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3, gap: 3 }}>
          <Button text="Cancelar" variant="navigation" onClick={() => console.log("Cancelado")} />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
