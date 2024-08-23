"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import NotFoundData from "@/components/NotFoundData";
import ClientIdentifications from "@/modules/institucion/clients/components/ClientIdentifications";

export default function IdentificacionesPage() {
  return (
    <Grid xs={10.2} sx={{ px: 10, pt: 6, overflow: "auto" }}>
      <Stack sx={{ px: 6 }}>
        <ClientIdentifications />
      </Stack>
    </Grid>
  );
}
