"use client";
import CashIcon from "@/assets/icons/CashIcon";
import CheckIcon from "@/assets/icons/Checkicon";
import MoneyCheckIcon from "@/assets/icons/MoneyCheckIcon";
import Breadcrumbs from "@/components/Breadcrumbs";
import NotFoundData from "@/components/NotFoundData";
import { getAccountsById, getClientById } from "@/services/Clients.service";
import { formatSpanishDate } from "@/utilities/common.utility";
import { Box, Grid, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const containerStyles: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  maxHeight: "100vh",
  backgroundColor: "var(--darkBg)",
  overflow: "auto",
  overflowX: "hidden",
  maxWidth: "100vw",
};

const gridContainerStyles: SxProps = {
  width: "100%",
  height: "100%",
  bgcolor: "#FAFAFA",
  borderTop: "8px solid var(--darkBg)",
  borderBottom: "8px solid var(--darkBg)",
  borderLeft: "8px solid var(--darkBg)",
  borderRight: "8px solid var(--darkBg)",
  borderRadius: "24px",
  overflow: "auto",
  maxWidth: "100vw",
};

export default function ClientDetails({ params }: { params: { clientId: string } }) {
  const [clientData, setClientData] = React.useState<any>(null);
  const [accounts, setAccounts] = React.useState<any>([]);
  const [loanAccounts, setLoanAccounts] = React.useState<any>([]);
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

  async function getClientData() {
    const response = await getClientById(params?.clientId);
    if (response?.status === 200) {
      setClientData(response?.data);
    }
  }

  async function handleGetAccounts() {
    const response = await getAccountsById(params?.clientId);
    console.log("🚀 ~ handleGetAccounts ~ response:", response);
    console.log("🚀 ~ handleGetAccounts ~ response?.data?.loanAccounts:", response?.data?.loanAccounts);
    if (response?.status === 200) {
      setAccounts(response?.data);
      setLoanAccounts(response?.data?.loanAccounts);
    }
  }

  React.useEffect(() => {
    getClientData();
    handleGetAccounts();
  }, []);

  return (
    <Box sx={containerStyles}>
      <Grid container sx={gridContainerStyles}>
        <Grid item xs={12} sx={{ pt: 2 }}>
          <Stack
            sx={{
              width: "100%",
              borderBottom: "1px solid #bac3d480",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              py: 0.5,
            }}
          >
            <Stack
              sx={{ width: "100%", px: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Breadcrumbs
                items={[{ title: "Inicio", href: "/dashboard" }, { title: "Institución" }, { title: "Clientes" }]}
              />
              <Box
                sx={{
                  backgroundColor: "var(--darkBg)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "24px",
                  height: "24px",
                  borderRadius: "24px",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/institucion/clientes")}
              >
                <GridCloseIcon sx={{ color: "#fff", fontSize: "16px" }} />
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={1.8} sx={{ borderRight: "1px solid #bac3d480", height: "100%", p: 2 }}>
          <Box
            sx={{
              borderRadius: "8px",
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              backgroundColor: "#f2f4f7",
            }}
            // onClick={() => router.push("/dashboard")}
          >
            <Typography variant="body2" fontWeight="400" color="var(--secondaryText)">
              General
            </Typography>
          </Box>
        </Grid>

        <Grid xs={10.2} sx={{ px: 10, pt: 6, overflow: "auto" }}>
          <Stack sx={{ alignItems: "center", width: "100%" }}>
            <Stack
              sx={{
                bgcolor: "#f2f4f7",
                // backgroundImage: "linear-gradient(135deg, #fff 0%, #f2f4f7 80%)",
                width: "100%",
                height: "300px",
                borderRadius: "16px",
                justifyContent: "center",
                boxShadow: "0px 4px 12px -4px #10182810",
              }}
            >
              <Stack sx={{ px: 4, flexDirection: "row", alignItems: "center" }}>
                <Stack
                  sx={{
                    alignItems: "center",
                    width: "160px",
                    height: "160px",
                    position: "relative",
                    borderRadius: "80px",
                  }}
                >
                  {/* Status */}
                  <Tooltip placement="top" title={clientData?.status?.value === "Active" ? "Activo" : ""}>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "8px",
                        bgcolor: "var(--primaryGreen)",
                        position: "absolute",
                        top: "7px",
                        right: "24px",
                      }}
                    />
                  </Tooltip>
                  <Image
                    width={160}
                    height={160}
                    src="/assets/images/profile.jpg"
                    style={{ borderRadius: "100px", objectFit: "cover" }}
                    alt="Profile"
                  />
                  <Typography variant="caption" fontWeight="300" color="var(--secondaryText)" sx={{ mt: 1 }}>
                    Ver firma
                  </Typography>
                </Stack>
                <Stack>
                  <Stack sx={{ pl: 4, gap: 1.5, py: 1 }}>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Nombre del cliente:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        {clientData?.displayName}
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Oficina:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        {clientData?.officeName}
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Documento:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        {clientData?.externalId}
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Fecha de activación:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        {formatSpanishDate(clientData?.timeline?.activatedOnDate)}
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Asesor:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        {clientData?.loanOfficer}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack sx={{ pl: 4, gap: 1.5, pt: 3 }}>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Número de teléfono:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        0412-15-4757
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Correo electrónico:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        requenade@gmail.com
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ width: "100%", mt: 5 }}>
            <Stack sx={{ justifyContent: "center" }}>
              <Typography variant="body1" color="var(--secondaryText)">
                Cuentas de crédito
              </Typography>
            </Stack>

            <Stack sx={{ mt: 2, pb: 10 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
