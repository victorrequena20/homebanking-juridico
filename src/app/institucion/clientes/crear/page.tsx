import CreateClient from "@/modules/institucion/clients/CreateClient";
import CreateClientProvider from "@/modules/institucion/clients/context/CreateClient/CreateClient.provider";

export default function CreateClientPage() {
  return (
    <CreateClientProvider>
      <CreateClient />
    </CreateClientProvider>
  );
}
