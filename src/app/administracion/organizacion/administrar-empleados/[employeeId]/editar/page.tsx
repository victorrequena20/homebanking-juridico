"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import { getStaffById } from "@/services/Core.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import EmployeeForm from "@/modules/administracion/organizacion/components/EmployeeForm";

export default function EmployeeEdit() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [employeeData, setEmployeeData] = React.useState<any>({});
  const params = useParams();

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
        title={`Editar empleado -> ${employeeData?.displayName}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: `Editar empleado` },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <EmployeeForm employeeData={employeeData} />
    </Wrapper>
  );
}
