"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getOffices } from "@/services/Office.service";
import { getholidaysByOfficeId } from "@/services/Holidays.service";
import { formatSpanishDate } from "@/utilities/common.utility";
import Breadcrumbs from "@/components/Breadcrumbs";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import NotFoundData from "@/components/NotFoundData";

export default function AdministrarFestivos() {
  const [isLoadingOffices, setIsLoadingOffices] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any[]>([]);
  const [holidays, setHolidays] = React.useState<any[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      setIsLoadingOffices(true);
      const response = await getOffices();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setOffices(response.data);
      }
      setIsLoadingOffices(false);
    })();
  }, []);

  const handleSearch = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getholidaysByOfficeId(id);
      if (response?.status === 200) {
        setHolidays(response.data);
      } else {
        setHolidays([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setHolidays([]);
    }
    setIsLoading(false);
  };

  const holidayColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre del festivo",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "fromDate",
      headerName: "Fecha de Inicio",
      flex: 1,
      valueGetter: (_, row) => `${formatSpanishDate(row.fromDate) || ""}`,
    },
    {
      field: "toDate",
      headerName: "Fecha final",
      flex: 1,
      valueGetter: (_, row) => `${formatSpanishDate(row.toDate) || ""}`,
    },
    {
      field: "reschedulingType",
      headerName: "Reembolso Programados",
      flex: 1,
      valueGetter: (_, row) => `${row.reschedulingType || ""}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      valueGetter: (_, row) => `${row.status?.value || ""}`,
    },
  ];

  return (
    <Wrapper isLoading={isLoadingOffices}>
      <Breadcrumbs
        title="Administrar festivos"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar festivos" },
        ]}
      />

      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear día festivo"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/organizacion/administrar-festivos/create")}
        />
      </Stack>

      <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 1, mt: 2 }} justifyContent="flex-start">
        <InputSelect
          label="Oficinas"
          options={keyValueAdapter(offices, "name", "id")}
          setItem={item => {
            handleSearch(item?.value?.toString());
          }}
        />
      </Stack>

      <Stack sx={{ mt: 3, width: "100%", overflowX: "auto" }}>
        <Box sx={{ minWidth: "700px" }}>
          {holidays?.length > 0 ? (
            <DataGrid
              rows={holidays || []}
              columns={holidayColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                    page: 0,
                  },
                },
              }}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              loading={isLoading}
              onRowClick={row => {
                router.push(`/administracion/organizacion/administrar-festivos/${row?.row?.id}`);
              }}
            />
          ) : (
            <NotFoundData
              title="No hay días festivos asociados a esta oficina."
              withOutBack
              action={{
                title: "Crear día festivo",
                onClick: () => router.push("/administracion/organizacion/administrar-festivos/create"),
              }}
            />
          )}
        </Box>
      </Stack>
    </Wrapper>
  );
}
