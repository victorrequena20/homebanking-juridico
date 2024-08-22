"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@/assets/icons/EditIcon";
import { getConfigurations, updateConfigurations } from "@/services/Core.service";
import Toggle from "@/components/Toggle";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Configuraciones() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [configs, setConfigs] = React.useState<any | null>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof configs)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 2,
      renderCell: params => (
        <Stack sx={{ flexDirection: "row", alignItems: "center", height: "100%", gap: 2 }}>
          <Toggle
            isChecked={params?.row?.enabled}
            label={params?.row?.enabled ? "Activado" : "Desactivado"}
            size="small"
            toggleLeft
            secondaryEffect={() => {
              (async () => {
                const response = await updateConfigurations(
                  {
                    enabled: !params?.row?.enabled,
                  },
                  params?.row?.id
                );
                console.log("🚀 ~ response:", response);
                if (response?.status === 200) {
                  toast.success("Configuración actualizada correctamente");
                  handleGetConfigurations();
                } else {
                  toast.error("Error al actualizar la configuración");
                }
              })();
            }}
          />
        </Stack>
      ),
    },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
      valueGetter: (_, row) => `${row?.value || "0"} `,
    },
    {
      field: "stringValue",
      headerName: "Valor de cadena",
      flex: 1,
      valueGetter: (_, row) => `${row?.stringValue || ""} `,
    },
    {
      field: "dateValue",
      headerName: "Valor de fecha",
      flex: 1,
      valueGetter: (_, row) => `${""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: params => (
        <Stack sx={{ flexDirection: "row", alignItems: "center", height: "100%", gap: 2 }}>
          <Tooltip title="Editar" placement="top">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#153075",
                maxWidth: "36px",
                width: "36px",
                borderRadius: "9px",
                height: "36px",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/administracion/sistema/configuraciones/${params?.row?.id}`);
              }}
            >
              <EditIcon color="#fff" size={20} />
            </Box>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  async function handleGetConfigurations() {
    setIsLoading(true);
    const response = await getConfigurations();
    console.log("🚀 ~ handleGetConfigurations ~ response:", response?.data?.globalConfigurations);
    if (response?.status === 200) {
      setConfigs(response?.data?.globalConfiguration);
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetConfigurations();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Configuraciones"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Configuraciones" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          rows={configs}
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
