export interface ICreateEditUserForm {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  officeId: number;
  roles: number[];
  staffId?: number;
}
