"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getFundById } from "@/services/Funds.service";
import { Box, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { useRouter } from "next/navigation";
import { flexRowCenter } from "@/styles/GlobalsMUI";

export default function ViewFundDetails({ params }: { params: { fundId: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fundData, setFundData] = React.useState<any>(null);
  const router = useRouter();

  async function handleGetFundById() {
    setIsLoading(true);
    try {
      const response = await getFundById(params?.fundId);
      if (response?.status === 200) {
        setFundData(response?.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("🚀 ~ getFundById ~ error:", error);
    }
  }

  React.useEffect(() => {
    handleGetFundById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={`Administrar fondos -> ${fundData?.name}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: `Administrar fondos` },
        ]}
      />

      <Stack sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight="400" color="#606778">
          Los detalles de este fondo se encuentran debajo.
        </Typography>
      </Stack>

      <Stack sx={{ mt: 5, minWidth: { xs: "100%", lg: "600px" }, maxWidth: "600px" }}>
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
            Detalles del fondo
          </Typography>
          <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => router.push(`/administracion/organizacion/administrar-fondos/${params.fundId}/editar`)}>
            <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
              Ver y editar
            </Typography>
            <ArrowRightIcon size={16} color="var(--secondaryText)" />
          </Box>
        </Stack>
        {/* Nombre */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" fontWeight="300" color="#606778">
            Nombre
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {fundData?.name}
          </Typography>
        </Stack>
        {/* ID externo  */}
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
            {fundData?.externalId}
          </Typography>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
