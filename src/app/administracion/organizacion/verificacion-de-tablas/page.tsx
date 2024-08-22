"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { deleteTableVerification, getEntityDataTablesChecks } from "@/services/Core.service";
import CheckIcon from "@/assets/icons/Checkicon";
import { toast } from "sonner";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import NotFoundData from "@/components/NotFoundData";

export default function VerificacionDeTablasPage() {
  const [idToDelete, setIdToDelete] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const router = useRouter();

  async function handleGetEntityDataTablesChecks() {
    setIsLoading(true);
    const response = await getEntityDataTablesChecks({ offset: 0, limit: 1 });
    console.log("🚀 ~ handleGetEntityDataTablesChecks ~ response:", response);
    if (response?.status === 200) {
      setData(response?.data?.pageItems);
    }
    setIsLoading(false);
  }

  async function handleDelete() {
    const response = await deleteTableVerification(idToDelete);
    if (response?.status === 200) {
      toast.success("Tabla de verificación eliminada correctamente");
      handleGetEntityDataTablesChecks();
    } else {
      toast.error("Error al eliminar la tabla de verificación");
    }
  }

  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: "entity",
      headerName: "Entidad",
      flex: 1,
      valueGetter: (value, row) => `${row?.entity || ""}`,
    },
    {
      field: "productName",
      headerName: "Nombre del producto",
      flex: 1,
      valueGetter: (value, row) => `${row.productName || ""} `,
    },
    {
      field: "dataTaableName",
      headerName: "Tabla de datos",
      flex: 1,
      valueGetter: (value, row) => `${row.datatableName || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      valueGetter: (value, row) => `${row.status?.value || ""} `,
    },
    {
      field: "definedSystema",
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
      align: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      renderCell: params => (
        <Stack sx={{ alignItems: "center", gap: 2, flexDirection: "row", height: "100%" }}>
          <ConfirmDeleteModal
            buttonType="action"
            title="¿Estás seguro de que deseas eliminar esta columna?"
            buttonActionCallback={() => setIdToDelete(params?.row?.id)}
            actionCallback={() => handleDelete()}
          />
        </Stack>
      ),
    },
  ];

  React.useEffect(() => {
    handleGetEntityDataTablesChecks();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Verificación de tablas de la entidad"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Verificación de tablas de la entidad" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear"
            onClick={() => router.push("/administracion/organizacion/verificacion-de-tablas/crear")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 3 }}>
        {data?.length > 0 ? (
          <DataGrid
            rows={data}
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
            onRowClick={params => {
              // router.push(`/institucion/clientes/${params?.row?.id}`);
            }}
          />
        ) : (
          <NotFoundData mt={12} />
        )}
      </Stack>
    </Wrapper>
  );
}
