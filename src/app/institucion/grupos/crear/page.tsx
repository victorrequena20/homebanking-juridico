import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import { Stack } from "@mui/material";
import CreateGroupForm from "@/modules/institucion/grupos/components/CreateGroupForm";

export default function CrearGrupoPage() {
  return (
    <Wrapper>
      <ButtonBack />

      <Stack sx={{ mt: 3 }}>
        <CreateGroupForm />
      </Stack>
    </Wrapper>
  );
}
