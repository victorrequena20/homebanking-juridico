import { createContext } from "react";
import { ICreateClientContext } from "./types";

const CreateClientContext = createContext<any>({
  step: 1,
  templateData: {},
  clientGeneralData: {},
  clientFamilyMembers: [],
  setClientFamilyMembers: () => {},
  formMethods: {},
});

export { CreateClientContext };
