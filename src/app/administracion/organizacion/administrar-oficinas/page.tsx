"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Breadcrumbs, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { getFunds } from "@/services/Funds.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getOffices } from "@/services/Office.service";
import { formatSpanishDate } from "@/utilities/common.utility";
import Link from "next/link";

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
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Administrar oficinas</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link color="inherit" href="/administracion/organizacion">
              <Typography variant="body2">Organización</Typography>
            </Link>
            <Typography variant="body2">Administrar oficinas</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
          <Button
            size="small"
            variant="primary"
            text="Crear oficina"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() => router.push("/administracion/organizacion/administrar-oficinas/create")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
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
        />
      </Stack>
    </Wrapper>
  );
}
