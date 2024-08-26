import React from "react";
import { ClientDetailsContext } from "./ClientDetails.context";
import { toast } from "sonner";
import { clientActions } from "@/services/Clients.service";
import { getTodayFormattedEsddMMMMyyyy } from "@/utilities/common.utility";
import { dateFormat } from "@/constants/global";
export default function ClientDetailsProvider(props: React.PropsWithChildren<{}>) {
  async function activateUser(clientId: string) {
    const dataToSend = {
      activationDate: getTodayFormattedEsddMMMMyyyy(),
      ...dateFormat,
    };
    const response = await clientActions(clientId, dataToSend, { command: "activate" });
    console.log("🚀 ~ activateUser ~ response:", response);
    if (response?.status === 200) {
      toast.success("Usuario activado");
    } else {
      toast.error("Error al activar usuario");
    }
  }
  return (
    <ClientDetailsContext.Provider
      value={{
        activateUser,
      }}
    >
      {props.children}
    </ClientDetailsContext.Provider>
  );
}
