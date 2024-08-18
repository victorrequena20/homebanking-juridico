import { IKeyValue } from "@/types/common";

export interface ICreateGroupForm {
  officeId: any;
  name: string;
  externalId?: string;
  staffId: any;
  groupMembers?: any;
  submittedOnDate: string;
}

export interface GroupMember {
  clientId: number;
  joinedDate: string;
  dateFormat: string;
  locale: string;
}
