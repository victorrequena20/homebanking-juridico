"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { useParams } from "next/navigation";
import { getFundById } from "@/services/Funds.service";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import CreateFundForm from "@/modules/administracion/organizacion/components/CreateFundForm";

export default function UpdateFundPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fundData, setFundData] = React.useState<any>(null);
  const params = useParams();

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
        title={`Editar fondo -> ${fundData?.name}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: `Editar fondo` },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <CreateFundForm fundData={fundData} />
    </Wrapper>
  );
}
