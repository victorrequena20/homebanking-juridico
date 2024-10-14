"use client";
import React from "react";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputSelect from "@/components/InputSelect";
import { getRunReportsFullParameterList, getRunReportsOptionsByParamName, runReport } from "@/services/Reports.service";
import { IKeyValue } from "@/types/common";
import { Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/Button";
import { getOffices } from "@/services/Office.service";
import { downloadCSV, generateCSV, transformArray } from "@/utilities/common.utility";
import { useParams } from "next/navigation";
import DownloadIcon from "@/assets/icons/DownloadIcon";
import Input from "@/components/Input";

export default function RunReportForm() {
  const [parametersColumnHeaders, setParametersColumnHeaders] = React.useState<any>([]);
  const [fullParameterList, setFullParameterList] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingParameters, setIsLoadingParameters] = React.useState<boolean>(false);
  const [isLoadingOptions, setIsLoadingOptions] = React.useState<boolean>(false);
  // ----- States for select options -----
  const [offices, setOffices] = React.useState<any>([]);
  const [currencies, setCurrencies] = React.useState<any>([]);
  const [funds, setFunds] = React.useState<any>([]);
  const [loanPurposes, setLoanPurposes] = React.useState<any>([]);
  const [loanStaffs, setLoanStaffs] = React.useState<any>([]);
  const [loanProducts, setLoanProducts] = React.useState<any>([]);
  // ---------------------------------------------------------------
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<any>({ mode: "onChange" });
  const params = useParams();
  const decodeUri = decodeURIComponent(params?.reportName?.toString());

  async function handleGetFullParameterList() {
    setIsLoadingParameters(true);
    const response = await getRunReportsFullParameterList({
      R_reportListing: `'${decodeUri}'`,
      parameterType: true,
    });
    console.log("🚀 ~ handleGetFullParameterList ~ response.data:", response?.data);
    if (response?.status === 200) {
      setFullParameterList(response?.data);
      setParametersColumnHeaders(response?.data?.columnHeaders);
    } else {
      toast.error("Error al obtener los parametros");
    }
    setIsLoadingParameters(false);
  }

  async function handleGetRunReportsOptionsByParamName(paramName: string, params?: any) {
    setIsLoadingOptions(true);
    if (paramName === "loanOfficerIdSelectAll" && getValues("officeId") === undefined) return;
    if (paramName === "loanProductIdSelectAll" && getValues("currencyId") === undefined) return;
    if (paramName === "cycleXSelect") return;
    if (paramName === "cycleYSelect") return;

    const response: any = await getRunReportsOptionsByParamName(paramName, { ...params, parameterType: true });
    if (response?.status === 200) {
      if (paramName === "OfficeIdSelectOne") {
        setOffices(transformArray(response?.data?.data));
      }
      if (paramName === "currencyIdSelectAll") {
        setCurrencies(transformArray(response?.data?.data));
      }
      if (paramName === "fundIdSelectAll") {
        setFunds(transformArray(response?.data?.data));
      }
      if (paramName === "loanPurposeIdSelectAll") {
        setLoanPurposes(transformArray(response?.data?.data));
      }

      if (paramName === "loanOfficerIdSelectAll") {
        setLoanStaffs(transformArray(response?.data?.data));
      }

      if (paramName === "loanProductIdSelectAll") {
        setLoanProducts(transformArray(response?.data?.data));
      }
    } else {
      toast.error("Error al obtener las oficinas");
    }
    setIsLoadingOptions(false);
  }

  async function launchReport(data: any) {
    console.log("🚀 ~ launchReport ~ data:", data);
    setIsLoading(true);
    const response = await runReport(decodeUri, {
      R_officeId: data.officeId?.value,
      R_currencyId: data.currencyId?.value,
      R_fundId: data.fundId?.value,
      R_loanPurposeId: data.loanPurposeId?.value,
      R_loanOfficerId: data.loanOfficerId?.value,
      R_loanProductId: data.loanProductId?.value,
      R_cycleX: data.cycleX,
      R_cycleY: data.cycleY,
      decimalChoice: data.decimalPlaces?.value,
    });
    if (response?.status === 200) {
      const csvContent = await generateCSV(response?.data);
      downloadCSV(csvContent, "reporte.csv");
      toast.success("Reporte generado correctamente");
    } else {
      toast.error("Error al generar el reporte");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetFullParameterList();
  }, []);

  React.useEffect(() => {
    if (parametersColumnHeaders) {
      const parameterNameIndex = parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_name");
      fullParameterList?.data?.map((item: any, index: number) => {
        (async () => {
          await handleGetRunReportsOptionsByParamName(item.row[parameterNameIndex]);
        })();
      });
    }
  }, [parametersColumnHeaders]);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(launchReport)}
      sx={{
        gap: 3,
        maxWidth: "580px",
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
      container
      mt={3}
    >
      {fullParameterList?.data?.map((item: any, index: number) => {
        const parameterNameIndex = parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_name");
        const parameterVariableIndex = parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_variable");
        const parameterLabelIndex = parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_label");
        const parameterDefaultValueIndex = parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_defaultValue");

        if (item.row[parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_displayType")] === "select") {
          return (
            <Grid xs={12} key={index}>
              <Stack>
                <Controller
                  control={control}
                  name={item.row[parameterVariableIndex]}
                  render={({ field: { value, onChange } }) => (
                    <InputSelect
                      label={item.row[parameterLabelIndex] + " *"}
                      options={
                        item.row[parameterNameIndex] === "OfficeIdSelectOne"
                          ? offices
                          : item.row[parameterNameIndex] === "currencyIdSelectAll"
                          ? currencies
                          : item.row[parameterNameIndex] === "fundIdSelectAll"
                          ? funds
                          : item.row[parameterNameIndex] === "loanPurposeIdSelectAll"
                          ? loanPurposes
                          : item.row[parameterNameIndex] === "loanOfficerIdSelectAll"
                          ? loanStaffs
                          : item.row[parameterNameIndex] === "loanProductIdSelectAll"
                          ? loanProducts
                          : []
                      }
                      setItem={(value: IKeyValue) => {
                        onChange(value);
                        // Pide los oficiales de prestamos cuando se selecciona una oficina
                        if (item.row[parameterNameIndex] === "OfficeIdSelectOne") {
                          (async () => {
                            await handleGetRunReportsOptionsByParamName("loanOfficerIdSelectAll", { R_officeId: value.value });
                          })();
                        }
                        // Pide los productos cuando se selecciona una moneda
                        if (item.row[parameterNameIndex] === "currencyIdSelectAll") {
                          (async () => {
                            await handleGetRunReportsOptionsByParamName("loanProductIdSelectAll", { R_currencyId: value.value });
                          })();
                        }
                      }}
                      isValidField={!errors[item.row[parameterNameIndex]]}
                      hint={errors[item.row[parameterNameIndex]?.message]}
                      value={value}
                      width="100%"
                      defaultValue={item.row[parameterDefaultValueIndex]}
                    />
                  )}
                />
              </Stack>
            </Grid>
          );
        }

        if (item.row[parametersColumnHeaders?.findIndex((item: any) => item.columnName === "parameter_displayType")] === "text") {
          return (
            <Grid item xs={12} key={index}>
              <Stack>
                <Controller
                  control={control}
                  name={item.row[parameterVariableIndex]}
                  render={({ field: { onChange } }) => (
                    <Input
                      label={item.row[parameterLabelIndex] + " *"}
                      type="text"
                      onChange={onChange}
                      isValidField={!errors[item.row[parameterNameIndex]]}
                      hint={errors[item.row[parameterNameIndex]?.message]}
                      width="100%"
                    />
                  )}
                />
              </Stack>
            </Grid>
          );
        }
      })}

      {/* Lugares decimales */}
      <Grid xs={12}>
        <Stack>
          <Controller
            control={control}
            name="decimalPlaces"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Lugares decimales *"
                options={keyValueAdapter(
                  [
                    {
                      label: "0",
                      value: 0,
                    },
                    {
                      label: "1",
                      value: 1,
                    },
                    {
                      label: "2",
                      value: 2,
                    },
                    {
                      label: "3",
                      value: 3,
                    },
                    {
                      label: "4",
                      value: 4,
                    },
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
      </Grid>

      {/* Buttons */}
      <Grid xs={12} sx={{ mt: 3 }}>
        <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 2 }}>
          <Button type="button" text="Cancelar" variant="navigation" />
          {/* <Button type="button" text="Sacar un reporte" variant="primary" /> */}
          <Button type="submit" text="Ejecutar y descargar reporte" variant="primary" isLoading={isLoading} iconLeft icon={<DownloadIcon size={20} />} />
        </Stack>
      </Grid>
    </Grid>
  );
}
