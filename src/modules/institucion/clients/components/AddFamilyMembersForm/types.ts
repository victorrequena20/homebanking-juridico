export interface IForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  qualificationId?: string;
  age: string;
  relationshipId: any;
  genderId: any;
  professionId?: any;
  maritalStatusId?: any;
  dateOfBirth: string;
}

export interface IAddFamilyMembersFormProps {
  onClose: () => void;
  mode?: "step" | "create";
  createdSecondaryAction?: () => void;
}
