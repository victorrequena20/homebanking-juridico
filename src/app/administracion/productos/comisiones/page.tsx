"use client";
import React from "react";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCommissions } from "@/services/Products.service";
import StatusTag from "@/components/Tags/StatusTag";

export default function ComisionesPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [commissions, setCommissions] = React.useState<any>([{ id: 1 }]);

  const router = useRouter();

  const columns: GridColDef<(typeof commissions)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "chargeAppliesTo",
      headerName: "Se aplica a",
      flex: 1,
      valueGetter: (_, row) => `${row?.chargeAppliesTo?.value || ""}`,
    },
    {
      field: "chargeTimeType",
      headerName: "Tiempo",
      flex: 1,
      valueGetter: (_, row) => `${row?.chargeTimeType?.value || ""}`,
    },
    {
      field: "chargeCalculationType",
      headerName: "Tiempo",
      flex: 1,
      valueGetter: (_, row) => `${row?.chargeCalculationType?.value || ""}`,
    },
    {
      field: "isPaymentType",
      headerName: "Es multa?",
      flex: 1,
      renderCell: params => <StatusTag isActive={params?.row?.isPaymentType} mode="circle" />,
    },
    {
      field: "active",
      headerName: "Activo?",
      flex: 1,
      renderCell: params => <StatusTag isActive={params?.row?.active} mode="circle" />,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getCommissions();
      if (response?.status === 200) {
        setCommissions(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <Wrapper isLoading={isLoading}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Breadcrumbs
          title="Comisiones"
          items={[
            { title: "Inicio", href: "/auth/login" },
            { title: "Administración" },
            { title: "Productos", href: "/administracion/productos" },
            { title: "Comisiones" },
          ]}
        />
      </Stack>

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear cargo"
          onClick={() => router.push("/administracion/productos/comisiones/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
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
          disableRowSelectionOnClick
          rowSelection
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
