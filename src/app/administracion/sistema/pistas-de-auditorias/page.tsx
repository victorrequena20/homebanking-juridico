"use client";
import React from "react";
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

export default function PistasDeAuditoria() {
  const [audits, setAudits] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [totalRows, setTotalRows] = React.useState<number>(10);

  const router = useRouter();
  const columns: GridColDef<(typeof audits)[number]>[] = [
    {
      field: "id",
      headerName: "ID de ruta",
      flex: 1,
      valueGetter: (_, row) => `${row.id || ""}`,
    },
    {
      field: "resourceId",
      headerName: "ID del recurso",
      flex: 1,
      valueGetter: (_, row) => `${row.resourceId || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      valueGetter: (_, row) => `${""} `,
    },
    {
      field: "maker",
      headerName: "Hecho por",
      flex: 1,
      valueGetter: (_, row) => `${row?.maker} `,
    },
    {
      field: "action",
      headerName: "Acción",
      flex: 1,
      valueGetter: (_, row) => `${row?.actionName} `,
    },
    {
      field: "entity",
      headerName: "Entidad",
      flex: 1,
      valueGetter: (_, row) => `${row?.entityName} `,
    },
    {
      field: "office",
      headerName: "Oficina",
      flex: 1,
      valueGetter: (_, row) => `${row?.officeName || ""} `,
    },
    {
      field: "date",
      headerName: "Fecha de realización",
      flex: 1,
      valueGetter: (_, row) => `${formatTimestampToSpanishDate(row?.madeOnDate)} `,
    },
    {
      field: "checker",
      headerName: "Inspector",
      flex: 1,
      valueGetter: (_, row) => `${row?.checker || ""} `,
    },
    {
      field: "checkedOnDate",
      headerName: "Fecha comprobada",
      flex: 1,
      valueGetter: (_, row) => `${formatTimestampToSpanishDate(row?.checkedOnDate) || ""} `,
    },
  ];

  async function handleGetAudits(page: number, pageSize: number) {
    const offset = page * pageSize;
    const response = await getAudits({
      paged: true,
      limit: pageSize,
      offset,
      dateFormat: "dd MMMM yyyy",
      locale: "es",
    });
    if (response?.status === 200) {
      setAudits(response?.data?.pageItems);
      setTotalRows(response?.data?.totalFilteredRecords || 0); // Asegúrate de que `totalFilteredRecords` esté disponible en la respuesta.
    } else {
      toast.error("Error al obtener las pistas de auditoría.");
    }
  }

  React.useEffect(() => {
    handleGetAudits(page, pageSize);
  }, [page, pageSize]);

  const handlePaginationChange = (newPagination: GridPaginationModel) => {
    setPage(newPagination.page);
    setPageSize(newPagination.pageSize);
  };

  return (
    <Wrapper>
      <Breadcrumbs
        title="Pistas de auditoria"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Pistas de auditoria" },
        ]}
      />

      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Descargar CSV"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/sistema/pistas-de-auditorias/")}
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
        />
      </Stack>
    </Wrapper>
  );
}
