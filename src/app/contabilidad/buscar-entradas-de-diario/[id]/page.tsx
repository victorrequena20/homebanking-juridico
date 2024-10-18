"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Stack, Typography } from "@mui/material";
import { getJournalEntries } from "@/services/Core.service";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { formatSpanishDate } from "@/utilities/common.utility";
import { useMediaQuery } from "@mui/material";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import Button from "@/components/Button";
import { formatAmountB } from "@/utilities/amount.utility";

export default function TransactionDetails({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [journalEntries, setJournalEntries] = React.useState<any>([]);
  const [selectedEntry, setSelectedEntry] = React.useState<any>([]);
  const [showDetailsModal, setShowDetailsModal] = React.useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const columns: GridColDef<(typeof journalEntries)[number]>[] = [
    {
      field: "entryId",
      headerName: "ID de entrada",
      valueGetter: (value, row) => `${row?.id || ""}`,
      flex: 1,
      minWidth: 80,
    },
    {
      field: "type",
      headerName: "Tipo",
      valueGetter: (value, row) => `${row?.glAccountType?.value || ""} `,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "accountCode",
      headerName: "Código de cuenta",
      sortable: false,
      flex: 2,
      minWidth: 160,
      valueGetter: (value, row) => `${row?.glAccountCode || ""} `,
    },
    {
      field: "accountName",
      headerName: "Nombre de la cuenta",
      sortable: false,
      flex: 3,
      minWidth: 350,
      valueGetter: (value, row) => `${row?.glAccountName || ""} `,
    },
    {
      field: "loan",
      headerName: "Débito",
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${(row?.entryType?.value === "DEBIT" && formatAmountB(row?.amount)) || ""} `,
    },
    {
      field: "credit",
      headerName: "Crédito",
      sortable: false,
      minWidth: 80,
      valueGetter: (value, row) => `${(row?.entryType?.value === "CREDIT" && formatAmountB(row?.amount)) || ""} `,
    },
  ];

  const getJournalEntriesDetails = async () => {
    setIsLoading(true);
    const body = {
      transactionId: params.id,
      transactionDetails: true,
    };

    await getJournalEntries(body)
      .then(response => {
        setJournalEntries(response?.data.pageItems);
        console.log(response?.data.pageItems);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const showDetails = async (e: GridRowParams) => {
    console.log(e);
    setSelectedEntry(e.row);
    setShowDetailsModal(true);
  };

  React.useEffect(() => {
    getJournalEntriesDetails();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Contabiliad", href: "/contabilidad" },
          { title: "Buscar entradas de diario", href: "/contabilidad/buscar-entradas-de-diario" },
          { title: "Transacciones" },
          { title: params.id },
        ]}
      />

      <Stack
        sx={{
          flexDirection: isSmallScreen ? "col" : "row",
          alignItems: "left",
          mt: 3,
          mx: 2,
        }}
      >
        <Typography variant="body2" fontWeight="300" color="#606778" sx={{ flex: 1 }}>
          Oficina
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a" sx={{ flex: 1 }}>
          {journalEntries[0]?.officeName}
        </Typography>
        <Typography variant="body2" fontWeight="300" color="#606778" sx={{ flex: 1, mt: isSmallScreen ? 1 : 0 }}>
          Fecha de Transacción
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a" sx={{ flex: 1, textAlign: isSmallScreen ? "left" : "right" }}>
          {formatSpanishDate(journalEntries[0]?.transactionDate)}
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: isSmallScreen ? "col" : "row",
          alignItems: "left",
          mb: 3,
          mx: 2,
        }}
      >
        <Typography variant="body2" fontWeight="300" color="#606778" sx={{ flex: 1, mt: isSmallScreen ? 1 : 0 }}>
          Creador por
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a" sx={{ flex: 1 }}>
          {journalEntries[0]?.createdByUserName}
        </Typography>
        <Typography variant="body2" fontWeight="300" color="#606778" sx={{ flex: 1, mt: isSmallScreen ? 1 : 0 }}>
          Registrado el
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a" sx={{ flex: 1, textAlign: isSmallScreen ? "left" : "right" }}>
          {formatSpanishDate(journalEntries[0]?.createdDate)}
        </Typography>
      </Stack>

      <DataGrid
        rows={journalEntries}
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
        }}
        onRowClick={e => showDetails(e)}
        disableRowSelectionOnClick
        rowSelection
        pageSizeOptions={[10, 25, 50]}
        loading={isLoading}
      />

      <RenderFormModal
        title="Ver entrada de diario"
        isOpen={showDetailsModal}
        sx={{ maxWidth: "400px", width: isSmallScreen ? "280px" : "400px" }}
        setIsOpen={setShowDetailsModal}
      >
        <Stack
          sx={{
            flexDirection: "col",
            alignItems: "left",
            width: "100%",
            gap: 1,
          }}
        >
          {[
            { label: "Oficina", value: selectedEntry?.officeName },
            { label: "Id de entrada", value: selectedEntry?.id },
            { label: "Fecha de Transacción", value: formatSpanishDate(selectedEntry?.transactionDate) },
            { label: "Tipo", value: selectedEntry?.glAccountType?.value },
            { label: "Código de cuenta", value: selectedEntry?.glAccountId },
            { label: "Nombre de la cuenta", value: selectedEntry?.glAccountName },
            { label: "Débito", value: selectedEntry?.amount },
            { label: "Moneda", value: `(${selectedEntry?.currency?.code}) ${selectedEntry?.currency?.name}` },
            { label: "Registrado el", value: formatSpanishDate(selectedEntry?.createdDate) },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Typography variant="body2" fontWeight="300" color="#606778" sx={{ flex: 1 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" fontWeight="400" color="#12141a" sx={{ flex: 1 }}>
                {item.value}
              </Typography>
            </React.Fragment>
          ))}
        </Stack>
        <Box sx={{ justifyContent: "flex-end", display: "flex", mt: 3 }}>
          <Button type="submit" isLoading={isLoading} size="small" text="Cerrar" variant="navigation" />
        </Box>
      </RenderFormModal>
    </Wrapper>
  );
}
