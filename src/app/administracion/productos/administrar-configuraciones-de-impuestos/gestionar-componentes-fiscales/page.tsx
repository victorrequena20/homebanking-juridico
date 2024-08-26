"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import NotFoundData from "@/components/NotFoundData";
import AccountNumberCell from "@/modules/institucion/clients/components/AccountNumberCell";
import StatusTag from "@/components/Tags/StatusTag";
import { getTaxesComponents } from "@/services/Products.service";
import { toast } from "sonner";
import { formatSpanishDate } from "@/utilities/common.utility";

export default function GestionarComponentesFiscalesPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [taxesComponents, setTaxesComponents] = React.useState<any>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof taxesComponents)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "percentage",
      headerName: "Porcentaje %",
      flex: 1,
      valueGetter: (value, row) => `${row.percentage || ""} `,
    },
    {
      field: "dateStart",
      headerName: "Fecha de inicio",
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row.startDate) || ""} `,
    },
    {
      field: "account",
      headerName: "Cuenta",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row?.creditAccount?.glCode || ""} `,
    },
  ];

  async function handleGetTaxesComponents() {
    setIsLoading(true);
    const response = await getTaxesComponents();
    if (response?.status === 200) {
      setTaxesComponents(response?.data);
    } else {
      toast.error("Error al obtener los componentes fiscales");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetTaxesComponents();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Componentes tributarios"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          {
            title: "Administrar configuraciones de impuesto",
            href: "/administracion/productos/administrar-configuraciones-de-impuestos",
          },
          { title: "Componentes tributarios" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear componente de impuestos"
            onClick={() => router.push("/institucion/clientes/crear")}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        {taxesComponents?.length > 0 ? (
          <DataGrid
            sx={{ cursor: "pointer" }}
            rows={taxesComponents}
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
            // onRowClick={params => {
            //   router.push(`/institucion/clientes/${params?.row?.id}/general`);
            // }}
          />
        ) : (
          <NotFoundData />
        )}
      </Stack>
    </Wrapper>
  );
}
