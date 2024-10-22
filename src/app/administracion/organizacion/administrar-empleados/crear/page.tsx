"use client";
import React from "react";
import { Stack } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonBack from "@/components/ButtonBack";
import EmployeeForm from "@/modules/administracion/organizacion/components/EmployeeForm";

export default function CreateEmployeePage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear empleado"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Orgnización", href: "/administracion/organizacion" },
          { title: "Administrar empleados", href: "/administracion/organizacion/administrar-empleados" },
          { title: "Crear empleado" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        <EmployeeForm />
      </Stack>
    </Wrapper>
  );
}
