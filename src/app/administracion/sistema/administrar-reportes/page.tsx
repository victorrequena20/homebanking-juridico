"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getClients } from "@/services/Clients.service";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getReports } from "@/services/Reports.service";
import StatusTag from "@/components/Tags/StatusTag";

export default function AdminReportsPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [reports, setReports] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();
  const columns: GridColDef<(typeof reports)[number]>[] = [
    {
      field: "reportName",
      headerName: "Nombre del reporte",
      flex: 1,
      valueGetter: (value, row) => `${row.reportName || ""}`,
    },
    {
      field: "reportType",
      headerName: "Tipo de reporte",
      flex: 1,
      valueGetter: (value, row) => `${row?.reportType || ""} `,
    },
    {
      field: "reportSubType",
      headerName: "Sub tipo del reporte",
      flex: 1,
      valueGetter: (value, row) => `${row?.reportSubType || ""} `,
    },
    {
      field: "reportCategory",
      headerName: "Categoria del reporte",
      flex: 1,
      valueGetter: (value, row) => `${row?.reportCategory || ""} `,
    },
    {
      field: "coreReport",
      headerName: "Reporte principal",
      flex: 1,
      renderCell: params => <StatusTag isActive={params.row?.coreReport} trueText="SI" falseText="NO" />,
      align: "center",
    },
    {
      field: "userReport",
      headerName: "Reporte de usuario",
      flex: 1,
      renderCell: params => <StatusTag isActive={params.row?.useReport} trueText="SI" falseText="NO" />,
      align: "center",
    },
  ];

  async function handleGetReports() {
    setIsLoading(true);
    const response = await getReports();
    setReports(response?.data);
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetReports();
  }, []);
  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administrar reportes"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar reportes" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear reporte"
            onClick={() => router.push("/administracion/sistema/administrar-reportes/crear")}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "8px", overflow: "hidden" }}
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
  );
}
