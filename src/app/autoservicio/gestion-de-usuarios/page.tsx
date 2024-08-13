"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getUsers } from "@/services/Users.service";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import LockIcon from "@/assets/icons/LockIcon";
import VerifyIcon from "@/assets/icons/VerifyIcon";
import { useRouter } from "next/navigation";

export default function SelfManagementUserManagementPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<any>([{ id: 1 }]);

  const router = useRouter();

  const columns: GridColDef<(typeof users)[number]>[] = [
    {
      field: "username",
      headerName: "Nombre de usuario",
      flex: 1,
      valueGetter: (value, row) => `${row.username || ""}`,
    },
    {
      field: "userId",
      headerName: "Id de usuario",
      flex: 1,
      valueGetter: (value, row) => `${row.id || ""} `,
    },
    {
      field: "email",
      headerName: "Correo eléctronico",
      flex: 1,
      valueGetter: (value, row) => `${row.email || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: "#E6F0E2",
              width: "120px",
              py: 0.5,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "16px",
            }}
          >
            <Typography variant="body2" fontWeight="600" color="#76BF66">
              {params.row.status ? "Activo" : "Inactivo"}
            </Typography>
          </Box>
        </Box>
      ),
      align: "center",
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

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getUsers();
      const clientsData = response?.data.map((el: any) => {
        return {
          id: el?.id,
          username: el?.username,
          userId: el?.id,
          email: el?.email,
          status: el?.isSelfServiceUser,
          office: el?.officeName,
        };
      });
      setUsers(clientsData?.reverse());
      setIsLoading(false);
    })();
  }, []);
  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Gestión de usuarios</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link underline="hover" color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Autoservicio</Typography>
            <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
              <Typography variant="body2">Gestión de usuarios</Typography>
            </Link>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
          <Button size="small" variant="success" text="Activar" icon={<VerifyIcon size={20} color="#fff" />} />
          <Button size="small" variant="warning-red" text="Desactivar" icon={<LockIcon size={20} color="#fff" />} />
          <Button size="small" variant="primary" text="Crear usuario" icon={<PlusIcon size={24} color="#fff" />} />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
          rows={users}
          columns={columns}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          disableRowSelectionOnClick
          checkboxSelection
          rowSelection
          onRowClick={(params, event, details) => {
            router.push(`/autoservicio/gestion-de-usuarios/${params.row.userId}`);
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
