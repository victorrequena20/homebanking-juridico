import { dateFormat } from "@/constants/global";

const createFrecuentPostingsAdapter = (frecuentPosting: any) => {
  return {
    ...dateFormat,
    accountNumber: frecuentPosting.accountNumber,
    accountingRule: frecuentPosting.accountingRule?.value,
    bankNumber: frecuentPosting.bankNumber,
    checkNumber: frecuentPosting.checkNumber,
    comments: frecuentPosting.comments,
    receiptNumber: frecuentPosting.receiptNumber,
    referenceNumber: frecuentPosting.referenceNumber,
    routingCode: frecuentPosting.routingCode,
    transactionDate: frecuentPosting.transactionDate,
    credits: [{ glAccountId: frecuentPosting.credits?.value, amount: frecuentPosting?.creditAmount }],
    debits: [{ glAccountId: frecuentPosting.debits?.value, amount: frecuentPosting?.debitAmount }],
    currencyCode: frecuentPosting.currencyCode?.value,
    officeId: frecuentPosting.officeId?.value,
    paymentTypeId: frecuentPosting.paymentTypeId?.value,
  };
};

export { createFrecuentPostingsAdapter };
