import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateAdhocForm from "@/modules/administracion/organizacion/components/CreateAdhocForm/CreateAdhocForm";

export default function CreateFund() {
  return (
    <Wrapper>
      <ButtonBack />
      <CreateAdhocForm />
    </Wrapper>
  );
}
