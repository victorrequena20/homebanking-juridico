"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import StatusTag from "@/components/Tags/StatusTag";
import { getFloatingRates } from "@/services/Core.service";
import { toast } from "sonner";

export default function TasasVariablesPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [floatingRates, setFloatingRates] = React.useState<any>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof floatingRates)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "createdBy",
      headerName: "Creado por",
      flex: 1,
      valueGetter: (value, row) => `${row.createdBy || ""} `,
    },
    {
      field: "isBaseLendingRate",
      headerName: "¿Es la tasa base de Créditos?",
      flex: 1,
      renderCell: params => <StatusTag isActive={params?.row?.isBaseLendingRate} mode="circle" />,
    },
    {
      field: "active",
      headerName: "Activo",
      flex: 1,
      renderCell: params => <StatusTag isActive={params?.row?.isActive} mode="circle" />,
      align: "center",
    },
  ];

  async function handleGetFloatingRates() {
    setIsLoading(true);
    const response = await getFloatingRates();
    if (response?.status === 200) {
      setFloatingRates(response?.data);
    } else {
      toast.error("Error al obtener las tasas variables");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetFloatingRates();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Tasas variables"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Tasas variables" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear tasa variable"
            onClick={() => router.push("/institucion/clientes/crear")}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ cursor: "pointer" }}
          rows={floatingRates}
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
          onRowClick={params => {
            router.push(`/institucion/clientes/${params?.row?.id}/general`);
          }}
        />
      </Stack>
    </Wrapper>
  );
}
