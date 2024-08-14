import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateOfficeForm from "@/modules/administracion/organizacion/components/CreateOfficeForm";

export default function CreateFund() {
  return (
    <Wrapper>
      <ButtonBack />
      <CreateOfficeForm />
    </Wrapper>
  );
}
