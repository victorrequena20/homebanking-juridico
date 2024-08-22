"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import StepBox from "@/components/Stepper/StepBox";
import { CreateLoanContext } from "../context/CreateLoan.context";
import CreateLoanDetailsForm from "../components/CreateLoanDetailsForm";
import CreateLoanCurrencyForm from "../components/CreateLoanCurrencyForm";

export default function CreateLoan() {
  const { step, setStep } = React.useContext(CreateLoanContext);

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
      <Stack sx={{ mt: 6, flexDirection: "row", maxWidth: "1000px", mx: "auto" }}>
        <StepBox text="Detalles" isActive={step === 1} onClick={() => setStep?.(1)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Moneda" isActive={step === 2} onClick={() => setStep?.(2)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Ajustes" isActive={step === 3} onClick={() => setStep?.(3)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Condiciones" isActive={step === 4} onClick={() => setStep?.(4)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Cargos" isActive={step === 5} onClick={() => setStep?.(5)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Contabilidad" isActive={step === 6} onClick={() => setStep?.(6)} />
      </Stack>

      <Stack sx={{ mt: 3, mx: "auto" }}>{step === 1 && <CreateLoanDetailsForm />}</Stack>
      <Stack sx={{ mt: 3, mx: "auto" }}>{step === 2 && <CreateLoanCurrencyForm />}</Stack>
    </Wrapper>
  );
}
