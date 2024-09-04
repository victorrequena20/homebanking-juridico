"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { getStaffById } from "@/services/Core.service";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { flexRowCenter } from "@/styles/GlobalsMUI";
import { formatSpanishDate } from "@/utilities/common.utility";

export default function EmployeeDetails() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [employeeData, setEmployeeData] = React.useState<any>({});
  const params = useParams();
  const router = useRouter();

  async function handleGetEmployeeData() {
    setIsLoading(true);
    const response = await getStaffById(params?.employeeId, { tenplate: true });
    if (response?.status === 200) {
      setEmployeeData(response?.data);
    } else {
      toast.error("Error al obtener los datos del empleado.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetEmployeeData();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={`Administrar empleados -> ${employeeData?.displayName}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: `Administrar empleados` },
        ]}
      />
      <Stack sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight="400" color="#606778">
          Los detalles de este empleado se encuentran debajo.
        </Typography>
      </Stack>
      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #cccccc80",
            pb: 2,
          }}
        >
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Detalles de la oficina
          </Typography>
          <Box
            sx={{ ...flexRowCenter, gap: 1 }}
            onClick={() => {
              router.push(`/administracion/organizacion/administrar-empleados/${params?.employeeId}/editar`);
            }}
          >
            <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
              Ver y editar
            </Typography>
            <ArrowRightIcon size={16} color="var(--secondaryText)" />
          </Box>
        </Stack>
        {/* Nombre */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Nombre
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {employeeData?.firstname}
          </Typography>
        </Stack>
        {/* Apellido */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Apellido
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {employeeData?.lastname}
          </Typography>
        </Stack>
        {/* Oficina */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Oficina
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {employeeData?.officeName}
          </Typography>
        </Stack>
        {/* Es oficial de créditos */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Es oficial de créditos
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {employeeData?.isLoanOfficer ? "Sí" : "No"}
          </Typography>
        </Stack>
        {/* Numero de movil */}
        {employeeData?.mobileNo && (
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Número de móvil para SMS
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {employeeData?.mobileNo}
            </Typography>
          </Stack>
        )}
        {/* Estado */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Estado
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {employeeData?.isActive ? "Activo" : "Inactivo"}
          </Typography>
        </Stack>
        {/* Día de ingreso */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Día de ingreso
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {formatSpanishDate(employeeData?.joiningDate) || ""}
          </Typography>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
