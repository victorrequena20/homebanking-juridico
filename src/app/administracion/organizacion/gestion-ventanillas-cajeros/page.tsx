"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Tooltip } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import { formatSpanishDate } from "@/utilities/common.utility";
import { getTellers } from "@/services/Core.service";
import { toast } from "sonner";
import EyeBaseconeIcon from "@/assets/icons/EyeBaseconeIcon";
import NotFoundData from "@/components/NotFoundData";

export default function GestionVentanillasCajeros() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cashiers, setCashiers] = React.useState<any>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof cashiers)[number]>[] = [
    {
      field: "sucursal",
      headerName: "Sucursal",
      flex: 1,
      valueGetter: (value, row) => `${row.officeName || ""}`,
    },
    {
      field: "cashierName",
      headerName: "Nombre del cajero",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.status === "ACTIVE" ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.status === "ACTIVE" ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
    {
      field: "startDate",
      headerName: "Iniciado en",
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row.startDate) || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params => (
        <Stack sx={{ justifyContent: "center", height: "100%" }}>
          <Tooltip placement="top" title="Ver cajeros">
            <Box
              sx={{
                bgcolor: "var(--primary)",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <EyeBaseconeIcon color="#fff" size={16} />
            </Box>
          </Tooltip>
        </Stack>
      ),
      align: "center",
    },
  ];

  async function handleGetTellers() {
    setIsLoading(true);
    const response = await getTellers();
    if (response?.status === 200) {
      setCashiers(response?.data);
    } else {
      toast.error("Ocurrió un error al obtener los cajeros");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTellers();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Gestión de ventanillas y cajeros"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Gestión de ventanillas y cajeros" },
        ]}
      />

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear cajero"
          onClick={() => router.push("/administracion/organizacion/gestion-ventanillas-cajeros/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        {cashiers?.length < 1 ? (
          <NotFoundData mt={12} />
        ) : (
          <DataGrid
            rows={cashiers}
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
        )}
      </Stack>
    </Wrapper>
  );
}
