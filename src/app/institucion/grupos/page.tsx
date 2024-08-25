"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getGroups } from "@/services/Groups.service";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatusTag from "@/components/Tags/StatusTag";

export default function GruposPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [groups, setGroups] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();

  const columns: GridColDef<(typeof groups)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "accountNumber",
      headerName: "Número de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.accountNumber || ""} `,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => <StatusTag isActive={params.row.status} />,
      align: "center",
    },
    {
      field: "office",
      headerName: "Oficina",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.office || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getGroups({ offset: 0, limit: 10, paged: true });
      const data = response?.data?.pageItems;
      const clientsData = data.map((el: any) => {
        return {
          id: el?.id,
          name: el?.name,
          accountNumber: el?.accountNo,
          externalId: el?.externalId,
          status: el?.active,
          office: el?.officeName,
        };
      });
      setGroups(clientsData?.reverse());
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs title="Grupos" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Grupos" }]} />
      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear grupo"
          onClick={() => router.push("/institucion/grupos/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          rows={groups}
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
