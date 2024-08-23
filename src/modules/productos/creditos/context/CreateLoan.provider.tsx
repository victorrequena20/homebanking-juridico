"use client";
import React from "react";
import { CreateLoanContext } from "./CreateLoan.context";
import { getLoanProductsTemplate } from "@/services/Loans.service";

export default function CreateLoanProvider(props: React.PropsWithChildren<{}>) {
  const [step, setStep] = React.useState<number>(1);
  const [loanProductsTemplate, setLoanProductsTemplate] = React.useState<any | null>(null);
  const [globalForm, setGlobalForm] = React.useState<any | null>({});

  async function handleChangeGlobalFormValues(values: any) {
    setGlobalForm({ ...globalForm, ...values });
  }

  async function handleGetLoanProductsTemplate() {
    const response = await getLoanProductsTemplate();
    if (response?.status === 200) {
      setLoanProductsTemplate(response?.data);
    }
  }

  React.useEffect(() => {
    handleGetLoanProductsTemplate();
  }, []);

  React.useEffect(() => {
    console.log("🚀 ~ globalForm", globalForm);
  }, [globalForm]);

  return (
    <CreateLoanContext.Provider
      value={{
        step,
        globalForm,
        setStep,
        loanProductsTemplate,
        handleChangeGlobalFormValues,
      }}
    >
      {props.children}
    </CreateLoanContext.Provider>
  );
}
