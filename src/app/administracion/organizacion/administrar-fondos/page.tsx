"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Link, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { getFunds } from "@/services/Funds.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrarFondos() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [funds, setFunds] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getFunds();
      if (response?.status === 200) {
        setFunds(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const columns: GridColDef<(typeof funds)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
  ];

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administrar fondos"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar fondos" },
        ]}
      />
      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear fondo"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/organizacion/administrar-fondos/create")}
        />
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          rows={funds}
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
          onRowClick={params => router.push(`/administracion/organizacion/administrar-fondos/${params.row.id}`)}
        />
      </Stack>
    </Wrapper>
  );
}
