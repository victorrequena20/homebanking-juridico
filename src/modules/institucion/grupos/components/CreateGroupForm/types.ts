import { IKeyValue } from "@/types/common";

export interface ICreateGroupForm {
  officeId: IKeyValue;
  name: string;
  externalId?: string;
  staffId?: IKeyValue | null;
  active: boolean;
  activationDate?: string;
  groupMembers?: GroupMember[];
  submittedOnDate: string;
  dateFormat: string;
  locale: string;
}

export interface GroupMember {
  clientId: number;
  joinedDate: string;
  dateFormat: string;
  locale: string;
}
