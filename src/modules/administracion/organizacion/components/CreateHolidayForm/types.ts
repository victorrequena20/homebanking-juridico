export interface ICreateHolidayForm {
  name: string;
  fromDate: string;
  toDate: string;
  reschedulingType: string;
  description?: string;
  officeIds: string[];
  repaymentsRescheduledTo?: string;
}
