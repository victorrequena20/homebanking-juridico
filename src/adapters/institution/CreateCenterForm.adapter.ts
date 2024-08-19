import { dateFormat } from "@/constants/global";

const createCenterFormAdapter = (data: any) => {
  return {
    ...dateFormat,
    officeId: data?.officeId?.value,
    name: data?.name,
    externalId: data?.externalId,
    staffId: data?.staffId?.value,
    submittedOnDate: data?.submittedOnDate,
    active: data?.active,
    groupMembers: data?.groupMembers,
    activationDate: data?.activationOnDate,
  };
};

export { createCenterFormAdapter };
