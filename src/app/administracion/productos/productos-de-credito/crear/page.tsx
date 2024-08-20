import React from "react";
import CreateLoanProvider from "@/modules/productos/creditos/context/CreateLoan.provider";
import CreateLoan from "@/modules/productos/creditos/CreateLoan";

export default function CreateLoanPage() {
  return (
    <CreateLoanProvider>
      <CreateLoan />
    </CreateLoanProvider>
  );
}
