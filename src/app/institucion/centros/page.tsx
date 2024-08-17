"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CentrosPage() {
  const router = useRouter();

  return (
    <Wrapper>
      <Breadcrumbs title="Centros" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Centros" }]} />

      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Crear centro"
          // onClick={() => router.push("/institucion/clientes/crear")}
        />
      </Stack>
    </Wrapper>
  );
}
