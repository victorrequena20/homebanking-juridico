"use client";
import React from "react";
import ArrowCircleReceiveIcon from "@/assets/icons/ArrowCircleReceiveIcon";
import ArrowCircleSendIcon from "@/assets/icons/ArrowCircleSendIcon";
import CashIcon from "@/assets/icons/CashIcon";
import CheckIcon from "@/assets/icons/Checkicon";
import MoneyCheckIcon from "@/assets/icons/MoneyCheckIcon";
import Breadcrumbs from "@/components/Breadcrumbs";
import Loader from "@/components/Loader";
import NotFoundData from "@/components/NotFoundData";
import { getAccountsById, getClientById } from "@/services/Clients.service";
import { formatSpanishDate } from "@/utilities/common.utility";
import { Box, Grid, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import ClientDetailsHeader from "@/modules/institucion/clients/components/ClientDetailsHeader";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import DepositMoneyAccountForm from "@/modules/institucion/clients/components/DepositMonetAccountForm";

export default function ClientDetails({ params }: { params: { clientId: string } }) {
  const [showDepositModal, setShowDepositModal] = React.useState(true);
  const [clientData, setClientData] = React.useState<any>(null);
  const [accounts, setAccounts] = React.useState<any>([]);
  const [loanAccounts, setLoanAccounts] = React.useState<any>([]);
  const [savingsAccounts, setSavingsAccounts] = React.useState<any>([]);
  const [accountIdToDeposit, setAccountIdToDeposit] = React.useState<string>("");
  const router = useRouter();
  const columns: GridColDef<(typeof loanAccounts)[number]>[] = [
    {
      field: "accountNo",
      headerName: "Número de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row?.accountNo || ""}`,
    },
    {
      field: "creditProduct",
      headerName: "Producto de crédito",
      flex: 1,
      valueGetter: (value, row) => `${row?.productName || ""} `,
    },
    {
      field: "originalLoan",
      headerName: "Crédito original",
      flex: 1,
      valueGetter: (value, row) => `${row?.originalLoan || ""} `,
    },
    {
      field: "loanBalance",
      headerName: "Balance de crédito",
      flex: 1,
      valueGetter: (value, row) => `${row?.loanBalance || ""} `,
    },
    {
      field: "amountPaid",
      headerName: "Monto pagado",
      flex: 1,
      valueGetter: (value, row) => `${row?.amountPaid || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params => (
        <Stack sx={{ justifyContent: "center", height: "100%" }}>
          {params?.row?.status?.waitingForDisbursal && (
            <Tooltip placement="top" title="Desembolsar">
              <Box
                sx={{
                  bgcolor: "var(--primary)",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <CashIcon color="#fff" size={20} />
              </Box>
            </Tooltip>
          )}
          {params?.row?.status?.pendingApproval && (
            <Tooltip placement="top" title="Aprobar">
              <Box
                sx={{
                  bgcolor: "var(--primary)",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <CheckIcon color="#fff" size={16} />
              </Box>
            </Tooltip>
          )}
          {params?.row?.status?.active && (
            <Tooltip placement="top" title="Registrar pago">
              <Box
                sx={{
                  bgcolor: "var(--primary)",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <MoneyCheckIcon color="#fff" size={20} />
              </Box>
            </Tooltip>
          )}
        </Stack>
      ),
      align: "center",
    },
  ];
  const savingsColumns: GridColDef<(typeof savingsAccounts)[number]>[] = [
    {
      field: "accountNo",
      headerName: "Número de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row?.accountNo || ""}`,
    },
    {
      field: "savingsProduct",
      headerName: "Producto de ahorro",
      flex: 1,
      valueGetter: (value, row) => `${row?.productName || ""} `,
    },
    {
      field: "lastActive",
      headerName: "Último activo",
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row?.lastActiveTransactionDate) || ""} `,
    },
    {
      field: "balance",
      headerName: "Saldo",
      flex: 1,
      valueGetter: (value, row) => `${row?.accountBalance || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params => (
        <Stack sx={{ justifyContent: "center", height: "100%" }}>
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <Box
              sx={{
                bgcolor: "var(--primary)",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setAccountIdToDeposit(params?.row?.id);
                setShowDepositModal(true);
              }}
            >
              <ArrowCircleSendIcon color="#fff" size={20} />
            </Box>
            <Box
              sx={{
                bgcolor: "var(--primary)",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <ArrowCircleReceiveIcon color="#fff" size={20} />
            </Box>
          </Stack>
        </Stack>
      ),
      align: "center",
    },
  ];

  async function getClientData() {
    const response = await getClientById(params?.clientId);
    if (response?.status === 200) {
      setClientData(response?.data);
    }
  }

  async function handleGetAccounts() {
    const response = await getAccountsById(params?.clientId);
    console.log("🚀 ~ handleGetAccounts ~ response:", response);
    if (response?.status === 200) {
      setAccounts(response?.data);
      setLoanAccounts(response?.data?.loanAccounts || []);
      setSavingsAccounts(response?.data?.savingsAccounts || []);
    }
  }

  React.useEffect(() => {
    getClientData();
    handleGetAccounts();
  }, []);

  return (
    <>
      {clientData ? (
        <>
          <Grid xs={10.2} sx={{ overflow: "auto", height: "100%" }}>
            <ClientDetailsHeader clientData={clientData} getClientData={getClientData} />

            {/* Cuentas de ahorro */}
            {savingsAccounts?.length > 0 && (
              <Stack sx={{ maxWidth: "100%", mt: 5, px: 10 }}>
                <Stack sx={{ justifyContent: "center" }}>
                  <Typography variant="body1" color="var(--secondaryText)">
                    Cuentas de ahorro
                  </Typography>
                </Stack>

                <Stack sx={{ mt: 2, pb: 10 }}>
                  {savingsAccounts?.length > 0 ? (
                    <DataGrid
                      rows={savingsAccounts}
                      columns={savingsColumns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                            page: 0,
                          },
                        },
                      }}
                      disableRowSelectionOnClick
                      rowSelection
                      pageSizeOptions={[10, 25, 50]}
                    />
                  ) : (
                    <NotFoundData title={`El sr ${clientData?.displayName} no posee cuentas de ahorro`} withOutBack mt={6} />
                  )}
                </Stack>
              </Stack>
            )}

            {/* Creditos */}
            {loanAccounts?.length > 0 && (
              <Stack sx={{ maxWidth: "100%", mt: 0, px: 10 }}>
                <Stack sx={{ justifyContent: "center" }}>
                  <Typography variant="body1" color="var(--secondaryText)">
                    Cuentas de crédito
                  </Typography>
                </Stack>

                <Stack sx={{ mt: 2, pb: 4 }}>
                  {loanAccounts?.length > 0 ? (
                    <DataGrid
                      rows={loanAccounts}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                            page: 0,
                          },
                        },
                      }}
                      disableRowSelectionOnClick
                      rowSelection
                      pageSizeOptions={[10, 25, 50]}
                    />
                  ) : (
                    <NotFoundData title={`El sr ${clientData?.displayName} no posee créditos`} withOutBack mt={6} />
                  )}
                </Stack>
              </Stack>
            )}

            <Stack>
              {savingsAccounts?.length < 1 && loanAccounts?.length < 1 && (
                <NotFoundData title={`El cliente ${clientData?.displayName} no posee cuentas`} withOutBack mt={18} />
              )}
            </Stack>

            <RenderFormModal
              title="Depositar dinero en una cuenta de ahorro"
              subtitle="Deposita dinero en la cuenta del cliente."
              sx={{ maxWidth: "460px", width: "460px" }}
              isOpen={showDepositModal}
              setIsOpen={setShowDepositModal}
            >
              <DepositMoneyAccountForm accountId={accountIdToDeposit} />
            </RenderFormModal>
          </Grid>
        </>
      ) : (
        <Grid xs={10.2}>
          <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Loader size="40" color="#484848" />
          </Stack>
        </Grid>
      )}
    </>
  );
}
