"use client";
import React from "react";
import { alpha, Breadcrumbs, Stack, styled, Typography } from "@mui/material";
import { Link } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { getReports } from "@/services/Reports.service";
import Wrapper from "@/components/Wrapper";

export default function ReportsAllPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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

  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
          },
        },
      },
    },
  }));

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    })();
  }, []);

  return (
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
        <StripedDataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
          rows={reports}
          loading={isLoading}
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
          getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
