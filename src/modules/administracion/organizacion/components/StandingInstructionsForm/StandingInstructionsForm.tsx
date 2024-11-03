import React from "react";
import { Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IForm } from "./types";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { StandingInstructionRunHistory } from "@/services/Organization.service";
import InputCalendar from "@/components/InputCalendar";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SearchIcon from "@/assets/icons/SearchIcon";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function StandingInstructionsForm({ instructionsData }: { instructionsData?: any }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [instructions, setInstructions] = React.useState<any>([]);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      clientId: instructionsData?.clientId || "",
      clientName: instructionsData?.clientName || "",
      transferType: instructionsData?.transferType || "",
      accountType: instructionsData?.accountType || "",
      account: instructionsData?.account || "",
      fromDate: "",
      toDate: "",
    },
  });

  const getInstructions = async () => {
    try {
      const params = {
        clientId: "1616",
        clientName: '',
        transferType: '',
        accountType: '',
        account: '',
        fromDate: '',
        toDate: '',
      };
      setIsLoading(true);
      const response = await StandingInstructionRunHistory(params);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getInstructions();
      setIsLoading(false);
    })();
  }, []);

  const columns: GridColDef<(typeof instructions)[number]>[] = [
    {
      field: "clientName",
      headerName: "Del cliente",
      flex: 1,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.clientName || ""}`,
    },
    {
      field: "account",
      headerName: "De la cuenta",
      flex: 1,
      minWidth: 130,
      valueGetter: (value, row) => `${row?.account || ""} `,
    },
    {
      field: "clientId",
      headerName: "Al cliente",
      flex: 1,
      minWidth: 130,
      valueGetter: (value, row) => `${row?.clientName || ""} `,
    },
    {
      field: "transactionDate",
      headerName: "A la cuenta",
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row?.clientName || ""} `,
    },
    {
      field: "time",
      headerName: "Tiempo de ejecución",
      flex: 1,
      minWidth: 110,
      valueGetter: (value, row) => `${row?.time?.value || ""} `,
    },
    {
      field: "amount",
      headerName: "Monto",
      sortable: false,
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row?.amount || ""} `,
    },
    {
      field: "state",
      headerName: "Estado",
      sortable: false,
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row?.state || ""} `,
    },
    {
      field: "register",
      headerName: "Registro de errores",
      sortable: false,
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row?.register || ""} `,
    },
  ];

  const localeText = {
    noRowsLabel: "No hay datos para mostrar", // Personaliza el texto aquí
  };

  const transferTypeOptions = [
    { name: 'Transferencia', value: 'transfer' },
    { name: 'Reembolso préstamo', value:'repayment' },
  ]

  const accountTypeOptions = [
    { name: 'Ahorros', value: 'savings' },
    { name: 'Crédito', value:'loan' },
  ]

  return (
    <Stack>
      <Grid
        component="form"
        onSubmit={handleSubmit(getInstructions)}
        md={12}
        sx={{
          gap: 1,
        }}
        container
        mt={3}
      >
        {/* Nombre de cliente */}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="clientName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nombre de cliente*"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.clientName?.message}
                isValidField={!errors.clientName}
                defaultValue={instructionsData?.clientName}
              />
            )}
          />
        </InputResponsiveContainer>
        {/* Id de cliente */}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="clientId"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Id del cliente*"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.clientId?.message}
                isValidField={!errors.clientId}
                defaultValue={instructionsData?.clientId}
              />
            )}
          />
        </InputResponsiveContainer>
        {/* Tipo de Transferencia */}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="transferType"
            render={({ field: { onChange } }) => (
              <InputSelect
                label="Tipo de transferencia*"
                options={keyValueAdapter(transferTypeOptions, "name", "value")}
                setItem={item => onChange(item)}
                hint={errors.transferType?.message}
                isValidField={!errors.transferType}
                defaultValue={instructionsData?.transferType}
              />
            )}
          />
        </InputResponsiveContainer>
        {/* Tipo de cuenta */}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="accountType"
            render={({ field: { onChange } }) => (
              <InputSelect
                label="Tipo de cuenta*"
                options={keyValueAdapter(accountTypeOptions, "name", "value")}
                setItem={item => onChange(item)}
                hint={errors.accountType?.message}
                isValidField={!errors.accountType}
                defaultValue={instructionsData?.accountType}
              />
            )}
          />
        </InputResponsiveContainer>
        {/* Desde*/}
        <InputResponsiveContainer>
          <Stack>
            <Controller
              control={control}
              name="fromDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar label="Desde la fecha" value={value} onChange={onChange} hint={errors.fromDate?.message} isValidField={!errors.fromDate} />
              )}
            />
          </Stack>
        </InputResponsiveContainer>
        {/* Hasta */}
        <InputResponsiveContainer>
          <Stack>
            <Controller
              control={control}
              name="toDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar label="Hasta la fecha" value={value} onChange={onChange} hint={errors.toDate?.message} isValidField={!errors.toDate} />
              )}
            />
          </Stack>
        </InputResponsiveContainer>
        <Grid xs={12} sx={{ mt: 4, mr: 2 }}>
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "right",
              columnGap: 3,
              px: 1,
            }}
          >
            <Button type="button" size="small" text="Limpiar" variant="navigation" />
            <Button
              type="button"
              icon={<SearchIcon size={20} color="#fff" />}
              size="small"
              text="Instrucciones de búsqueda"
              isLoading={isLoading}
              variant="primary"
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={5}>
        <DataGrid
          rows={instructions}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          disableRowSelectionOnClick
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          loading={isLoadingTable}
          localeText={localeText}
        />
      </Stack>
    </Stack>
  );
}
