"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { getFunds } from "@/services/Funds.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getOffices } from "@/services/Office.service";
import { formatSpanishDate } from "@/utilities/common.utility";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrarOficinas() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any | null>([]);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getOffices();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setOffices(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const columns: GridColDef<(typeof offices)[number]>[] = [
    {
      field: "officeName",
      headerName: "Nombre de la oficina",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (_, row) => `${row.externalId || ""} `,
    },
    {
      field: "parentOffice",
      headerName: "Oficina principal",
      flex: 1,
      valueGetter: (_, row) => `${row.parentName || ""} `,
    },
    {
      field: "openedOn",
      headerName: "Fecha de apertura",
      flex: 1,
      valueGetter: (_, row) => `${formatSpanishDate(row?.openingDate) || ""} `,
    },
  ];

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administrar oficinas"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar oficinas" },
        ]}
      />

      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear oficina"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/organizacion/administrar-oficinas/create")}
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ cursor: "pointer" }}
          rows={offices}
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
            router.push(`/administracion/organizacion/administrar-oficinas/${params.row.id}`);
          }}
        />
      </Stack>
    </Wrapper>
  );
}
