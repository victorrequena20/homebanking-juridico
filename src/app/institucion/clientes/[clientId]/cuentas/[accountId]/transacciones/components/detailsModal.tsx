"use client";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { getDepositDetailById, getWithdrawalDetailById } from "@/services/AccountDetails.service";
import { formatAmountB } from "@/utilities/amount.utility";
import { formatSpanishDate, translator } from "@/utilities/common.utility";
import { Stack, Typography, Box, Paper, Table, TableBody, TableCell, TableRow, Modal } from "@mui/material";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import UndoIcon from "@/assets/icons/UndoIcon";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";

export default function DetailsModal({
  isOpen,
  setIsOpen,
  transactionId,
  callback,
  transactionType,
  accountId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transactionId: any;
  callback?: () => void;
  transactionType: any;
  accountId: string;
}) {
  const [transactionData, setTransactionData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const isDeposit = transactionType?.toLowerCase().includes("deposit");

  React.useEffect(() => {
    if (isOpen) {
      getTransactionDetail();
    }
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const getTransactionDetail = async () => {
    setLoading(true);
    if (transactionType?.toLowerCase().includes("deposit") || transactionType?.toLowerCase().includes("interest")) {
      await getDepositDetailById(accountId, transactionId)
        .then(response => {
          setTransactionData(response.data);
        })
        .catch(error => {
          console.log("getTransactionDetail ERROR", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      await getWithdrawalDetailById(transactionId)
        .then(response => {
          setTransactionData(response.data);
        })
        .catch(error => {
          console.log("getTransactionDetail ERROR", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const renderTable = (data: any) => (
    <Table size="small">
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell sx={{ fontSize: 12, width: 150 }}>{item.label}</TableCell>
            <TableCell sx={{ fontSize: 12, textAlign: "right" }}>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const transactionDetails = [
    { label: "Fecha de Transacción:", value: formatSpanishDate(transactionData?.transferDate) || "No provisto" },
    { label: "Destino:", value: transactionData?.transferDescription || "No provisto" },
  ];

  const depositDetails = [
    { label: "Id:", value: transactionData?.id || "-" },
    { label: "Tipo de transacción", value: translator(transactionData?.transactionType?.value || transactionData?.typeOfTransfer) || "-" },
    { label: "Fecha de Transacción:", value: formatSpanishDate(transactionData?.date) || "-" },
    { label: "Moneda:", value: transactionData?.currency?.displayLabel },
    ...(transactionData?.transactionType?.value?.toLowerCase().includes("deposit")
      ? [
          { label: "Nota:", value: transactionData?.note || "-" },
          { label: "Tipo de pago :", value: transactionData?.paymentDetailData?.paymentType?.name || "-" },
        ]
      : []),
  ];

  const from = [
    { label: "Oficina:", value: translator(transactionData?.fromOffice?.name) || "No provisto" },
    { label: "Cliente:", value: transactionData?.fromClient?.displayName || "No provisto" },
    { label: "Tipo de cuenta:", value: translator(transactionData?.fromAccountType?.value) || "No provisto" },
    { label: "Número de cuenta:", value: transactionData?.fromAccount?.accountNo || "No provisto" },
  ];

  const to = [
    { label: "Oficina:", value: translator(transactionData?.toOffice?.name) || "No provisto" },
    { label: "Cliente:", value: transactionData?.toClient?.displayName || "No provisto" },
    { label: "Tipo de cuenta:", value: translator(transactionData?.toAccountType?.value) || "No provisto" },
    { label: "Número de cuenta:", value: transactionData?.toAccount?.accountNo || "No provisto" },
  ];

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }} mb={4}>
        <Box sx={{ minWidth: { md: 550, sm: "unset" } }}>
          {!loading && (isDeposit || transactionType?.toLowerCase().includes("interest")) ? (
            <Paper variant="outlined" sx={{ padding: 2 }}>
              <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mb={2}>
                Detalles de la transacción
              </Typography>
              <Typography variant="body1" color="var(--secondaryText)" fontSize={10} textAlign={"center"} mt={5}>
                Monto
              </Typography>
              <Typography variant="body1" fontSize={18} mb={5} textAlign={"center"}>
                {transactionData?.currency?.displaySymbol} {formatAmountB(transactionData?.transferAmount || transactionData?.amount)} (
                {transactionData?.currency?.code})
              </Typography>
              {renderTable(depositDetails)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  gap: "16px",
                  mt: 3,
                }}
              >
                <Button iconLeft size="small" text="Volver" variant="navigation" onClick={handleClose} />
                {isDeposit && (
                  <ConfirmDeleteModal
                    icon={<UndoIcon></UndoIcon>}
                    buttonText="Deshacer transacción"
                    title="¿Estás seguro de que deseas deshacer esta transacción?"
                    actionCallback={callback}
                    confirmText="Deshacer"
                  />
                )}
              </Box>
            </Paper>
          ) : (
            !loading && (
              <Paper variant="outlined" sx={{ padding: 2 }}>
                <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mb={2}>
                  Detalles de la transacción
                </Typography>
                <Typography variant="body1" color="var(--secondaryText)" fontSize={10} textAlign={"center"} mt={5}>
                  Monto
                </Typography>
                <Typography variant="body1" fontSize={18} mb={5} textAlign={"center"}>
                  {transactionData?.currency?.displaySymbol} {formatAmountB(transactionData?.transferAmount)} ({transactionData?.currency?.code})
                </Typography>
                {renderTable(transactionDetails)}
                <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mt={3} mb={2}>
                  Transferido desde
                </Typography>
                {renderTable(from)}
                <Typography variant="body1" color="var(--secondaryText)" fontSize={12} ml={2} mt={3} mb={2}>
                  Transferido a
                </Typography>
                {renderTable(to)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    gap: "16px",
                    mt: 3,
                  }}
                >
                  <Button iconLeft size="small" text="Volver" variant="navigation" onClick={handleClose} />
                </Box>
              </Paper>
            )
          )}
        </Box>
      </Stack>
    </Modal>
  );
}
