"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getOffices } from "@/services/Office.service";
import { getholidaysById, getholidaysByOfficeId } from "@/services/Holidays.service";
import { formatSpanishDate } from "@/utilities/common.utility";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrarFestivos() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any[]>([]);
  const [selectedOffice, setSelectedOffice] = React.useState<string>("");
  const [holidays, setHolidays] = React.useState<any[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getOffices();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setOffices(response.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleSearch = async () => {
    if (!selectedOffice) return;
    setIsLoading(true);
    try {
      const response = await getholidaysByOfficeId(selectedOffice); // Buscar días festivos por ID de la oficina
      if (response?.status === 200) {
        setHolidays(response.data);
      } else {
        setHolidays([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setHolidays([]);
    } finally {
      setIsLoading(false);
    }
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
      valueGetter: (_, row) => `${row.status || ""}`,
    },
  ];

  return (
    <Wrapper isLoading={isLoading}>
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

      <Stack
        sx={{ alignItems: "center", flexDirection: "row", gap: 1, mt: 2 }}
        justifyContent="flex-start"
      >
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="office-select-label">Seleccionar oficina</InputLabel>
          <Select
            labelId="office-select-label"
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            label="Seleccionar oficina"
          >
            {offices?.map((office: any) => (
              <MenuItem key={office.id} value={office.id}>
                {office.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          size="small"
          variant="primary"
          text="Buscar"
          onClick={handleSearch} 
          disabled={!selectedOffice}
          type="button" // Asegura que el botón no actúe como un submit de formulario
        />
      </Stack>

      <Stack sx={{ mt: 3 }}>
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
        />
      </Stack>
    </Wrapper>
  );
}
