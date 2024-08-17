"use client";
import React from "react";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getUsers } from "@/services/Users.service";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";

export default function AdministrationUsersPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();

  const columns: GridColDef<(typeof users)[number]>[] = [
    {
      field: "firstname",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.firstname || ""}`,
    },
    {
      field: "lastname",
      headerName: "Apellido",
      flex: 1,
      valueGetter: (value, row) => `${row.lastname || ""} `,
    },
    {
      field: "email",
      headerName: "Correo eléctronico",
      flex: 1,
      valueGetter: (value, row) => `${row.email || ""} `,
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
          firstname: el?.firstname,
          lastname: el?.lastname,
          userId: el?.id,
          email: el?.email,
          status: el?.isSelfServiceUser,
          office: el?.officeName,
        };
      });
      setUsers(clientsData);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Usuarios</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link underline="hover" color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
              <Typography variant="body2">Usuarios</Typography>
            </Link>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
          <Button
            size="small"
            variant="primary"
            text="Crear usuario"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() => router.push("/administracion/usuarios/crear")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer" }}
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
          rowSelection
          pageSizeOptions={[10, 25, 50]}
          onRowClick={(params, event, details) => {
            router.push(`/administracion/usuarios/${params.row.userId}`);
          }}
        />
      </Stack>
    </Wrapper>
  );
}
