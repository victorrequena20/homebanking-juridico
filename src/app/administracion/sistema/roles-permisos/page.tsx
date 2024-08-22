"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getRoles } from "@/services/Roles.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function RolsPermitions() {
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
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.disabled === false ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.status === "roles.disabled" ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getRoles();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setRoles(response?.data);
      }
      console.log("🚀 ~ response:", response);
    })();
  }, []);

  return (
    <Wrapper>
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
      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
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
          onRowClick={(params, event, details) =>
            router.push(`/administracion/sistema/config-tareas-realizador-aprobador`)
          }
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
// ${params.row.id}
