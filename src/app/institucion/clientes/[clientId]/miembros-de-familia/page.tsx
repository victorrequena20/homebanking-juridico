"use client";
import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import ClientFamilyMembers from "@/modules/institucion/clients/components/ClientFamilyMembers";

export default function FamilyMembers() {
  return (
    <Grid xs={10.2} sx={{ px: 10, pt: 6, overflow: "auto" }}>
      <Stack sx={{ px: 6 }}>
        <ClientFamilyMembers mode="show" />
      </Stack>
    </Grid>
  );
}
