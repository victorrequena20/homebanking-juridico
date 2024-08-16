"use client";
import React from "react";
import { CreateClientContext } from "./CreateClient.context";
import { getTemplate } from "@/services/Clients.service";

export default function CreateClientProvider({ children }: { children: React.ReactNode }) {
  const [templateData, setTemplateData] = React.useState<any | null>(null);
  const [clientGeneralData, setClientGeneralData] = React.useState<any>({});
  const [clientFamilyMembers, setClientFamilyMembers] = React.useState<any>([]);
  const [step, setStep] = React.useState<number>(2);

  React.useEffect(() => {
    console.log("CLIENT GENERAL DATA____", clientGeneralData);
  }, [clientGeneralData]);

  React.useEffect(() => {
    (async () => {
      const response = await getTemplate();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setTemplateData(response?.data);
      }
    })();
  }, []);

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
      }}
    >
      {children}
    </CreateClientContext.Provider>
  );
}
