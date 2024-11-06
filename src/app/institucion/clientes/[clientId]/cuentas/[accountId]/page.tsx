"use client";
import AccountDetailsHeader from "@/modules/institucion/clients/components/AccountDetailsHeader";
import { formatAmountB } from "@/utilities/amount.utility";
import { formatSpanishDate, formatToPercentage } from "@/utilities/common.utility";
import { Grid, Stack, Typography, Table, TableRow, TableBody, TableCell, Box, Paper } from "@mui/material";
import React from "react";
import { useAccountData } from "./layout";

AccountDetailsHeader;

export default function AccountDetails({ params }: { params: { accountId: string } }) {
  const accountData = useAccountData();

  function translatePeriod(text: string) {
    let result = "";
    if (text?.toLowerCase().includes("daily")) {
      result = "Diario";
    } else if (text?.toLowerCase().includes("monthly")) {
      result = "Mensual";
    } else if (text?.toLowerCase().includes("weekly")) {
      result = "Semanal";
    }

    if (text?.toLowerCase().includes("balance")) {
      result = "Saldo " + result.toLowerCase();
    }
    return result;
  }

  const savingsDetails = [
    { label: "Número de Cédula", value: accountData?.externalId ? accountData?.externalId : "No provisto" },
    { label: "Activado en", value: formatSpanishDate(accountData?.timeline.activatedOnDate) },
    { label: "Oficial de campo", value: accountData?.fieldOfficerId > 0 ? accountData?.fieldOfficerId : "No provisto" },
    { label: "Moneda", value: accountData?.currency.name + " " + accountData?.currency.code },
    { label: "Tasa de interés nominal", value: formatToPercentage(accountData?.nominalAnnualInterestRate) },
  ];

  const performanceHistory = [
    { label: "Depósitos totales", value: accountData?.summary.currency.code + " " + formatAmountB(accountData?.summary.totalDeposits) },
    { label: "Interés total ganado", value: accountData?.summary.currency.code + " " + formatAmountB(accountData?.summary.totalInterestEarned) },
  ];

  const accountSummary = [
    { label: "Retiros totales", value: accountData?.summary.currency.code + " " + formatAmountB(accountData?.summary.totalWithdrawals) },
    { label: "Interés obtenido", value: accountData?.summary.currency.code + " " + formatAmountB(accountData?.summary.totalInterestEarned) },
    { label: "Interés publicado", value: accountData?.summary.currency.code + " " + formatAmountB(accountData?.summary.totalInterestPosted) },
    { label: "Intereses ganados no contabilizados", value: accountData?.summary.currency.code + " " + formatAmountB(accountData?.summary.interestNotPosted) },
    { label: "Tasa de interés nominal", value: formatToPercentage(accountData?.nominalAnnualInterestRate) },
    { label: "Período de contabilización de intereses", value: translatePeriod(accountData?.interestCompoundingPeriodType.value) },
    { label: "Período de capitalización de intereses", value: translatePeriod(accountData?.interestPostingPeriodType.value) },
    { label: "Interés calculado usando", value: translatePeriod(accountData?.interestCalculationType.value) },
    { label: "Días en el año", value: accountData?.interestCalculationDaysInYearType.value?.replace("Days", "Días") },
    { label: "Fecha de la última transacción activa", value: formatSpanishDate(accountData?.lastActiveTransactionDate) },
    { label: "Fecha de recalculación de intereses", value: formatSpanishDate(accountData?.summary.lastInterestCalculationDate) },
  ];

  const renderTable = (data: any) => (
    <Table size="small">
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell sx={{ fontSize: 12 }}>{item.label}</TableCell>
            <TableCell sx={{ fontSize: 12 }}>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Stack sx={{ maxWidth: "100%", mt: 5, px: { xs: 2, md: 10 }, mb: { xs: 18, md: 14 } }}>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ padding: 2 }}>
              <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mb={1}>
                Detalles de ahorro
              </Typography>
              {renderTable(savingsDetails)}
            </Paper>

            <Box mt={3}>
              <Paper variant="outlined" sx={{ padding: 2 }}>
                <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mb={1}>
                  Historial de rendimiento
                </Typography>
                {renderTable(performanceHistory)}
              </Paper>
            </Box>
          </Grid>

          {/* Resumen de la cuenta */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ padding: 2 }}>
              <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mb={1}>
                Resumen de la cuenta
              </Typography>
              {renderTable(accountSummary)}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
