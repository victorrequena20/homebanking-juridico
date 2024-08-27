"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatSpanishDate } from "@/utilities/common.utility";
import { getJournalEntries } from "@/services/Core.service";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { getOffices } from "@/services/Office.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { getGlAccounts } from "@/services/Accounting.service";
import InputCalendar from "@/components/InputCalendar";
import Input from "@/components/Input";
import { dateFormat } from "@/constants/global";

export default function BuscarEntradasDeDiarioPage() {
  const [offices, setOffices] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);
  const [journalEntries, setJournalEntries] = React.useState<any>([]);
  const [glAccounts, setGlAccounts] = React.useState<any>([]);
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
  const columns: GridColDef<(typeof journalEntries)[number]>[] = [
    {
      field: "entryId",
      headerName: "ID de entrada",
      flex: 1,
      valueGetter: (value, row) => `${row?.id || ""}`,
    },
    {
      field: "office",
      headerName: "Oficina",
      flex: 1,
      valueGetter: (value, row) => `${row?.officeName || ""} `,
    },
    {
      field: "transactionDate",
      headerName: "Fecha de transacción",
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row?.transactionDate) || ""} `,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      valueGetter: (value, row) => `${row?.glAccountType?.value || ""} `,
      align: "center",
    },
    {
      field: "submittedOnDate",
      headerName: "Enviado el día",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row?.submittedOnDate) || ""} `,
    },
    {
      field: "accountCode",
      headerName: "Código de cuenta",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row?.glAccountCode) || ""} `,
    },
    {
      field: "accountName",
      headerName: "Nombre de la cuenta",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row?.glAccountName || ""} `,
    },
    {
      field: "currency",
      headerName: "Moneda",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row?.currency?.code || ""} `,
    },
    {
      field: "loan",
      headerName: "Débito",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${(row?.entryType?.value === "DEBIT" && row?.amount) || ""} `,
    },
    {
      field: "loan",
      headerName: "Crédito",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${(row?.entryType?.value === "CREDIT" && row?.amount) || ""} `,
    },
  ];

  async function handleGetJournalEntries(params: any) {
    setIsLoadingTable(true);
    const response = await getJournalEntries(params);
    if (response?.status === 200) {
      setJournalEntries(response?.data?.pageItems);
    }
    setIsLoadingTable(false);
  }

  async function handleGetOffices() {
    const response = await getOffices({ orderBy: "id" });
    if (response?.status === 200) {
      setOffices(response?.data);
    }
  }

  async function handleGetGlAccounts() {
    const response = await getGlAccounts({ usage: 1, manualEntriesAllowed: true, disabled: false });
    if (response?.status === 200) {
      setGlAccounts(response?.data);
    }
  }

  React.useEffect(() => {
    handleGetJournalEntries({
      ...dateFormat,
      offset: 0,
      limit: -1,
      officeId: getValues("officeId"),
      glAccountId: getValues("glAccountId"),
      transactionId: getValues("transactionId"),
      manualEntriesOnly: getValues("manualEntriesOnly") === "true",
      fromDate: getValues("fromDate"),
      toDate: getValues("toDate"),
      submittedOnDateFrom: getValues("submittedOnDateFrom"),
      submittedOnDateTo: getValues("submittedOnDateTo"),
    });
  }, [
    watch("officeId"),
    watch("glAccountId"),
    watch("manualEntriesOnly"),
    watch("fromDate"),
    watch("toDate"),
    watch("submittedOnDateFrom"),
    watch("submittedOnDateTo"),
    watch("transactionId"),
  ]);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      await handleGetOffices();
      await handleGetGlAccounts();
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Buscar entradas de diario"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Buscar entradas de diario" },
        ]}
      />

      <Stack sx={{ mt: 6 }}>
        <Stack
          sx={{
            mb: 4,
            flexDirection: "row",
            gap: 3,
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Stack>
            <Controller
              control={control}
              name="officeId"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Oficina"
                  options={keyValueAdapter(offices, "name", "id")}
                  setItem={value => onChange(value?.value)}
                  defaultValue={value}
                  width="360px"
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="glAccountId"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Nombre o código de cuenta del libro mayor"
                  options={keyValueAdapter(glAccounts, "name", "id")}
                  setItem={value => onChange(value?.value)}
                  defaultValue={value}
                  width="360px"
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="manualEntriesOnly"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Nombre o código de cuenta del libro mayor"
                  options={[
                    { label: "Todas", value: "false" },
                    { label: "Entradas manuales", value: "falses" },
                    { label: "Entradas de sistema", value: "true" },
                  ]}
                  setItem={value => onChange(value?.value)}
                  defaultValue={value}
                  width="360px"
                />
              )}
            />
          </Stack>
        </Stack>
        {/* ---------- */}
        <Stack
          sx={{
            mb: 4,
            flexDirection: "row",
            gap: 3,
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
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
                  width="360px"
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="toDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar label="Fecha de transacción hasta" value={value} onChange={onChange} width="360px" />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="transactionId"
              render={({ field: { onChange, value } }) => (
                <Input label="ID de transacción" type="text" value={value} onChange={onChange} width="360px" />
              )}
            />
          </Stack>
        </Stack>
        {/* ---------- */}
        <Stack
          sx={{
            mb: 4,
            flexDirection: "row",
            gap: 3,
            alignItems: "flex-end",
          }}
        >
          <Stack>
            <Controller
              control={control}
              name="submittedOnDateFrom"
              render={({ field: { onChange, value } }) => (
                <InputCalendar label="Fecha de transacción desde" value={value} onChange={onChange} width="360px" />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="toDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar label="Fecha de transacción hasta" value={value} onChange={onChange} width="360px" />
              )}
            />
          </Stack>
        </Stack>
        <DataGrid
          rows={journalEntries}
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
          loading={isLoadingTable}
        />
      </Stack>
    </Wrapper>
  );
}
