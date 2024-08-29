"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import { getAccountingRules, getGlAccounts } from "@/services/Accounting.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import Link from "next/link";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { set } from "react-hook-form";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CatalogoCuentasPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
      setIsLoading(true);
      const response = await getAccountingRules();
      if (response?.status === 200) {
        setGlAccounts(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Reglas de contabilidad"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Reglas de contabilidad" },
        ]}
      />

      <Stack sx={{ alignItems: "center", flexDirection: "row", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          icon={<PlusIcon size={20} color="#fff" />}
          text="Agregar regla"
          iconLeft
          // onClick={() => router.push("/administracion/organizacion/administrar-oficinas/create")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
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
