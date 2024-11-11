"use client";
import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useAccountData } from "../layout";
import { formatSpanishDate } from "@/utilities/common.utility";
import { formatAmountB } from "@/utilities/amount.utility";
import { Stack, Typography } from "@mui/material";

export default function Transactions() {
  const accountData = useAccountData();
  const transactions = accountData?.transactions;

  const columns: GridColDef<(typeof transactions)[number]>[] = [
    {
      field: "entryId",
      headerName: "Id",
      flex: 1,
      valueGetter: (value, row) => `${row?.id || ""}`,
      minWidth: 80,
      maxWidth: 100
    },
    {
      field: "transactionDate",
      headerName: "Fecha de transacción",
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row?.date) || ""} `,
      minWidth: 200,
    },
    {
      field: "transactionType",
      headerName: "Tipo de transacción",
      flex: 1,
      sortable: false,
      minWidth: 160,
      valueGetter: (value, row) => `${row?.typeOfTransfer === "deposit" ? "Depósito" : ""} `,
    },
    {
      field: "debit",
      headerName: "Débito",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${formatAmountB(row?.debit) || "N/A"} `,
    },
    {
      field: "credit",
      headerName: "Crédito",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${formatAmountB(row?.amount) || ""} `,
    },
    {
      field: "runningBalance",
      headerName: "Saldo",
      sortable: false,
      minWidth: 120,
      valueGetter: (value, row) => `${formatAmountB(row?.runningBalance) || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      minWidth: 80,
    },
  ];

  const showDetails = async (e: GridRowParams) => {
    console.log(e);
  };

  return (
    <Stack mt={4} mx={{xs: 2, md: 6}} mb={15}>
      <Stack sx={{ justifyContent: "center" }} mb={4}>
        <Typography variant="body1" color="var(--secondaryText)">
          Todas las transacciones
        </Typography>
      </Stack>
      <Stack bgcolor={"white"} minWidth={300}>
        <DataGrid
          rows={transactions || []}
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
            "& .MuiDataGrid-overlayWrapper": {
              height: '100px'
            },
          }}
          onRowClick={e => showDetails(e)}
          disableRowSelectionOnClick
          rowSelection
          pageSizeOptions={[10, 25, 50]}
          localeText={{
            noRowsLabel: "No hay datos disponibles",
          }}
        />
      </Stack>
    </Stack>
  );
}
