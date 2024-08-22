"use client";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import ButtonBack from "@/components/ButtonBack";
import Wrapper from "@/components/Wrapper";
import CreateEditUserForm from "@/modules/administracion/usuarios/components/CreateEditUserForm";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateUserPage() {
  const router = useRouter();
  return (
    <Wrapper>
      <Stack sx={{ width: "100%" }}>
        <Breadcrumbs
          title="Crear usuario"
          items={[
            {
              title: "Inicio",
              href: "/dashboard",
            },
            { title: "Administración" },
            { title: "Usuarios" },
          ]}
        />
        <Stack sx={{ mt: 3 }}>
          <ButtonBack />
        </Stack>
        <Stack sx={{ alignItems: "center" }}>
          <CreateEditUserForm close={() => router.push("/administracion/usuarios")} />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
