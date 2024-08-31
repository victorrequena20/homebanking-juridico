"use client";
import React from "react";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputSelect from "@/components/InputSelect";
import { getRunReportsFullParameterList, getRunReportsOfficeIdSelectOne, runReport } from "@/services/Reports.service";
import { IKeyValue } from "@/types/common";
import { Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/Button";
import { getOffices } from "@/services/Office.service";
import { downloadCSV, generateCSV, transformArray } from "@/utilities/common.utility";

export default function RunReportForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fullParameterList, setFullParameterList] = React.useState<any>([]);
  const [offices, setOffices] = React.useState<any>([]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<any>({ mode: "onChange" });

  async function handleGetFullParameterList() {
    const response = await getRunReportsFullParameterList({
      R_reportListing: "'Client Listing'",
      parameterType: true,
    });
    if (response?.status === 200) {
      setFullParameterList(response?.data);
    } else {
      toast.error("Error al obtener los parametros");
    }
  }

  async function handleGetRunReportsOfficeIdSelectOne() {
    const response = await getRunReportsOfficeIdSelectOne({ parameterType: true });
    if (response?.status === 200) {
      setOffices(transformArray(response?.data?.data));
    } else {
      toast.error("Error al obtener las oficinas");
    }
  }

  async function launchReport(data: any) {
    setIsLoading(true);
    const response = await runReport("Client Listing", {
      R_officeId: data.officeId.value,
      decimalChoice: data.decimalPlaces.value,
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
    // handleGetOffices();
    handleGetFullParameterList();
    handleGetRunReportsOfficeIdSelectOne();
  }, []);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(launchReport)}
      sx={{
        gap: 3,
        maxWidth: "540px",
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
      {/* Office */}
      <Grid xs={12}>
        <Stack sx={{ width: "100%" }}>
          <Controller
            control={control}
            name="officeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Oficina*"
                options={offices}
                setItem={(item: IKeyValue) => onChange(item)}
                isValidField={!errors.officeId}
                hint={errors.officeId?.message}
                value={value}
                width="100%"
              />
            )}
          />
        </Stack>
      </Grid>

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
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", gap: 2 }}>
          <Button type="button" text="Cancelar" variant="navigation" />
          <Button type="button" text="Sacar un reporte" variant="primary" />
          <Button type="submit" text="Ejecutar y descargar reporte" variant="primary" isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
