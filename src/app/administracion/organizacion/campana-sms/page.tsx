"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getSmsCampaignsTemplate } from "@/services/Core.service";
import { toast } from "sonner";

export default function CampanaSMSPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const goToCreateCampaignSms = async () => {
    setIsLoading(true);
    const response = await getSmsCampaignsTemplate();
    if (response?.status === 200) {
      router.push("/administracion/organizacion/administrar-fondos/create");
    } else {
      toast.warning("No se encontro ningun proveedor de servicio.");
    }
    setIsLoading(false);
  };

  return (
    <Wrapper isLoading={isLoading}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Campañas de SMS</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">Inicio</Typography>
            </Link>
            <Link color="inherit" href="/administracion/organizacion">
              <Typography variant="body2">Organización</Typography>
            </Link>
            <Typography variant="body2">Campañas de SMS</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
          <Button
            size="small"
            variant="primary"
            text="Crear campaña de SMS"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() => {
              goToCreateCampaignSms();
            }}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
