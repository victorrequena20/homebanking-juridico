"use client";
import React from "react";
import { alpha, Stack, styled, Typography } from "@mui/material";
import { Link } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { getReports } from "@/services/Reports.service";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

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
      <Breadcrumbs title="Reportes" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Reportes" }]} />

      <Stack sx={{ mt: 5 }}>
        <DataGrid
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
