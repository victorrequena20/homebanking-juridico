"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import NotFoundData from "@/components/NotFoundData";

export default function AdministrarEncuestasPage() {
  const router = useRouter();
  return (
    <Wrapper>
      <Breadcrumbs
        title="Administrar encuestas"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar encuestas" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear encuesta"
            onClick={() => router.push("/administracion/sistema/administrar-encuestas/crear")}
          />
        </Stack>
      </Stack>

      <Stack>
        <NotFoundData title="No hay encuestas para mostrar." />
      </Stack>
    </Wrapper>
  );
}
