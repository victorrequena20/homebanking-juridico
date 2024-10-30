"use client";
import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { IKeyValue } from "@/types/common";
import { createCollateralManagement, getTemplateCollateralManagement, getTemplateSeePermanentInstructions } from "@/services/Clients.service";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Input from "@/components/Input";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";

const schema = yup.object().shape({
  type: yup.mixed().required(),
  idClient: yup.mixed().required(),
});

export default function CustomerScreenReports() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [template, setTemplate] = React.useState<any>(null);
  const [employees, setEmployees] = React.useState<any>([{ id: 1 }]);
  const columns: GridColDef<(typeof employees)[number]>[] = [
    {
      field: "client",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
    },
    {
      field: "account",
      headerName: "De la cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
    },
    {
      field: "beneficiary",
      headerName: "Beneficiario",
      flex: 1,
      valueGetter: (value, row) => `${row.officeName || ""} `,
    },
    {
      field: "account",
      headerName: "A la cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
      align: "center",
    },
    {
      field: "amount",
      headerName: "Monto",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
      align: "center",
    },
    {
      field: "validity",
      headerName: "Validez",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
      align: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
      align: "center",
    },
  ];
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const params: { clientId: string } = useParams();
  const router = useRouter();

  async function handleGetTemplate() {
    const response = await getTemplateSeePermanentInstructions(params.clientId);
    if (response?.status === 200) {
      console.warn("data", response.data.transferTypeOptions);
      setTemplate(response.data.transferTypeOptions);
    } else {
      toast.error("Servicio de cierre no disponible");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await createCollateralManagement(params?.clientId?.toString(), {
      collateralId: data.warranty.id,
      quantity: data.quantity.toString(),
    });
    if (response?.status === 200) {
      toast.success("Garantia creada con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al crear la garantia");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTemplate();
  }, []);

  return (
    <Grid xs={10.2} sx={{ overflow: "auto", height: "100%", paddingBottom: 15 }}>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 6,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mt: 3,
          columnGap: 3,
          rowGap: 3,
        }}
        container
        mt={3}
      >
        {/* Type */}
        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Tipo"
                  options={keyValueAdapter(template, "value", "id")}
                  setItem={(item: IKeyValue) => {
                    onChange(item);
                  }}
                  value={value}
                  width="100%"
                  hint={errors.warranty?.message}
                  isValidField={!errors.warranty}
                />
              )}
            />
          </Stack>
        </InputResponsiveContainer>
        {/* ID de cliente */}
        <InputResponsiveContainer>
          <Stack sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="idClient"
              render={({ field: { value, onChange } }) => (
                <Input label="Por ID de cliente" value={value} width="100%" hint={errors.warranty?.message} isValidField={!errors.warranty} />
              )}
            />
          </Stack>
        </InputResponsiveContainer>

        {/* Buttons */}
        <Grid md={10}>
          <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 3 }}>
            <Button
              type="button"
              size="small"
              text="cancelar"
              variant="navigation"
              onClick={() => {
                reset();
              }}
            />
            <Button size="small" text="Filtrar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
          </Stack>
        </Grid>
        <Stack sx={{ mt: 5, width: "100%", overflowX: "auto" }}>
          <Box sx={{ minWidth: "600px" }}>
            <DataGrid
              sx={{ cursor: "pointer" }}
              rows={employees}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                    page: 0,
                  },
                },
              }}
              disableRowSelectionOnClick
              rowSelection
              pageSizeOptions={[10, 25, 50]}
              onRowClick={params => router.push(`/administracion/organizacion/administrar-empleados/${params.row.id}`)}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
