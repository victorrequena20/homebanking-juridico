"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getSmsCampaignsTemplate } from "@/services/Core.service";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import NotFoundData from "@/components/NotFoundData";

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
      <Breadcrumbs
        title="Campañas de SMS"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Campañas de SMS" },
        ]}
      />
      <Stack sx={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", gap: 2, mt: 2 }}>
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

      <Stack sx={{ mt: 3 }}>
        <NotFoundData title="No hay campañas para mostrar" />
      </Stack>
    </Wrapper>
  );
}
