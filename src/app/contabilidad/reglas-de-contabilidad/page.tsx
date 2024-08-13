"use client";
import React from "react";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import { getAccountingRules, getGlAccounts } from "@/services/Accounting.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";

export default function CatalogoCuentasPage() {
  const [glAccounts, setGlAccounts] = React.useState<any[]>([]);

  const columns: GridColDef<(typeof glAccounts)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "office",
      headerName: "Oficina",
      flex: 0.5,
      valueGetter: (value, row) => `${row.officeName || ""} `,
    },
    {
      field: "debitTags",
      headerName: "Etiquetas de débito",
      flex: 1,
      valueGetter: (value, row) => ``,
    },
    {
      field: "debitAccount",
      headerName: "Cuenta de débito",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex", flexWrap: "wrap" }}>
          <Typography variant="body2">{params?.row?.debitAccounts[0]?.name}</Typography>
        </Box>
      ),
    },
    {
      field: "creditTags",
      headerName: "Etiquetas de crédito",
      flex: 1,
      valueGetter: (value, row) => ``,
    },
    {
      field: "creditAccount",
      headerName: "Cuenta de crédito",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 2,
      valueGetter: (value, row) => `${row?.creditAccounts[0]?.name || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getAccountingRules();
      if (response?.status === 200) {
        setGlAccounts(response?.data);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Link underline="hover" color="text.primary" href="/contabilidad" aria-current="page">
              <Typography variant="body2">Contabilidad</Typography>
            </Link>
            <Typography variant="body2">Reglas contables</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
          rows={glAccounts}
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
