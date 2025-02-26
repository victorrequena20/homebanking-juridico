"use client";
import React from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { getClients } from "@/services/Clients.service";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatusTag from "@/components/Tags/StatusTag";
import { toast } from "sonner";
import AccountNumberCell from "@/modules/institucion/clients/components/AccountNumberCell";
import { users } from "@/constants/global";
import { formatAmountB } from "@/utilities/amount.utility";

export default function Clients() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [clients, setClients] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();
  const columns: GridColDef<(typeof clients)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row?.name || row.displayName || ""} `,
    },
    {
      field: "accountNumber",
      headerName: "Número de cuenta",
      flex: 1,
      // valueGetter: (value, row) => `${row.accountNumber || ""} `,
      renderCell: params => <AccountNumberCell accountNo={params?.row?.accountNumber} />,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },

    {
      field: "office",
      headerName: "Nomina",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${formatAmountB(row.nomina) || ""} `,
    },
  ];

  async function handleGetClients() {
    // setIsLoading(true);
    // const response = await getClients({ orderBy: "id" });
    // const data = response?.data?.pageItems;
    // const clientsData = data.map((el: any) => {
    //   return {
    //     id: el?.id,
    //     name: el?.firstname ? `${el?.firstname} ${el?.lastname}` : el?.displayName,
    //     displayName: el?.displayName,
    //     accountNumber: el?.accountNo,
    //     externalId: el?.externalId,
    //     status: el?.active,
    //     statusAll: el.status,
    //     office: el?.officeName,
    //   };
    // });
    setClients(users);
    // setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetClients();
  }, []);
  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs title="Pago de nómina" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Institución" }, { title: "Clientes" }]} />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}></Stack>
      </Stack>
      <Stack sx={{ mt: 3, width: "100%", overflowX: "auto" }}>
        <Box sx={{ minWidth: "700px" }}>
          <DataGrid
            sx={{ cursor: "pointer" }}
            rows={clients}
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
              router.push(`/institucion/clientes/${params?.row?.id}/general`);
            }}
          />
        </Box>
      </Stack>
    </Wrapper>
  );
}
