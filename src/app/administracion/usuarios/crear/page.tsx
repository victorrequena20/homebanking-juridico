"use client";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import Button from "@/components/Button";
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
        <Box>
          <Button
            icon={<ArrowLeftIcon size={18} color="#484848" />}
            size="small"
            variant="navigation"
            text="Volver"
            onClick={() => router.push("/administracion/usuarios")}
          />
        </Box>
        <CreateEditUserForm close={() => router.push("/administracion/usuarios")} />
      </Stack>
    </Wrapper>
  );
}
