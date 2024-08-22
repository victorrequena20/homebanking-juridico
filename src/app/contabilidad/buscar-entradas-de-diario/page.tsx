"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatSpanishDate } from "@/utilities/common.utility";
import { getJournalEntries } from "@/services/Core.service";
import { toast } from "sonner";

export default function BuscarEntradasDeDiarioPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [journalEntries, setJournalEntries] = React.useState<any>([]);
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

  async function handleGetJournalEntries() {
    setIsLoading(true);
    const response = await getJournalEntries();
    if (response?.status === 200) {
      setJournalEntries(response?.data?.pageItems);
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetJournalEntries();
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

      <Stack sx={{ mt: 5 }}>
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
        />
      </Stack>
    </Wrapper>
  );
}
