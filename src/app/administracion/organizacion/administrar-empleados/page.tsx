"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getStaffs } from "@/services/Core.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrarEmpleados() {
  const [employees, setEmployees] = React.useState<any>([{ id: 1 }]);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const responseStaffs = await getStaffs({ status: "all" });
      if (responseStaffs?.status === 200) {
        setEmployees(responseStaffs?.data);
      }
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
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: !params?.row?.disabled ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.isLoanOfficer ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
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
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.isActive ? "#E6F0E2" : "#FF8080",
              width: "120px",
              py: 0.5,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "16px",
            }}
          >
            <Typography variant="body2" fontWeight="600" color={params?.row?.isActive ? "#76BF66" : "#A02334"}>
              {params.row.isActive ? "Activo" : "Inactivo"}
            </Typography>
          </Box>
        </Box>
      ),
      align: "center",
    },
  ];

  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar empleados"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Orgnización", href: "/administracion/organizacion" },
          { title: "Administrar empleados" },
        ]}
      />

      <Stack sx={{ alignItems: "center", flexDirection: "row", justifyContent: "flex-end", gap: 2 }}>
        <Button
          size="small"
          variant="primary"
          text="Crear empleado"
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          onClick={() => router.push("/administracion/organizacion/administrar-empleados/crear")}
        />
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
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
        />
      </Stack>
    </Wrapper>
  );
}
