"use client";
import React from "react";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputSelect from "@/components/InputSelect";
import { getRunReportsFullParameterList, getRunReportsOptionsByParamName, runReport } from "@/services/Reports.service";
import { IKeyValue } from "@/types/common";
import { Grid, Stack } from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/Button";
import { downloadCSV, generateCSV, transformArray } from "@/utilities/common.utility";
import { useParams } from "next/navigation";
import DownloadIcon from "@/assets/icons/DownloadIcon";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import InputCalendar from "@/components/InputCalendar";

export default function RunReportForm() {
  const [parametersColumnHeaders, setParametersColumnHeaders] = React.useState<any>([]);
  const [fullParameterList, setFullParameterList] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingParameters, setIsLoadingParameters] = React.useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = React.useState(false);
  const [offices, setOffices] = React.useState<any>([]);
  const [currencies, setCurrencies] = React.useState<any>([]);
  const [funds, setFunds] = React.useState<any>([]);
  const [loanPurposes, setLoanPurposes] = React.useState<any>([]);
  const [loanStaffs, setLoanStaffs] = React.useState<any>([]);
  const [loanProducts, setLoanProducts] = React.useState<any>([]);
  const [savingsAccountSubStatus, setSavingsAccountSubStatus] = React.useState<any>([]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm<any>({ mode: "onChange" });
  const params = useParams();
  const decodeUri = decodeURIComponent(params?.reportName?.toString());
  const selectedOfficeId = useWatch({ control, name: "officeId" });
  const selectedCurrencyId = useWatch({ control, name: "currencyId" });
  const allFields = watch();
  const isFormComplete = Object.values(allFields).every(value => value !== undefined && value !== null && value !== "");

  async function handleGetFullParameterList() {
    setIsLoadingParameters(true);
    const response = await getRunReportsFullParameterList({
      R_reportListing: `'${decodeUri}'`,
      parameterType: true,
    });

    if (response?.status === 200) {
      setFullParameterList(response.data);
      setParametersColumnHeaders(response.data.columnHeaders);
    } else {
      toast.error("Error al obtener los parámetros");
    }
    setIsLoadingParameters(false);
  }

  async function handleGetRunReportsOptionsByParamName(paramName: string, params?: any) {
    setIsLoadingOptions(true);

    if (paramName === "loanOfficerIdSelectAll") {
      const officeId = getValues("officeId");
      if (officeId === undefined) {
        setIsLoadingOptions(false);
        return;
      }
      params = { ...params, R_officeId: officeId.value };
    }

    if (paramName === "loanProductIdSelectAll") {
      const currencyId = getValues("currencyId");
      if (currencyId === undefined) {
        setIsLoadingOptions(false);
        return;
      }
      params = { ...params, R_currencyId: currencyId.value };
    }

    if (["startDateSelect", "endDateSelect", "selectAccount", "cycleXSelect", "cycleYSelect"].includes(paramName)) {
      setIsLoadingOptions(false);
      return;
    }

    const response: any = await getRunReportsOptionsByParamName(paramName, { ...params, parameterType: true });

    if (response?.status === 200) {
      const data = transformArray(response.data.data);
      switch (paramName) {
        case "OfficeIdSelectOne":
          setOffices(data);
          break;
        case "currencyIdSelectAll":
          setCurrencies(data);
          break;
        case "fundIdSelectAll":
          setFunds(data);
          break;
        case "loanPurposeIdSelectAll":
          setLoanPurposes(data);
          break;
        case "loanOfficerIdSelectAll":
          setLoanStaffs(data);
          break;
        case "loanProductIdSelectAll":
          setLoanProducts(data);
          break;
        case "SavingsAccountSubStatus":
          setSavingsAccountSubStatus(data);
          break;
      }
    } else {
      toast.error("Error al obtener los datos");
    }
    setIsLoadingOptions(false);
  }

  async function launchReport(data: any) {
    if (!decodeUri) {
      toast.error("El nombre del reporte no es válido.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await runReport(decodeUri, {
        R_officeId: data.officeId?.value,
        R_currencyId: data.currencyId?.value,
        R_fundId: data.fundId?.value,
        R_loanPurposeId: data.loanPurposeId?.value,
        R_loanOfficerId: data.loanOfficerId?.value,
        R_loanProductId: data.loanProductId?.value,
        R_subStatus: data.subStatus?.value,
        R_cycleX: data.cycleX,
        R_cycleY: data.cycleY,
        decimalChoice: data.decimalPlaces?.value,
      });

      if (response?.status === 200) {
        if (response.data && response.data.data.length > 0) {
          const csvContent = await generateCSV(response.data);
          downloadCSV(csvContent, "reporte.csv");
          toast.success("Reporte generado correctamente");
        } else {
          toast.error("Reporte sin datos generados");
        }
      } else {
        toast.error("Error al generar el reporte");
      }
    } catch (error) {
      console.error("Error al ejecutar el reporte:", error);
      toast.error("Ocurrió un error al ejecutar el reporte.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetFullParameterList();
  }, []);

  React.useEffect(() => {
    if (parametersColumnHeaders.length) {
      const parameterNameIndex = parametersColumnHeaders.findIndex((col: any) => col.columnName === "parameter_name");
      fullParameterList?.data?.forEach((item: any) => {
        handleGetRunReportsOptionsByParamName(item.row[parameterNameIndex]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametersColumnHeaders, selectedOfficeId, selectedCurrencyId]);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(launchReport)}
      sx={{ gap: 3, maxWidth: "580px", backgroundColor: "#fff", px: 3, py: 6, borderRadius: "16px", alignItems: "center", justifyContent: "center" }}
      container
      mt={3}
    >
      {fullParameterList?.data?.map((item: any, index: number) => {
        const parameterDisplayType = item.row[parametersColumnHeaders.findIndex((col: any) => col.columnName === "parameter_displayType")];
        const parameterVariable = item.row[parametersColumnHeaders.findIndex((col: any) => col.columnName === "parameter_variable")];
        const parameterLabel = item.row[parametersColumnHeaders.findIndex((col: any) => col.columnName === "parameter_label")];
        const parameterDefaultValue = item.row[parametersColumnHeaders.findIndex((col: any) => col.columnName === "parameter_default")];

        if (
          (parameterVariable === "loanOfficerIdSelectAll" && (!selectedOfficeId || loanStaffs.length === 0)) ||
          (parameterVariable === "loanProductIdSelectAll" && (!selectedCurrencyId || loanProducts.length === 0))
        ) {
          return null;
        }

        if (parameterDisplayType === "date") {
          return (
            <InputResponsiveContainer key={index}>
              <Stack>
                <Controller
                  control={control}
                  name={parameterVariable}
                  render={({ field: { onChange, value } }) => <InputCalendar label={`${parameterLabel} *`} value={value} onChange={onChange} width="100%" />}
                />
              </Stack>
            </InputResponsiveContainer>
          );
        }

        if (parameterDisplayType === "select") {
          const options = (() => {
            if (item.row.includes("loanOfficerIdSelectAll")) return loanStaffs;
            if (item.row.includes("loanProductIdSelectAll")) return loanProducts;
            return item.row.includes("OfficeIdSelectOne")
              ? offices
              : item.row.includes("currencyIdSelectAll")
              ? currencies
              : item.row.includes("fundIdSelectAll")
              ? funds
              : item.row.includes("loanPurposeIdSelectAll")
              ? loanPurposes
              : item.row.includes("SavingsAccountSubStatus")
              ? savingsAccountSubStatus
              : [];
          })();

          if (options.length === 0) return null;

          return (
            <InputResponsiveContainer key={index}>
              <Stack>
                <Controller
                  control={control}
                  name={parameterVariable}
                  render={({ field: { value, onChange } }) => (
                    <InputSelect
                      label={`${parameterLabel} *`}
                      options={options}
                      setItem={(value: IKeyValue) => onChange(value)}
                      isValidField={!errors[parameterVariable]}
                      hint={errors[parameterVariable]?.message}
                      value={value}
                      width="100%"
                      defaultValue={parameterDefaultValue}
                    />
                  )}
                />
              </Stack>
            </InputResponsiveContainer>
          );
        }

        if (parameterDisplayType === "text") {
          return (
            <InputResponsiveContainer key={index}>
              <Stack>
                <Controller
                  control={control}
                  name={parameterVariable}
                  render={({ field: { onChange } }) => (
                    <Input
                      label={`${parameterLabel} *`}
                      type="text"
                      onChange={onChange}
                      isValidField={!errors[parameterVariable]}
                      hint={errors[parameterVariable]?.message}
                      width="100%"
                    />
                  )}
                />
              </Stack>
            </InputResponsiveContainer>
          );
        }
      })}

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="decimalPlaces"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Lugares decimales *"
                options={keyValueAdapter(
                  [
                    { label: "0", value: 0 },
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4", value: 4 },
                  ],
                  "label",
                  "value"
                )}
                setItem={(item: IKeyValue) => onChange(item)}
                isValidField={!errors.decimalPlaces}
                hint={errors.decimalPlaces?.message}
                value={value}
                width="100%"
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <Grid xs={12} sx={{ mt: 3 }}>
        <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 2 }}>
          <Button type="button" text="Cancelar" variant="navigation" />
          <Button
            type="submit"
            text="Ejecutar y descargar reporte"
            variant="primary"
            isLoading={isLoading}
            iconLeft
            icon={<DownloadIcon size={20} />}
            disabled={!isFormComplete || Object.keys(errors).length > 0}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
