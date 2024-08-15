import { IKeyValue } from "@/types/common";

export interface ICreateEditUserForm {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  officeId: IKeyValue | any | number;
  roles: number[];
  staffId?: IKeyValue | any;
  password?: string;
  repeatPassword?: string;
}
