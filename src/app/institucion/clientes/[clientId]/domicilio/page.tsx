"use client";
import React from "react";
import NotFoundData from "@/components/NotFoundData";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import ClientAddressForm from "@/modules/institucion/clients/components/ClientAddressForm";

export default function DomicilioPage() {
  const [open, setOpen] = React.useState<boolean>(true);
  const router = useRouter();
  const params = useParams();
  return (
    <Grid xs={10.2} sx={{ px: 10, pt: 6, overflow: "auto" }}>
      <Stack sx={{ px: 6 }}>
        <NotFoundData
          title="No hay datos del domicilio."
          withOutBack
          action={{
            title: "Agregar domicilio",
            onClick: () => {
              // router.push(`/institucion/clientes/${params.clientId}/domicilio/crear`);
            },
          }}
        />
      </Stack>

      {open && (
        <RenderFormModal title="Agregar dirección de cliente" isOpen={open}>
          <ClientAddressForm
            onClose={() => {
              setOpen(false);
            }}
          />
        </RenderFormModal>
      )}
    </Grid>
  );
}
