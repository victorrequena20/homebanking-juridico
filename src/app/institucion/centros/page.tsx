"use client";
import React from "react";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CentrosPage() {
  const router = useRouter();

  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Centros</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">Inicio</Typography>
            </Link>
            <Typography variant="body2">Centros</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            variant="primary"
            text="Crear centro"
            // onClick={() => router.push("/institucion/clientes/crear")}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
