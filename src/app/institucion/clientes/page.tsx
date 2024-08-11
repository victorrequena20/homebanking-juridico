"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getClients } from "@/services/Clients.service";
import Wrapper from "@/components/Wrapper";

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
    <Grid md={10} sx={{ bgcolor: "#FAFAFA", borderRadius: 8, pt: 6, maxHeight: "100%", overflow: "auto", pb: 4 }}>
      <Wrapper>
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

        <Stack sx={{ mt: 5 }}>
          <DataGrid
            sx={{ borderRadius: "16px", overflow: "hidden" }}
            rows={clients}
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
    </Grid>
  );
}
