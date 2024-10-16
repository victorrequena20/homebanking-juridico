"use client";
import React, { Suspense } from "react";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getReports } from "@/services/Reports.service";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

export default function ReportsAllPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [reports, setReports] = React.useState<any>([]);
  const [filteredReports, setFilteredReports] = React.useState<any>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

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
    const filter = searchParams.get("filter");
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
      let filteredReports = reportsData;
      if (filter === "todos") {
        filteredReports = reportsData;
      }
      if (filter === "clientes") {
        filteredReports = reportsData.filter((report: any) => report?.category?.toLowerCase() === "client");
      }
      if (filter === "creditos") {
        filteredReports = reportsData.filter((report: any) => report?.category?.toLowerCase() === "loan");
      }
      if (filter === "ahorros") {
        filteredReports = reportsData.filter((report: any) => report?.category?.toLowerCase() === "savings");
      }
      if (filter === "fondos") {
        filteredReports = reportsData.filter((report: any) => report?.category?.toLowerCase() === "fund");
      }
      if (filter === "contabilidad") {
        filteredReports = reportsData.filter((report: any) => report?.category?.toLowerCase() === "accounting");
      }
      setFilteredReports(filteredReports);

      setIsLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    const filter = searchParams.get("filter");
    console.log("🚀 ~ React.useEffect ~ filter:", filter);
    let filteredReports = reports;
    if (filter === "todos") {
      filteredReports = reports;
    }
    if (filter === "clientes") {
      filteredReports = reports.filter((report: any) => report?.category?.toLowerCase() === "client");
    }
    if (filter === "creditos") {
      filteredReports = reports.filter((report: any) => report?.category?.toLowerCase() === "loan");
    }
    if (filter === "ahorros") {
      filteredReports = reports.filter((report: any) => report?.category?.toLowerCase() === "savings");
    }
    if (filter === "fondos") {
      filteredReports = reports.filter((report: any) => report?.category?.toLowerCase() === "fund");
    }
    if (filter === "contabilidad") {
      filteredReports = reports.filter((report: any) => report?.category?.toLowerCase() === "accounting");
    }
    console.log("🚀 ~ React.useEffect ~ filteredReports:", filteredReports);
    setFilteredReports(filteredReports);
  }, [searchParams.get("filter")]);

  return (
    <Suspense fallback={<Loader size="40" color="#484848" />}>
      <Wrapper isLoading={isLoading}>
        <Breadcrumbs title="Reportes" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Reportes" }]} />

        <Stack sx={{ mt: 5 }}>
          <DataGrid
            sx={{ cursor: "pointer" }}
            rows={filteredReports}
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
            onRowClick={params => {
              router.push(`/reportes/run/${params?.row?.name}?type=${params?.row?.type}&id=${params?.row?.id}`);
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        </Stack>
      </Wrapper>
    </Suspense>
  );
}
