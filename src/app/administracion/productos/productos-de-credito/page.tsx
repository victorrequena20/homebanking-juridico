"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { getLoanProducts } from "@/services/Loans.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import { formatSpanishDate } from "@/utilities/common.utility";
import Link from "next/link";

export default function CreditProducts() {
  const [loanProducts, setLoanProducts] = React.useState<any | null>([]);
  const router = useRouter();

  const columns: GridColDef<(typeof loanProducts)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "shortName",
      headerName: "Clave",
      flex: 1,
      valueGetter: (_, row) => `${row.shortName || ""}`,
    },
    {
      field: "closeDate",
      headerName: "Fecha de caducidad",
      flex: 1,
      valueGetter: (_, row) => `${row?.closeDate ? formatSpanishDate(row?.closeDate) : "" || ""}`,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.status === "loanProduct.active" ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.status === "loanProduct.active" ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getLoanProducts();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setLoanProducts(response?.data);
      }
      console.log("🚀 ~ response:", response);
    })();
  }, []);

  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Productos de crédito</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link color="inherit" href="/administracion/productos">
              <Typography variant="body2">Productos</Typography>
            </Link>
            <Typography variant="body2">Productos de crédito</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
          <Button
            size="small"
            variant="primary"
            text="Crear producto de crédito"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() => router.push("/administracion/organizacion/administrar-oficinas/create")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          sx={{ borderRadius: "16px", overflow: "hidden" }}
          rows={loanProducts}
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
          onRowClick={(params, event, details) =>
            router.push(`/administracion/productos/productos-de-credito/${params.row.id}`)
          }
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
