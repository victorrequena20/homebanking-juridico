"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import { Box, Stack, Typography } from "@mui/material";
import CreateClientForm from "@/modules/institucion/clients/components/CreateClientForm";
import StepBox from "@/components/Stepper/StepBox";

export default function CreateClient() {
  const [step, setStep] = React.useState<number>(1);
  const [clientData, setClientData] = React.useState<any>();

  function handleActionStep1(data: any) {
    setClientData(data);
    setStep(2);
  }

  React.useEffect(() => {
    console.log("CLIENT DATA____", clientData);
  }, [clientData]);

  return (
    <Wrapper>
      <ButtonBack />

      {/* Stepper */}
      <Stack sx={{ mt: 5, flexDirection: "row" }}>
        <StepBox text="General" isActive={step === 1} onClick={() => setStep(1)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Miembros de la familia" isActive={step === 2} onClick={() => setStep(2)} />
      </Stack>

      <Stack sx={{ mt: 3, px: 4 }}>{step === 1 && <CreateClientForm action={handleActionStep1} />}</Stack>
    </Wrapper>
  );
}
