import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import IntermediateMenuItem from "@/components/IntermediateMenuItem";
import CloudConnectionIcon from "@/assets/icons/CloudConnectionIcon";
import SmsTrackingIcon from "@/assets/icons/SmsTrackingIcon";
import MessageTickIcon from "@/assets/icons/MessageTickIcon";
import BellLineIcon from "@/assets/icons/BellLineIcon";

export default function ExternalServicesPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Servicios externos"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Servicios externos" },
        ]}
      />
      <Stack
        sx={{
          border: "1px solid transparent",
          mt: 5,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          gap: 3,
          maxWidth: "800px",
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <IntermediateMenuItem
            title="Servicio externo de Amazon S3"
            subtitle="Configuración del servicio S3 de Amazon"
            path="/contabilidad/publicaciones-frecuentes/crear"
            icon={<CloudConnectionIcon size={28} color="#153075" />}
          />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <IntermediateMenuItem
            title="Servicio externo de correo electrónico"
            subtitle="Configuración del servicio de correo electrónico"
            path="/contabilidad/publicaciones-frecuentes/crear"
            icon={<SmsTrackingIcon size={28} color="#153075" />}
          />
        </Stack>
        <Stack sx={{ flex: 2 }}>
          <IntermediateMenuItem
            title="Servicio externo de SMS"
            subtitle="Configuración del servicio SMS"
            path="/contabilidad/publicaciones-frecuentes/crear"
            icon={<MessageTickIcon size={28} color="#153075" />}
          />
        </Stack>
        <Stack sx={{ flex: 2 }}>
          <IntermediateMenuItem
            title="Notificación Servicio Externo"
            subtitle="Configuración del servicio de notificación"
            path="/contabilidad/publicaciones-frecuentes/crear"
            icon={<BellLineIcon size={28} color="#153075" />}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
