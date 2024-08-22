"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Link, Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatSpanishDate } from "@/utilities/common.utility";
import { getCodes } from "@/services/Core.service";
import CheckIcon from "@/assets/icons/Checkicon";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function SystemCodes() {
  const [codes, setCodes] = React.useState<any | null>([]);

  const router = useRouter();

  const columns: GridColDef<(typeof codes)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre clave",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "systemDefined",
      headerName: "Sistema definido",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.systemDefined ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.systemDefined ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getCodes();
      if (response?.status === 200) {
        setCodes(response?.data);
      }
      console.log("🚀 ~ response:", response);
    })();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar códigos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar códigos" },
        ]}
      />
      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear código"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/sistema/codigos/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer" }}
          rows={codes}
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
          onRowClick={(params, event, details) => {
            router.push(`/administracion/sistema/codigos/${params.row.id}`);
          }}
        />
      </Stack>
    </Wrapper>
  );
}
