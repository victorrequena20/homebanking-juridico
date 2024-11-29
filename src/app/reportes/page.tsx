"use client";
import React, { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getAudits } from "@/services/Core.service";
import { toast } from "sonner";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { formatTimestampToSpanishDate } from "@/utilities/common.utility";
import Loader from "@/components/Loader";
import { reports } from "@/constants/global";

export default function Reportes() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [audits, setAudits] = React.useState<any[]>(reports);
  const [allAudits, setAllAudits] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [totalRows, setTotalRows] = React.useState<number>(10);

  const columns: GridColDef<(typeof audits)[number]>[] = [
    {
      field: "id",
      headerName: "ID de Reporte",
      flex: 1,
      valueGetter: (_, row) => `${row.id || ""}`,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 1,
      valueGetter: (_, row) => `${row.fecha || ""} `,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      valueGetter: (_, row) => `${row.estado || ""} `,
    },
    {
      field: "cliente",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (_, row) => `${row?.cliente} `,
    },
    {
      field: "monto",
      headerName: "Monto",
      flex: 1,
      valueGetter: (_, row) => `${row?.monto} `,
    },
    {
      field: "fechaConciliacion",
      headerName: "Fecha de concialiación",
      flex: 1,
      valueGetter: (_, row) => `${row?.fechaConciliacion || ""} `,
    },
  ];

  async function handleGetAudits(page: number, pageSize: number) {
    setIsLoading(true);
    const offset = page * pageSize;
    const response = await getAudits({
      paged: true,
      limit: pageSize,
      offset,
      dateFormat: "dd MMMM yyyy",
      locale: "es",
    });
    if (response?.status === 200) {
      setAudits(reports);
      setTotalRows(response?.data?.totalFilteredRecords || 0);
    } else {
      toast.error("Error al obtener las pistas de auditoría.");
    }
    setIsLoading(false);
  }

  async function handleGetAllAudits() {
    const response = await getAudits({
      paged: true,
      limit: -1, // Sin límite para obtener todos los registros
      offset: 0,
      dateFormat: "dd MMMM yyyy",
      locale: "es",
    });
    if (response?.status === 200) {
      setAllAudits(reports);
    } else {
      toast.error("Error al obtener todas las pistas de auditoría.");
    }
  }

  React.useEffect(() => {
    handleGetAudits(page, pageSize);
    handleGetAllAudits();
  }, [page, pageSize]);

  const handlePaginationChange = (newPagination: GridPaginationModel) => {
    setPage(newPagination.page);
    setPageSize(newPagination.pageSize);
  };

  function convertToCSV(data: any[]): string {
    const headers = [
      "ID de ruta",
      "ID del recurso",
      "Estado",
      "Hecho por",
      "Acción",
      "Entidad",
      "Oficina",
      "Fecha de realización",
      "Inspector",
      "Fecha comprobada",
    ];

    const rows = data.map(row => [
      row.id,
      row.resourceId,
      "",
      row.maker,
      row.actionName,
      row.entityName,
      row.officeName,
      formatTimestampToSpanishDate(row.madeOnDate),
      row.checker,
      formatTimestampToSpanishDate(row.checkedOnDate),
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach(rowArray => {
      let row = rowArray.join(",");
      csvContent += row + "\n";
    });

    return csvContent;
  }

  function downloadCSV(data: any[], filename: string) {
    try {
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Archivo descargado con éxito!"); // Mostrar toast de éxito
    } catch (error) {
      toast.error("Error al descargar el archivo CSV."); // Mostrar toast de error
    }
  }

  return (
    <Suspense fallback={<Loader size="40" color="#484848" />}>
      <Wrapper isLoading={isLoading}>
        <Breadcrumbs title="Reportes y concialiación" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Reportes y conciliación" }]} />

        <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
          <Button
            size="small"
            variant="primary"
            text="Descargar CSV"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() => downloadCSV(allAudits, "reportes.csv")} // Descargar todos los registros
          />
        </Stack>

        <Stack sx={{ mt: 3 }}>
          <DataGrid
            rows={audits}
            columns={columns}
            paginationMode="server"
            rowCount={totalRows}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={handlePaginationChange}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            rowSelection
            onRowClick={params => {
              router.push(`/reportes/run/${params?.row?.id}?id=${params?.row?.id}`);
            }}
          />
        </Stack>
      </Wrapper>
    </Suspense>
  );
}
