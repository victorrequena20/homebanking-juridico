"use client";
import React from "react";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import { getGlAccounts } from "@/services/Accounting.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";

export default function CatalogoCuentasPage() {
  const [glAccounts, setGlAccounts] = React.useState<any[]>([]);

  const columns: GridColDef<(typeof glAccounts)[number]>[] = [
    {
      field: "account",
      headerName: "Cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "accountNumber",
      headerName: "Número de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.glCode || ""} `,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      valueGetter: (value, row) => `ACTIVO`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: !params?.row?.disabled ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {!params?.row?.disabled ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
    {
      field: "letManualentries",
      headerName: "Permitir entradas manuales",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: "#0B845C",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            <CheckIcon size={13} />
          </Box>
        </Box>
      ),
      align: "center",
    },
    {
      field: "usedHow",
      headerName: "Usado como",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.usage?.value || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getGlAccounts();
      if (response?.status === 200) {
        setGlAccounts(response?.data);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Catálogo de cuentas</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Link underline="hover" color="text.primary" href="/contabilidad" aria-current="page">
              <Typography variant="body2">Contabilidad</Typography>
            </Link>
            <Typography variant="body2">Catálogo de cuentas</Typography>
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
