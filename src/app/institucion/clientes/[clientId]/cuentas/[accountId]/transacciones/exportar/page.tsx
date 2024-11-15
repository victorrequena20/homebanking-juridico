"use client";
import Button from "@/components/Button";
import InputCalendar from "@/components/InputCalendar";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
export default function Export() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid, dirtyFields },
  } = useForm<any>({
    mode: "onChange",
  });

  return (
    <Stack mt={4} mx={{ xs: 2, md: 6 }} mb={15}>
      <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }} mb={8}>
        <Typography variant="body1" color="var(--secondaryText)">
          Exportar transacciones
        </Typography>
      </Stack>
      <Stack
        sx={{
          mb: 4,
          flexDirection: "row",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <InputResponsiveContainer>
          <Stack>
            <Controller
              control={control}
              name="fromDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar
                  label="Fecha de transacción desde"
                  value={value}
                  onChange={onChange}
                  hint={errors.dateValue?.message}
                  isValidField={!errors.dateValue}
                  width={"360px"}
                />
              )}
            />
          </Stack>
        </InputResponsiveContainer>
        <InputResponsiveContainer>
          <Stack>
            <Controller
              control={control}
              name="toDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar label="Fecha de transacción hasta" value={value} onChange={onChange} width={"360px"} />
              )}
            />
          </Stack>
        </InputResponsiveContainer>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          mt: 3,
        }}
      >
        <Button iconLeft size="small" text="Volver" variant="navigation" />
        <Button iconLeft size="small" text="Generar reporte" />
      </Box>
    </Stack>
  );
}
