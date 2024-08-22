"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAdhocquery } from "@/services/Adhoc.service";

const getReportRunFrequencyLabel = (frequencyId: number) => {
  const frequencyMap: { [key: number]: string } = {
    1: "Diario",
    2: "Semanal",
    3: "Mensual",
    4: "Anual",
    5: "Personalizado",
  };

  return frequencyMap[frequencyId] || "Desconocido";
};

export default function AdhocConsult() {
  const [adhoc, setadhoc] = React.useState<any | null>([]);
  const router = useRouter();

  const columns: GridColDef<(typeof adhoc)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "query",
      headerName: "Consulta query",
      flex: 2,
      valueGetter: (_, row) => `${row.query || ""}`,
    },
    {
      field: "affectedTable",
      headerName: "Tabla Afectada",
      flex: 2,
      valueGetter: (_, row) => `${row.tableName || ""}`,
    },
    {
      field: "mail",
      headerName: "Correo electrónico",
      flex: 2,
      valueGetter: (_, row) => `${row.email || ""}`,
    },
    {
      field: "reportRunFrequency",
      headerName: "Frecuencia de ejecución del reporte",
      flex: 2,
      valueGetter: (_, row) => getReportRunFrequencyLabel(row.reportRunFrequency),
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.isActive === true ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.status === "adhoc.isActive" ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
    {
      field: "createdBy",
      headerName: "Creado por",
      flex: 2,
      valueGetter: (_, row) => `${row.createdBy || ""}`,
    }
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getAdhocquery();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setadhoc(response?.data);
      }
      console.log("🚀 ~ response:", response);
    })();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Consulta Ad Hoc"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/oraganizacion" },
          { title: "Consulta Ad Hoc" },
        ]}
      />

      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear Consulta Ad Hoc"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/organizacion/consulta-ad-hoc/createAdhoc")}
        />
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
          rows={adhoc}
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
          onRowClick={(params, event, details) =>
            router.push(`/administracion/organizacion/config-tareas-realizador-aprobador`)
          }
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
