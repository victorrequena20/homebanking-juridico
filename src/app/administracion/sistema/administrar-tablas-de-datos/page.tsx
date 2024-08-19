"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getDataTables } from "@/services/DataTables.service";
import { toast } from "sonner";

export default function AdministrarTablasDeDatos() {
  const [dataTables, setDataTables] = React.useState<any>([]);
  const router = useRouter();
  const columns: GridColDef<(typeof dataTables)[number]>[] = [
    {
      field: "applicationTableName",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.registeredTableName || ""}`,
    },
    {
      field: "associatedWith",
      headerName: "Asociado con",
      flex: 1,
      valueGetter: (value, row) => `${row.applicationTableName || ""} `,
    },
    {
      field: "subtype",
      headerName: "Sub tipo",
      flex: 1,
      valueGetter: (value, row) => `${row.entitySubType || ""} `,
    },
  ];

  async function handleGetDataTables() {
    const response = await getDataTables();
    if (response?.status === 200) {
      setDataTables(
        response.data?.map((el: any) => {
          return {
            ...el,
            id: el?.registeredTableName,
          };
        })
      );
    } else {
      toast.error("Ocurrió un error al obtener las tablas de datos");
    }
  }

  React.useEffect(() => {
    handleGetDataTables();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar tablas de datos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar tablas de datos" },
        ]}
      />

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear tabla de datos"
          onClick={() => router.push("/administracion/sistema/administrar-tablas-de-datos/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          rows={dataTables}
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
          //   router.push(`/institucion/clientes/${params?.row?.id}`);
          // }}
        />
      </Stack>
    </Wrapper>
  );
}
