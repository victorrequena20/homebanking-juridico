"use client";
import React from "react";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getFinancialActivityAccounts, getGlclosures } from "@/services/Accounting.service";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CuentasVinculadasActividadesFinancierasPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [financialActivties, setFinancialActivties] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();

  const columns: GridColDef<(typeof financialActivties)[number]>[] = [
    {
      field: "financialActivityData",
      headerName: "Oficina",
      flex: 1,
      valueGetter: (value, row) => `${row.financialActivityData?.name || ""}`,
    },
    {
      field: "typeAccount",
      headerName: "Tipo de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row?.financialActivityData?.mappedGLAccountType || ""} `,
    },
    {
      field: "glCode",
      headerName: "Código de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.glAccountData?.glCode || ""} `,
    },
    {
      field: "accountName",
      headerName: "Nombre de la cuenta",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.glAccountData?.name || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getFinancialActivityAccounts();
      if (response?.status === 200) {
        setFinancialActivties(response?.data);
      }

      setIsLoading(false);
    })();
  }, []);
  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Mapeos de actividades financieras"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          {
            title: "Mapeos de actividades financieras",
            href: "/contabilidad/cuentas-vinculadas-actividades-financieras",
          },
        ]}
      />

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Definir nueva asignación"
          onClick={() => router.push("/contabilidad/cuentas-vinculadas-actividades-financieras/crear")}
        />
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ cursor: "pointer" }}
          rows={financialActivties}
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
          onRowClick={row => {
            router.push(`/contabilidad/cuentas-vinculadas-actividades-financieras/${row?.row?.id}`);
          }}
        />
      </Stack>
    </Wrapper>
  );
}
