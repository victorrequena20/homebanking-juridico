"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import { getHooks } from "@/services/Core.service";
import ButtonBack from "@/components/ButtonBack";

export default function GanchosPage() {
  const [loadingHooks, setLoadingHooks] = React.useState<boolean>(false);
  const [hooks, setHooks] = React.useState<any | null>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof hooks)[number]>[] = [
    {
      field: "hookTemplate",
      headerName: "Plantilla de gancho",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "hookName",
      headerName: "Nombre del gancho",
      flex: 1,
      valueGetter: (_, row) => `${row.displayName || ""}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.isActive ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.isActive ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
  ];

  async function handleGetHooks() {
    setLoadingHooks(true);
    const response = await getHooks();
    if (response?.status === 200) {
      setHooks(response?.data);
    }
    setLoadingHooks(false);
  }

  React.useEffect(() => {
    handleGetHooks();
  }, []);

  return (
    <Wrapper isLoading={loadingHooks}>
      <Breadcrumbs
        title="Administrar ganchos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar gachos" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 3 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear gancho"
            onClick={() => router.push("/administracion/sistema/ganchos/crear")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          rows={hooks}
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
