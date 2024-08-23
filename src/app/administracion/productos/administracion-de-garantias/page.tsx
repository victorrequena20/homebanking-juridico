"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import { getGuarantees } from "@/services/Products.service";
import NotFoundData from "@/components/NotFoundData";

export default function AdministracionDeGarantias() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [guarantees, setGuarantees] = React.useState<any>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof guarantees)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "type/quality",
      headerName: "Tipo/Calidad",
      flex: 1,
      valueGetter: (value, row) => `${row.quality || ""} `,
    },
    {
      field: "priceBase",
      headerName: "Precio base",
      flex: 1,
      valueGetter: (value, row) => `${row.basePrice || ""} `,
    },
    {
      field: "basePercentage",
      headerName: "Procentaje de base",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.pctToBase || ""} `,
    },
    {
      field: "unityType",
      headerName: "Tipo de unidad",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.unitType || ""} `,
    },
  ];

  async function handleGetGuarantees() {
    setIsLoading(true);
    const response = await getGuarantees();
    if (response?.status === 200) {
      setGuarantees(response?.data);
    } else {
      toast.error("Error al obtener las garantias");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetGuarantees();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administración de garantias"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Administración de garantias" },
        ]}
      />

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear garantia"
          onClick={() => router.push("/administracion/productos/administracion-de-garantias/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        {guarantees?.length > 0 ? (
          <DataGrid
            rows={guarantees}
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
        ) : (
          <NotFoundData />
        )}
      </Stack>
    </Wrapper>
  );
}
