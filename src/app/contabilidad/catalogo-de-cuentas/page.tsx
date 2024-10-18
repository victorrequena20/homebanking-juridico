"use client";
import React from "react";
import { Box, Stack } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import { getGlAccounts } from "@/services/Accounting.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import { useRouter } from "next/navigation";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatusTag from "@/components/Tags/StatusTag";

export default function CatalogoCuentasPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
      valueGetter: (value, row) => `${row?.type?.value == "INCOME" ? "Ingreso" : "Activo"}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => <StatusTag isActive={!params?.row?.disabled} mode="circle" />,
    },
    {
      field: "manualEntriesAllowes",
      headerName: "Permitir entradas manuales",
      flex: 1,
      renderCell: params => <StatusTag isActive={params?.row?.manualEntriesAllowed} mode="circle" />,
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
      setIsLoading(true);
      const response = await getGlAccounts();
      if (response?.status === 200) {
        console.log(response?.data);

        setGlAccounts(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
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
      <Stack sx={{ mt: 3, width: "100%", overflowX: "auto" }}>
        <Box sx={{ minWidth: "600px" }}>
          <DataGrid
            sx={{ cursor: "pointer" }}
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
        </Box>
      </Stack>
    </Wrapper>
  );
}
