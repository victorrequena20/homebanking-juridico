"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Box, Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { getPaymentTypes } from "@/services/Core.service";
import { Tooltip } from "@mui/material";
import EditIcon from "@/assets/icons/EditIcon";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";

export default function TipoDePago() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [paymentTypes, setPaymentTypes] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();
  const columns: GridColDef<(typeof paymentTypes)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      valueGetter: (value, row) => `${row.description || ""} `,
    },
    {
      field: "code",
      headerName: "Código",
      flex: 1,
      valueGetter: (value, row) => `${row?.codeName || ""} `,
    },
    {
      field: "isSystemDefined",
      headerName: "Sistema definido",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row?.isSystemDefined ? "Si" : "No" || ""} `,
    },
    {
      field: "isCashPayment",
      headerName: "Pago en efectivo",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row?.isCashPayment ? "Si" : "No" || ""} `,
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
              onClick={() => {}}
            >
              <EditIcon color="#fff" size={20} />
            </Box>
          </Tooltip>
          <ConfirmDeleteModal
            buttonType="action"
            title="¿Estás seguro de que deseas eliminar este tipo de pago?"
            actionCallback={() => {}}
          />
        </Stack>
      ),
    },
  ];

  async function handleGetPaymentTypes() {
    setIsLoading(true);
    const response = await getPaymentTypes();
    if (response?.status === 200) {
      setPaymentTypes(response?.data);
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetPaymentTypes();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Tipo de pago"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Tipo de pago" },
        ]}
      />

      <Stack sx={{ alignItems: "center", flexDirection: "row", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear tipo de pago"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/usuarios/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          rows={paymentTypes}
          columns={columns}
          loading={isLoading}
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
          // onRowClick={(params, event, details) => {
          //   router.push(`/administracion/usuarios/${params.row.userId}`);
          // }}
        />
      </Stack>
    </Wrapper>
  );
}
