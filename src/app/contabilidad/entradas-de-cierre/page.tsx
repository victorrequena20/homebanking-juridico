"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getClients } from "@/services/Clients.service";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";
import { getGlclosures } from "@/services/Accounting.service";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import NotFoundData from "@/components/NotFoundData";

export default function EntradasDeCierrePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [closures, setClosures] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();
  const columns: GridColDef<(typeof closures)[number]>[] = [
    {
      field: "officeId",
      headerName: "Oficina",
      flex: 1,
      valueGetter: (value, row) => `${row.officeName || ""}`,
    },
    {
      field: "closingDate",
      headerName: "Fecha de cierre",
      flex: 1,
      valueGetter: (value, row) => `${formatDateEsddMMMMyyyy(row?.closingDate) || ""} `,
    },
    {
      field: "comments",
      headerName: "Comentarios",
      flex: 1,
      valueGetter: (value, row) => `${row.comments || ""} `,
    },
    {
      field: "createdByUsername",
      headerName: "Creado por",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.createdByUsername || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getGlclosures();
      if (response?.status === 200) {
        setClosures(response?.data);
      }

      setIsLoading(false);
    })();
  }, []);
  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Entradas de cierre"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Entradas de cierre" },
        ]}
      />

      {closures?.length > 0 ? (
        <Stack sx={{ mt: 5 }}>
          <DataGrid
            sx={{ borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
            rows={closures}
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
            onRowClick={params => router.push(`/contabilidad/entradas-de-cierre/${params?.row?.id}`)}
            pageSizeOptions={[10, 25, 50]}
          />
        </Stack>
      ) : (
        <NotFoundData
          withOutBack
          action={{
            title: "Crear entrada de cierre",
            onClick: () => {
              router.push("/contabilidad/entradas-de-cierre/crear");
            },
          }}
        />
      )}
    </Wrapper>
  );
}
