"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getReports } from "@/services/Reports.service";
import Wrapper from "@/components/Wrapper";

export default function ReportsAllPage() {
  const [reports, setReports] = React.useState<any>([{ id: 1 }]);

  const columns: GridColDef<(typeof reports)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      valueGetter: (value, row) => `${row.type || ""} `,
    },
    {
      field: "category",
      headerName: "Categoria",
      flex: 1,
      valueGetter: (value, row) => `${row.category || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getReports();
      const reportsData = response?.data?.map((el: any) => {
        return {
          id: el?.id,
          name: el?.reportName,
          type: el?.reportType,
          category: el?.reportCategory,
        };
      });
      setReports(reportsData);
    })();
  }, []);

  return (
    <Grid md={10} sx={{ bgcolor: "#FAFAFA", borderRadius: 8, pt: 6, maxHeight: "100%", overflow: "auto", pb: 4 }}>
      <Wrapper>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="h4">Reportes</Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link underline="hover" color="inherit" href="/auth/login">
                <Typography variant="body2">BDC</Typography>
              </Link>
              <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
                <Typography variant="body2">Reportes</Typography>
              </Link>
            </Breadcrumbs>
          </Stack>
        </Stack>

        <Stack sx={{ mt: 5 }}>
          <DataGrid
            sx={{ borderRadius: "16px", overflow: "hidden" }}
            rows={reports}
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
