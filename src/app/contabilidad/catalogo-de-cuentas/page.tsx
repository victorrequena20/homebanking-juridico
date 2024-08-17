"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import { getGlAccounts } from "@/services/Accounting.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import { useRouter } from "next/navigation";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CatalogoCuentasPage() {
  const [glAccounts, setGlAccounts] = React.useState<any[]>([]);
  const router = useRouter();

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
      valueGetter: (value, row) => `${row?.type?.value}`,
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
      field: "manualEntriesAllowes",
      headerName: "Permitir entradas manuales",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.manualEntriesAllowed ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.manualEntriesAllowed ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
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
      <Breadcrumbs
        title="Catálogo de cuentas"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Catálogo de cuentas", href: "/contabilidad/catalogo-de-cuentas" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Añadir cuenta"
            onClick={() => router.push("/contabilidad/catalogo-de-cuentas/crear")}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "8px", overflow: "hidden", curspor: "pointer" }}
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
          onRowClick={params => router.push(`/contabilidad/catalogo-de-cuentas/${params?.row?.id}`)}
          disableRowSelectionOnClick
          rowSelection
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
