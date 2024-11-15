"use client";
import React from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { useAccountData } from "../layout";
import { formatSpanishDate, translator } from "@/utilities/common.utility";
import { formatAmountB } from "@/utilities/amount.utility";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import DetailsModal from "./components/detailsModal";
import { undoDepositById } from "@/services/AccountDetails.service";
import DropDownMenu from "@/components/DropDownMenu/DropDownMenu";
import ConfirmModal from "@/components/Modals/ConfirmModal";

export default function Transactions() {
  const router = useRouter()
  const accountData = useAccountData();
  const transactions = accountData?.transactions;
  const [showDetail, setShowDetail] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [transactionType, setTransactionType] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const columns: GridColDef<(typeof transactions)[number]>[] = [
    {
      field: "entryId",
      headerName: "Id",
      flex: 1,
      valueGetter: (value, row) => `${row?.id || ""}`,
      minWidth: 80,
      maxWidth: 100,
    },
    {
      field: "transactionDate",
      headerName: "Fecha de transacción",
      flex: 1,
      valueGetter: (value, row) => `${formatSpanishDate(row?.date) || ""} `,
      minWidth: 200,
    },
    {
      field: "transactionType",
      headerName: "Tipo de transacción",
      flex: 1,
      sortable: false,
      minWidth: 160,
      valueGetter: (value, row) => `${translator(row?.transactionType.value)} `,
    },
    {
      field: "debit",
      headerName: "Débito",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${formatAmountB(row?.debit) || "N/A"} `,
    },
    {
      field: "credit",
      headerName: "Crédito",
      flex: 1,
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${formatAmountB(row?.amount) || ""} `,
    },
    {
      field: "runningBalance",
      headerName: "Saldo",
      sortable: false,
      minWidth: 120,
      valueGetter: (value, row) => `${formatAmountB(row?.runningBalance) || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      cellClassName: "cell-overflow",
      renderCell: params => {
        const cellActions = [
          {
            label: "Ver transacción",
            icon: null,
            action: () => showDetails(params),
          },
          ...(params.row.transactionType?.value?.toLowerCase().includes("deposit")
            ? [
                {
                  label: "Deshacer transacción",
                  icon: null,
                  action: () => confirmUndo(params),
                },
              ]
            : []),
          {
            label: "Ver recibos",
            icon: null,
            action: () => showReceipts(params),
          },
          {
            label: "Ver entradas de diario",
            icon: null,
            action: () => router.push(`/contabilidad/buscar-entradas-de-diario/S${params?.row?.id}`),
          },
        ];
        return <DropDownMenu options={cellActions} />;
      },
      flex: 1,
      sortable: false,
      minWidth: 80,
    },
  ];

  const showReceipts = (params: GridCellParams) => {
    console.log(params); 
  } 

  const showDetails = async (e: GridCellParams) => {
    setTransactionType(e?.row?.transactionType?.value);
    setShowDetail(true);
    setSelectedTransaction(e?.row?.transfer?.id || e?.row?.id);
  };

  const confirmUndo = async (e: GridCellParams) => {
    setSelectedTransaction(e?.row?.transfer?.id || e?.row?.id);
    setOpenConfirm(true);
  };

  const onUndo = async () => {
    if (selectedTransaction) {
      await undoDepositById(accountData.id, selectedTransaction).then(response => {
        console.log(response.data);
      });
    }
  };

  return (
    <Stack mt={4} mx={{ xs: 2, md: 6 }} mb={15}>
      <Stack sx={{ justifyContent: "center" }} mb={4}>
        <Typography variant="body1" color="var(--secondaryText)">
          Todas las transacciones
        </Typography>
      </Stack>
      <Stack bgcolor={"white"} minWidth={300}>
        <DataGrid
          rows={transactions || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-overlayWrapper": {
              height: "100px",
            },
            "& .cell-overflow": {
              overflow: "visible",
            },
          }}
          onCellClick={cell => {
            if (cell.field !== "actions") {
              showDetails(cell);
            }
          }}
          disableRowSelectionOnClick
          rowSelection
          pageSizeOptions={[10, 25, 50]}
          localeText={{
            noRowsLabel: "No hay datos disponibles",
          }}
        />
      </Stack>
      <DetailsModal
        callback={onUndo}
        isOpen={showDetail}
        transactionId={selectedTransaction}
        accountId={accountData.id}
        transactionType={transactionType}
        setIsOpen={setShowDetail}
      />
      <ConfirmModal
        isOpen={openConfirm}
        title="¿Estás seguro de que deseas deshacer esta transacción?"
        confirmText="Deshacer"
        closeCallback={() => setOpenConfirm(false)}
        actionCallback={onUndo}
      />
    </Stack>
  );
}
