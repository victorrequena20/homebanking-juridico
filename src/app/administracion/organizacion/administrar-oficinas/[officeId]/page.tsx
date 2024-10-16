"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getOfficeById } from "@/services/Office.service";
import { toast } from "sonner";
import { Box, Stack, Typography } from "@mui/material";
import { flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { formatSpanishDate } from "@/utilities/common.utility";
import { useRouter } from "next/navigation";

export default function OfficeDetailsPage({ params }: { params: { officeId: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [officeData, setOfficeData] = React.useState<any | null>(null);
  const router = useRouter();

  async function handleGetOfficeData() {
    setIsLoading(true);
    const response = await getOfficeById(params?.officeId, { template: false });
    if (response?.status === 200) {
      setOfficeData(response?.data);
    } else {
      toast.error("Error al obtener la información de la oficina.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetOfficeData();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={`Administrar oficinas -> ${officeData?.name}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar oficinas", href: "/administracion/organizacion/administrar-oficinas" },
          { title: `${officeData?.name}` },
        ]}
      />

      <Stack sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight="400" color="#606778">
          Los detalles de esta oficina se encuentran debajo.
        </Typography>
      </Stack>

      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #cccccc80",
            pb: 2,
          }}
        >
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Detalles de la oficina
          </Typography>
          <Box
            sx={{ ...flexRowCenter, gap: 1 }}
            onClick={() => router.push(`/administracion/organizacion/administrar-oficinas/${officeData?.id}/editar`)}
          >
            <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
              Ver y editar
            </Typography>
            <ArrowRightIcon size={16} color="var(--secondaryText)" />
          </Box>
        </Stack>
        {/* Oficina matriz */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Oficina matriz
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {officeData?.parentName}
          </Typography>
        </Stack>
        {/* Abierto el  */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Abierto el
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {formatSpanishDate(officeData?.openingDate) || ""}
          </Typography>
        </Stack>
        {/* Nombre decorado  */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Nombre decorado
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {officeData?.nameDecorated}
          </Typography>
        </Stack>
        {/* Nombre decorado  */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            ID externo
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {officeData?.externalId}
          </Typography>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
