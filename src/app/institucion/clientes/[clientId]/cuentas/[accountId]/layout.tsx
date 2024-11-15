"use client";
import Loader from "@/components/Loader";
import AccountDetailsHeader from "@/modules/institucion/clients/components/AccountDetailsHeader";
import { getAccountById } from "@/services/AccountDetails.service";
import { Grid, Box } from "@mui/material";
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
      setAccountData(response.data);
    });
  }

  React.useEffect(() => {
    getAccountData();
  }, [params.accountId]);

  return (
    <AccountDataContext.Provider value={accountData}>
      <Grid xs={10.2} sx={{ overflow: "auto", height: "100%", maxWidth: "100vw", flexBasis: "100%" }}>
        {accountData ? (
          <>
            <AccountDetailsHeader accountData={accountData} />
            {children}
          </>
        ) : (
          <Box
            sx={{
              maxWidth: {
                md: "100%",
              },
              height: "100%",
              minHeight: { xs: "100%", md: "auto" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader size="40" color="#484848" />
          </Box>
        )}
      </Grid>
    </AccountDataContext.Provider>
  );
}
