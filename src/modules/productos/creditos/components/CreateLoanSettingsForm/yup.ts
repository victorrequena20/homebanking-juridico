import * as yup from "yup";

export const schema = yup.object().shape({
  amortizationType: yup.mixed(),
  interestType: yup.mixed(),
  interestCalculationPeriodType: yup.mixed(),
  loanScheduleType: yup.mixed(),
  transactionProccessingStrategyCode: yup.mixed(),
});
