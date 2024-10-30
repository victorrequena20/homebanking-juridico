"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getRoles } from "@/services/Roles.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatusTag from "@/components/Tags/StatusTag";
import EditIcon from "@/assets/icons/EditIcon";

export default function RolsPermitions() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [roles, setRoles] = React.useState<any | null>([]);
  const router = useRouter();

  const columns: GridColDef<(typeof roles)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 3,
      valueGetter: (_, row) => `${row.description || ""}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => <StatusTag isActive={!params.row.status} mode="circle" />,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params =>
        params.row.id !== 1 ? (
          <Stack sx={{ justifyContent: "center", height: "100%" }}>
            <Tooltip placement="top" title="Editar">
              <Box
                className="edit-icon-container"
                sx={{
                  bgcolor: "var(--primary)",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push(`/administracion/sistema/roles-permisos/${params.row.id}/edit`);
                }}
              >
                <EditIcon color="#fff" size={20} />
              </Box>
            </Tooltip>
          </Stack>
        ) : null,
      align: "center",
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getRoles();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setRoles(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administrar roles y permisos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar roles y permisos" },
        ]}
      />

      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear Roles"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/sistema/roles-permisos/create")}
        />
      </Stack>
      <Stack sx={{ mt: 3, width: "100%", overflowX: "auto" }}>
        <Box sx={{ minWidth: "600px" }}>
          <DataGrid
            rows={roles}
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
            onRowClick={(params, event) => {
              if ((event.target as HTMLElement).closest(".edit-icon-container")) return;
              router.push(`/administracion/sistema/config-tareas-realizador-aprobador`);
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        </Box>
      </Stack>
    </Wrapper>
  );
}
// ${params.row.id}
