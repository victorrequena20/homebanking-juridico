import { IKeyValue } from "@/types/common";

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
// familyMembers: FamilyMember[];
// submittedOnDate: string;
// isStaff: boolean;
// active: boolean;
// activationDate: string;
// dateFormat: string;
// locale: string;

interface FamilyMember {
  // Define las propiedades de un miembro de la familia aquí, si existen.
}
