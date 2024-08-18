import { dateFormat } from "@/constants/global";

const createLoanReassignmentFormAdapter = (data: any) => {
  return {
    ...dateFormat,
    assignmentDate: data?.assigmentDate,
    fromLoanOfficerId: data?.fromLoanOfficerId?.value,
    toLoanOfficerId: data?.toLoanOfficerId?.value,
  };
};

export { createLoanReassignmentFormAdapter };
