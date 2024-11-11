"use client";
import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { formatSpanishDate } from "@/utilities/common.utility";
import { formatAmountB } from "@/utilities/amount.utility";
import { Stack, Typography } from "@mui/material";
import { getDocumentsById } from "@/services/AccountDetails.service";

export default function Documents({ params }: { params: { accountId: string } }) {
  const [documents, setDocuments] = React.useState<any>([]);

  const columns: GridColDef<(typeof documents)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""} `,
      minWidth: 200,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      sortable: false,
      minWidth: 160,
      valueGetter: (value, row) => `${row?.description || ""} `,
    },
    {
      field: "fileName",
      headerName: "Nombre del archivo",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${row?.fileName || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      minWidth: 80,
    },
  ];

  async function getDocuments() {
    await getDocumentsById(params.accountId).then(response => {
      console.log("🚀 ~ getDocuments", response.data);
      setDocuments(response.data);
    });
  }

  const showDetails = async (e: GridRowParams) => {
    console.log(e);
  };

  React.useEffect(() => {
    getDocuments();
  }, []);

  return (
    <Stack mt={4} mx={{ xs: 2, md: 6 }} mb={15}>
      <Stack sx={{ justifyContent: "center" }} mb={4}>
        <Typography variant="body1" color="var(--secondaryText)">
          Documentos
        </Typography>
      </Stack>
      <Stack bgcolor={"white"} minWidth={300}>
        <DataGrid
          rows={documents}
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
              height: "100px",
            },
          }}
          onRowClick={e => showDetails(e)}
          disableRowSelectionOnClick
          rowSelection
          pageSizeOptions={[10, 25, 50]}
          localeText={{
            noRowsLabel: "No hay documentos",
          }}
        />
      </Stack>
    </Stack>
  );
}
