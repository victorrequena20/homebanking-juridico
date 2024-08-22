"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Toggle from "@/components/Toggle";
import { toast } from "sonner";
import Button from "@/components/Button";
import { getExternalEventsConfiguration, updateExternalEventsConfigurations } from "@/services/Core.service";

export default function GestionarEventosExternosPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingEvents, setIsLoadingEvents] = React.useState<boolean>(false);
  const [externalEvents, setExternalEvents] = React.useState<any[]>([]);
  const [changes, setChanges] = React.useState<{ [key: string]: boolean }>({});

  const handleToggleChange = (id: string, enabled: boolean) => {
    setExternalEvents((prevState: any) =>
      prevState.map((event: any) => (event.id === id ? { ...event, enabled } : event))
    );

    setChanges((prevChanges: any) => ({
      ...prevChanges,
      [id]: enabled,
    }));
  };

  async function applyChanges() {
    setIsLoading(true);
    console.log("CHAGES____", changes);
    const response = await updateExternalEventsConfigurations({
      externalEventConfigurations: changes,
    });
    if (response?.status === 200) {
      toast.success("Cambios aplicados correctamente");
    } else {
      toast.error("Error al aplicar cambios");
    }
    setIsLoading(false);
  }

  const columns: GridColDef<(typeof externalEvents)[number]>[] = [
    {
      field: "eventtype",
      headerName: "Tipo de evento",
      flex: 1,
      valueGetter: (_, row) => `${row.type || ""}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 2,
      renderCell: params => (
        <Stack sx={{ flexDirection: "row", alignItems: "center", height: "100%", gap: 2 }}>
          <Toggle
            isChecked={params?.row?.enabled}
            label={params?.row?.enabled ? "Activado" : "Desactivado"}
            setIsChecked={(value: boolean) => handleToggleChange(params.row.id, value)}
            size="small"
            toggleLeft
          />
        </Stack>
      ),
    },
  ];

  async function handleGetExternalEventsConfiguration() {
    setIsLoadingEvents(true);
    const response = await getExternalEventsConfiguration();
    if (response?.status === 200) {
      setExternalEvents(
        response?.data?.externalEventConfiguration?.map((el: any) => {
          return {
            enabled: el.enabled,
            type: el.type,
            id: el.type,
          };
        })
      );
    } else {
      toast.error("Error al obtener la configuración de eventos externos");
    }
    setIsLoadingEvents(false);
  }

  React.useEffect(() => {
    handleGetExternalEventsConfiguration();
  }, []);

  return (
    <Wrapper isLoading={isLoadingEvents}>
      <Breadcrumbs
        title="Gestionar eventos externos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Gestionar eventos externos" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            size="small"
            variant="primary"
            text="Aplicar cambios"
            isLoading={isLoading}
            disabled={Object.keys(changes).length === 0}
            onClick={() => applyChanges()} // Aquí puedes manejar el envío de los cambios al backend
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <DataGrid
          rows={externalEvents}
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
