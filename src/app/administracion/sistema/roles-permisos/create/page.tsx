import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateRoleForm from "@/modules/administracion/sistema/components/CreateRolForm/CreateRoleForm";

export default function CreateFund() {
  return (
    <Wrapper>
      <ButtonBack />
      <CreateRoleForm />
    </Wrapper>
  );
}
