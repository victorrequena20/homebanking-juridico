import { IKeyValue } from "@/types/common";
import { UseFormReturn } from "react-hook-form";

export interface ICreateClientForm {
  officeId: IKeyValue | any;
  legalFormId: IKeyValue | any;
  staffId: IKeyValue | any;
  savingsProductId: IKeyValue | any;
  externalId: string;
  mobileNo: string;
  emailAddress: string;
  dateOfBirth: string;
  firstname: string;
  middlename?: string;
  lastname: string;
}
interface FamilyMember {
  // Define las propiedades de un miembro de la familia aquí, si existen.
}

export interface ICreateClientContext {
  step?: number;
  clientGeneralData?: any;
  templateData: any;
  setStep?: (step: number) => void;
  setClientGeneralData?: (clientGeneralData: any) => void;
  clientFamilyMembers: any[];
  setClientFamilyMembers: (clientFamilyMembers: any[]) => void;
  formMethods: UseFormReturn<any>;
}
