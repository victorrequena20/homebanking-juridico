"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getClients } from "@/services/Clients.service";
import { off } from "process";
import HomeIcon from "@/assets/icons/HomeIcon";
import SendIcon from "@/assets/icons/SendIcon";
import BankIcon from "@/assets/icons/BankIcon";
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import ReportIcon from "@/assets/icons/ReportIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import PeopleIcon from "@/assets/icons/PeopleIcon";

export default function Clients() {
  const [clients, setClients] = React.useState<any>([{ id: 1 }]);

  const columns: GridColDef<(typeof clients)[number]>[] = [
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
      const response = await getClients();
      const data = response?.data?.pageItems;
      const clientsData = data.map((el: any) => {
        return {
          id: el?.id,
          name: `${el?.firstname} ${el?.lastname}`,
          accountNumber: el?.accountNo,
          externalId: el?.externalId,
          status: el?.active,
          office: el?.officeName,
        };
      });
      setClients(clientsData?.reverse());
    })();
  }, []);
  return (
    <Grid
      container
      sx={{ backgroundColor: "hsl(0, 0%, 10%)", width: "100%", height: "100vh", maxHeight: "100vh", py: 1, pr: 1 }}
    >
      <Grid md={2} sx={{ bgcolor: "hsl(0, 0%, 10%)", px: 2, pt: 2 }}>
        <Typography variant="body1" color="#fff">
          Banco Digital de Caracas
        </Typography>
        <Stack sx={{ mt: 4 }}>
          <Stack>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <HomeIcon size={24} />
              <Typography variant="body2" color="#fff">
                Dashboard
              </Typography>
            </Box>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <SendIcon size={24} />
              <Typography variant="body2" color="#fff">
                Navegación
              </Typography>
            </Box>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <BankIcon size={24} />
              <Typography variant="body2" color="#fff">
                Institución
              </Typography>
            </Box>
            <Stack sx={{ mt: 1, pl: 4 }}>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2, bgcolor: "hsl(0, 0%, 12%)" }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Clientes
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Grupos
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Centros
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <ChartSquareIcon size={24} />
              <Typography variant="body2" color="#fff">
                Contabilidad
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <ReportIcon size={24} />
              <Typography variant="body2" color="#fff">
                Reportes
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <PersonHexagonalIcon size={24} />
              <Typography variant="body2" color="#fff">
                Administrador
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <PeopleIcon size={24} />
              <Typography variant="body2" color="#fff">
                Autoservicio
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        md={10}
        sx={{ bgcolor: "#FAFAFA", borderRadius: 8, px: 24, pt: 6, maxHeight: "100%", overflow: "auto", pb: 4 }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="h4">Clientes</Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link underline="hover" color="inherit" href="/auth/login">
                <Typography variant="body2">BDC</Typography>
              </Link>
              <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
                <Typography variant="body2">Clientes</Typography>
              </Link>
            </Breadcrumbs>
          </Stack>
          <Stack sx={{ alignItems: "flex-end" }}>
            <Button size="small" variant="primary" text="Crear cliente" />
          </Stack>
        </Stack>

        <Stack sx={{ mt: 3 }}>
          <DataGrid
            sx={{ borderRadius: "16px", overflow: "hidden" }}
            rows={clients}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0,
                },
              },
            }}
            disableRowSelectionOnClick
            rowSelection
            pageSizeOptions={[5, 10, 20]}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
