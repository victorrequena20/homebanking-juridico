"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { getStaffs } from "@/services/Core.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatusTag from "@/components/Tags/StatusTag";
import { Box } from "@mui/material";

export default function AdministrarEmpleados() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [employees, setEmployees] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const responseStaffs = await getStaffs({ status: "all" });
      if (responseStaffs?.status === 200) {
        setEmployees(responseStaffs?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const columns: GridColDef<(typeof employees)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.displayName || ""}`,
    },
    {
      field: "isLoanOfficer",
      headerName: "Oficial de créditos",
      flex: 1,
      renderCell: params => <StatusTag isActive={params?.row?.isLoanOfficer} mode="circle" />,
    },
    {
      field: "office",
      headerName: "Oficina",
      flex: 1,
      valueGetter: (value, row) => `${row.officeName || ""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => <StatusTag isActive={params.row.isActive} />,
      align: "center",
    },
  ];

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administrar empleados"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar empleados" },
        ]}
      />

      <Stack sx={{ alignItems: "center", flexDirection: "row", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear empleado"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/organizacion/administrar-empleados/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 5, width: "100%", overflowX: "auto" }}>
        <Box sx={{ minWidth: "600px" }}>
          <DataGrid
            sx={{ cursor: "pointer" }}
            rows={employees}
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
            onRowClick={params => router.push(`/administracion/organizacion/administrar-empleados/${params.row.id}`)}
          />
        </Box>
      </Stack>
    </Wrapper>
  );
}
