"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import CreatePaymentTypeForm from "@/modules/administracion/organizacion/components/CreatePaymentTypeForm";
import { getPaymentTypeById } from "@/services/Core.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function PayTypeEditPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [paymentTypeData, setPaymentTypeData] = React.useState<any>(null);
  const params = useParams();

  async function handleGetPaymentTypeById() {
    setIsLoading(true);
    const response = await getPaymentTypeById(params?.payTypeId?.toString());
    if (response?.status === 200) {
      setPaymentTypeData(response?.data);
    } else {
      toast.error("Error al obtener el tipo de pago");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetPaymentTypeById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={`Editar tipo de pago -> ${paymentTypeData?.name}`}
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Tipos de pago", href: "/administracion/organizacion/tipo-de-pago" },
          { title: "Editar tipo de pago" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ alignItems: "center" }}>
        <CreatePaymentTypeForm paymentTypeData={paymentTypeData} />
      </Stack>
    </Wrapper>
  );
}
