export type User = {
  id: number;
  availableRoles: any[];
  clients: any[];
  email: string;
  firstname: string;
  lastname: string;
  isSelfServiceUser: boolean;
  officeId: number;
  officeName: string;
  passwordNeverExpires: string;
  selectedRoles: any[];
  username: string;
};
