"use client";
import React, { useContext } from "react";
import { CreateClientContext } from "./CreateClient.context";
import { getTemplate } from "@/services/Clients.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./yup";

export function useCreateClientContext() {
  const context = useContext(CreateClientContext);
  if (!context) {
    throw new Error("useCreateClientForm must be used within a CreateClientProvider");
  }
  return context;
}

export default function CreateClientProvider({ children }: { children: React.ReactNode }) {
  const [templateData, setTemplateData] = React.useState<any | null>(null);
  const [clientGeneralData, setClientGeneralData] = React.useState<any>({});
  const [clientFamilyMembers, setClientFamilyMembers] = React.useState<any>([]);
  const [step, setStep] = React.useState<number>(1);
  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function handleGetOffices() {
    const response = await getTemplate({
      officeId: formMethods.watch("officeId")?.value,
      staffInSelectedOfficeOnly: true,
    });
    console.log("🚀 ~ response:", response);
    if (response?.status === 200) {
      setTemplateData(response?.data);
    }
  }

  React.useEffect(() => {
    console.log("WATCH____", formMethods?.watch());
  }, [formMethods?.watch()]);

  React.useEffect(() => {
    handleGetOffices();
  }, [formMethods.watch("officeId")]);

  return (
    <CreateClientContext.Provider
      value={{
        step,
        clientGeneralData,
        templateData,
        setStep,
        setClientGeneralData,
        clientFamilyMembers,
        setClientFamilyMembers,
        formMethods,
      }}
    >
      {children}
    </CreateClientContext.Provider>
  );
}
