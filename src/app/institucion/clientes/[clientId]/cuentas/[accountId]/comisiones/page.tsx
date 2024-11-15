"use client";
import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useAccountData } from "../layout";
import { formatSpanishDate } from "@/utilities/common.utility";
import { formatAmountB } from "@/utilities/amount.utility";
import { Stack, Typography } from "@mui/material";

export default function Commissions() {
  const accountData = useAccountData();
  const commissions:any[] = [];

  const columns: GridColDef<(typeof commissions)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""} `,
      minWidth: 200,
    },
    {
      field: "commissionType",
      headerName: "Tipo de comisión",
      flex: 1,
      sortable: false,
      minWidth: 160,
      valueGetter: (value, row) => `${row?.commissionType || ""} `,
    },
    {
      field: "expiredDate",
      headerName: "Pago vencido en",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.expiredDate || ""} `,
    },
    {
      field: "dueFrom",
      headerName: "Vencimiento a partir de",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.dueFrom || ""} `,
    },
    {
      field: "repeat",
      headerName: "Se repite (M/d)",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.repeat || ""} `,
    },
    {
      field: "pending",
      headerName: "Pendiente",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.pending || ""} `,
    },
    {
      field: "paid",
      headerName: "Pagado",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.paid || ""} `,
    },
    {
      field: "resigned",
      headerName: "Renunciado",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.resigned || ""} `,
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
          Comisiones
        </Typography>
      </Stack>
      <Stack bgcolor={"white"} minWidth={300}>
        <DataGrid
          rows={commissions}
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
