"use client";
import React, { useContext } from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import { Box, Stack, Typography } from "@mui/material";
import CreateClientForm from "@/modules/institucion/clients/components/CreateClientForm";
import StepBox from "@/components/Stepper/StepBox";
import ClientFamilyMembers from "@/modules/institucion/clients/components/ClientFamilyMembers";
import { CreateClientContext } from "../context/CreateClient/CreateClient.context";
import ClientResume from "../components/ClientResume";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CreateClient() {
  const { step, setStep } = useContext(CreateClientContext);
  const [clientGeneralData, setClientGeneralData] = React.useState<any>({});
  const [isValidStep1, setIsValidStep1] = React.useState<boolean>(false);
  const [clientData, setClientData] = React.useState<any>();

  function handleActionStep1(data: any) {
    setClientData(data);
    setStep?.(2);
  }

  function handleActionStep2() {}

  React.useEffect(() => {
    console.log("CLIENT DATA____", clientData);
  }, [clientData]);

  React.useEffect(() => {
    console.log("STEP____", step);
  }, [step]);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear cliente"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Institución" },
          { title: "Clientes", href: "/institucion/clientes" },
          { title: "Crear cliente" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      {/* Stepper */}
      <Stack sx={{ mt: 3, flexDirection: "row" }}>
        <StepBox text="General" isActive={step === 1} onClick={() => setStep?.(1)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Miembros de la familia" isActive={step === 2} onClick={() => setStep?.(2)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Resumen" isActive={step === 3} onClick={() => setStep?.(3)} />
      </Stack>

      <Stack sx={{ mt: 5, px: 4 }}>{step === 1 && <CreateClientForm action={handleActionStep1} />}</Stack>
      <Stack sx={{ mt: 5, px: 4 }}>{step === 2 && <ClientFamilyMembers formAction={handleActionStep2} />}</Stack>
      <Stack sx={{ mt: 0, px: 4 }}>{step === 3 && <ClientResume />}</Stack>
    </Wrapper>
  );
}
