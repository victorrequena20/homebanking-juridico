import { createContext } from "react";
import { ICreateClientContext } from "./types";

const CreateClientContext = createContext<ICreateClientContext>({
  step: 1,
  templateData: {},
  clientGeneralData: {},
  clientFamilyMembers: [],
  setClientFamilyMembers: () => {},
});

export { CreateClientContext };
