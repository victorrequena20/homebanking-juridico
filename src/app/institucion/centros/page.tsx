"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getCenters } from "@/services/Core.service";
import StatusTag from "@/components/Tags/StatusTag";

export default function CentrosPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [centers, setCenters] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();
  const columns: GridColDef<(typeof centers)[number]>[] = [
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
      valueGetter: (value, row) => `${row.accountNo || ""} `,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => <StatusTag isActive={params.row.active} />,
      align: "center",
    },
    {
      field: "office",
      headerName: "Oficina",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.officeName || ""} `,
    },
  ];

  async function handleGetCenters() {
    setIsLoading(true);
    const response = await getCenters();
    if (response?.status === 200) {
      setCenters(response?.data);
    }
    console.log("🚀 ~ handleGetCenters ~ response:", response);
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetCenters();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs title="Centros" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Centros" }]} />

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear centro"
          onClick={() => router.push("/institucion/centros/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          rows={centers}
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
