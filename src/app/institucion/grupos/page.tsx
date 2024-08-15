"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getGroups } from "@/services/Groups.service";

export default function GruposPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [groups, setGroups] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();

  const columns: GridColDef<(typeof groups)[number]>[] = [
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
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.status ? "#E6F0E2" : "#FF8080",
              width: "120px",
              py: 0.5,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "16px",
            }}
          >
            <Typography variant="body2" fontWeight="600" color={params?.row?.status ? "#76BF66" : "#A02334"}>
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
      const response = await getGroups({ offset: 0, limit: 10, paged: true });
      const data = response?.data?.pageItems;
      const clientsData = data.map((el: any) => {
        return {
          id: el?.id,
          name: el?.name,
          accountNumber: el?.accountNo,
          externalId: el?.externalId,
          status: el?.active,
          office: el?.officeName,
        };
      });
      setGroups(clientsData?.reverse());
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Grupos</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">Inicio</Typography>
            </Link>
            <Typography variant="body2">Grupos</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear grupo"
            onClick={() => router.push("/institucion/grupos/crear")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
          rows={groups}
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
