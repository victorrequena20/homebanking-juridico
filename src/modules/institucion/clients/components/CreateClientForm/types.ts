export interface ICreateClientForm {
  officeId: string;
  staffId: number;
  legalFormId: number;
  isStaff: boolean;
  active: boolean;
  externalId: string;
  mobileNo: string;
  emailAddress: string;
  dateOfBirth: string;
  submittedOnDate: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  activationDate: string;
  savingsProductId: number;
  familyMembers: FamilyMember[];
  dateFormat: string;
  locale: string;
}

interface FamilyMember {
  // Define las propiedades de un miembro de la familia aquí, si existen.
}
