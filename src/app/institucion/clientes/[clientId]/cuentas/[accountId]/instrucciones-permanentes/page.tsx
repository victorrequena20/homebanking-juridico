"use client";
import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useAccountData } from "../layout";
import { formatSpanishDate } from "@/utilities/common.utility";
import { formatAmountB } from "@/utilities/amount.utility";
import { Stack, Typography } from "@mui/material";

export default function StandingInstructions() {
  const accountData = useAccountData();
  const standingInstructions:any[] = [];

  const columns: GridColDef<(typeof standingInstructions)[number]>[] = [
    {
      field: "client",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (value, row) => `${row.client || ""} `,
      minWidth: 200,
    },
    {
      field: "fromAccount",
      headerName: "Desde la cuenta",
      flex: 1,
      sortable: false,
      minWidth: 160,
      valueGetter: (value, row) => `${row?.fromAccount || ""} `,
    },
    {
      field: "Beneficiary",
      headerName: "Beneficiario",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.beneficiary || ""} `,
    },
    {
      field: "toAccount",
      headerName: "A la cuenta",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.toAccount || ""} `,
    },
    {
      field: "amount",
      headerName: "Monto",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.amount || ""} `,
    },
    {
      field: "validity",
      headerName: "Validez",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.validity || ""} `,
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
          Todas las instrucciones permanentes
        </Typography>
      </Stack>
      <Stack bgcolor={"white"} minWidth={300}>
        <DataGrid
          rows={standingInstructions}
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
          disableRowSelectionOnClick
          rowSelection
          pageSizeOptions={[10, 25, 50]}
          localeText={{
            noRowsLabel: "No hay datos disponibles",
          }}
          onRowClick={e => showDetails(e)}
        />
      </Stack>
    </Stack>
  );
}
