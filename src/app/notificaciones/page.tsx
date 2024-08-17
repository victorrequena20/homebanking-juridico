"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getNotifications } from "@/services/Core.service";
import { convertFromTimestampToSpanishDate } from "@/utilities/common.utility";

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<any>([{ id: 1 }]);
  const columns: GridColDef<(typeof notifications)[number]>[] = [
    {
      field: "notification",
      headerName: "Notificación",
      flex: 1,
      valueGetter: (value, row) => `${row?.content || ""}`,
    },
    {
      field: "createdAt",
      headerName: "Creado en",
      flex: 1,
      valueGetter: (value, row) => `${convertFromTimestampToSpanishDate(row?.createdAt) || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getNotifications();
      if (response?.status === 200) {
        setNotifications(response?.data?.pageItems);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Notificaciones"
        items={[{ title: "Inicio", href: "/dashboard" }, { title: "Notificaciones" }]}
      />

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          sx={{ borderRadius: "8px", overflow: "hidden" }}
          rows={notifications}
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
