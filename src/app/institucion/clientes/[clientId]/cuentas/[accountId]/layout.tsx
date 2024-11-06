"use client";
import AccountDetailsHeader from "@/modules/institucion/clients/components/AccountDetailsHeader";
import { getAccountById } from "@/services/AccountDetails.service";
import { Grid } from "@mui/material";
import React, { createContext, useContext } from "react";

const AccountDataContext = createContext<AccountData | null>(null);

interface AccountData {
  [key: string]: any;
}

export const useAccountData = () => {
  const context = useContext(AccountDataContext);
  if (!context) {
    throw new Error("useAccountData debe ser usado dentro de AccountDataContext.Provider");
  }
  return context;
};

export default function CuentasLayout({ children, params }: { children: React.ReactNode; params: { accountId: string } }) {
  const [accountData, setAccountData] = React.useState<AccountData | null>(null);

  async function getAccountData() {
    await getAccountById(params.accountId).then(response => {
      console.log(response.data);
      setAccountData(response.data);
    });
  }

  React.useEffect(() => {
    getAccountData();
    console.log(params);
  }, []);

  return (
    <AccountDataContext.Provider value={accountData}>
      {accountData ? (
        <>
          <Grid xs={10.2} sx={{ overflow: "auto", height: "100%", maxWidth: "100vw", flexBasis: "100%" }}>
            <AccountDetailsHeader accountData={accountData} />
            {children}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </AccountDataContext.Provider>
  );
}
