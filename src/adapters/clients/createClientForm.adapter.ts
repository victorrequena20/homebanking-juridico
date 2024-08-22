import { dateFormat } from "@/constants/global";

const createClientFormAdapter = (data: any) => {
  return {
    ...dateFormat,
    dateOfBirth: data?.dateOfBirth,
    emailAddress: data?.emailAddress,
    firstname: data?.firstname,
    middlename: data?.middlename,
    lastname: data?.lastname,
    mobileNo: data?.mobileNo,
    externalId: data?.externalId,
    officeId: data?.officeId?.value,
    legalFormId: data?.legalFormId?.value,
    savingsProductId: data?.savingsProductId?.value,
    staffId: data?.staffId?.value,
  };
};

export { createClientFormAdapter };
