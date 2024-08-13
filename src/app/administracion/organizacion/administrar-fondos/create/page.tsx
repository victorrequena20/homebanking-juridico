import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack } from "@mui/material";
import Button from "@/components/Button";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import ButtonBack from "@/components/ButtonBack";
import CreateFundForm from "@/modules/administracion/organizacion/components/CreateFundForm";

export default function CreateFund() {
  return (
    <Wrapper>
      <ButtonBack />
      <CreateFundForm />
    </Wrapper>
  );
}
