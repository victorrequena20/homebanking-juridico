"use client";
import React, { useContext } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import ButtonBack from "@/components/ButtonBack";
import StepBox from "@/components/Stepper/StepBox";
import CreateLoanResume from "../components/CreateLoanResume";
import { CreatePassiveContext } from "../context/CreateProductPassive.contex";
import CreateProductPassiveCurrencyForm from "../../pasivos/CreateProductPassiveDetailsForm/CreateLoanCurrencyForm/CreateLoanCurrencyForm";
import CreateProductPassiveConditionsForm from "../../pasivos/CreateProductPassiveDetailsForm/CreateProductPassiveConditionsForm/CreateProductPassiveConditionsForm";
import CreateProductPassiveSettingForm from "../../pasivos/CreateProductPassiveDetailsForm/CreateProductPassiveSettingsForm/CreateProductPassiveSettingsForm";
import CreateProductPassiveChargesForm from "../../pasivos/CreateProductPassiveDetailsForm/CreateProductPassiveChargesForm";
import CreateProductPassiveDetailsForm from "../../pasivos/CreateProductPassiveDetailsForm/CreateProductPassiveDetailsForm/CreateProductPassiveDetailsForm";
import CreateProductPassiveAccountingForm from "../../pasivos/CreateProductPassiveDetailsForm/CreateProductPassiveSettingsForm copy/CreateProductPassiveAccountingForm";

export default function CreateProductPassive() {
  const { step, setStep } = useContext(CreatePassiveContext);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear producto de crédito"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Productos de crédito", href: "/administracion/productos/productos-de-creditos" },
          { title: "Crear producto de crédito" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      {/* Stepper */}
      <Stack sx={{ mt: 6, flexDirection: "row", maxWidth: "1000px", mx: "auto", overflow: "auto" }}>
        <StepBox text="Detalles" isActive={step === 1} onClick={() => setStep?.(1)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Moneda" isActive={step === 2} onClick={() => setStep?.(2)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Condiciones" isActive={step === 4} onClick={() => setStep?.(4)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Ajustes" isActive={step === 3} onClick={() => setStep?.(3)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Cargos" isActive={step === 5} onClick={() => setStep?.(5)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Contabilidad" isActive={step === 6} onClick={() => setStep?.(6)} />
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <StepBox text="Resumen" isActive={step === 7} onClick={() => setStep?.(7)} />
      </Stack>

      <Stack sx={{ mt: 3, mx: "auto" }}>{step === 1 && <CreateProductPassiveDetailsForm />}</Stack>
      <Stack sx={{ mt: 0, mx: "auto" }}>{step === 2 && <CreateProductPassiveCurrencyForm />}</Stack>
      <Stack sx={{ mt: 0, mx: "auto" }}>{step === 3 && <CreateProductPassiveSettingForm />}</Stack>
      <Stack sx={{ mt: 0, mx: "auto" }}>{step === 4 && <CreateProductPassiveConditionsForm />}</Stack>
      <Stack sx={{ mt: 0, mx: "auto" }}>{step === 5 && <CreateProductPassiveChargesForm />}</Stack>
      <Stack sx={{ mt: 0, mx: "auto" }}>{step === 6 && <CreateProductPassiveAccountingForm />}</Stack>
      <Stack sx={{ mt: 3 }}>{step === 7 && <CreateLoanResume />}</Stack>
    </Wrapper>
  );
}
