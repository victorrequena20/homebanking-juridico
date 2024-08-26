"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import NotFoundData from "@/components/NotFoundData";
import { getTaxesGroups } from "@/services/Products.service";
import { toast } from "sonner";

export default function GruposDeImpuestos() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [taxesGroups, setTaxesGroups] = React.useState<any>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof taxesGroups)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
  ];

  async function handleGetTaxesGroups() {
    setIsLoading(true);
    const response = await getTaxesGroups();
    if (response?.status === 200) {
      setTaxesGroups(response?.data);
    } else {
      toast.error("Error al obtener los grupos de impuestos");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTaxesGroups();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Grupos de impuestos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          {
            title: "Administrar configuraciones de impuesto",
            href: "/administracion/productos/administrar-configuraciones-de-impuestos",
          },
          { title: "Grupos de impuestos" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear componente de impuestos"
            onClick={() => router.push("/institucion/clientes/crear")}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        {taxesGroups?.length > 0 ? (
          <DataGrid
            sx={{ cursor: "pointer" }}
            rows={taxesGroups}
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
            // onRowClick={params => {
            //   router.push(`/institucion/clientes/${params?.row?.id}/general`);
            // }}
          />
        ) : (
          <NotFoundData />
        )}
      </Stack>
    </Wrapper>
  );
}
