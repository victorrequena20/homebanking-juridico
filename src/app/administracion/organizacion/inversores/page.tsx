"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { searchExternalAssetOwners } from "@/services/Core.service";
import { toast } from "sonner";
import NotFoundData from "@/components/NotFoundData";

export default function Inversores() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [inversores, setInversores] = React.useState<any | null>([]);

  const columns: GridColDef<(typeof inversores)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "accountNumber",
      headerName: "Número de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.accountNumber || ""} `,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
    {
      field: "office",
      headerName: "Oficina",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.office || ""} `,
    },
  ];

  async function handleSearchExternalAssetOwners() {
    setIsLoading(true);
    const response = await searchExternalAssetOwners();
    if (response?.status === 200) {
      setInversores(response?.data);
    } else {
      toast.error("Error al cargar inversores");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleSearchExternalAssetOwners();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Inversores"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Inversores" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        {inversores?.length > 0 ? (
          <DataGrid
            rows={inversores}
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
