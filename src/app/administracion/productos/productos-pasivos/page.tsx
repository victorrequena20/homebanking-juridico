"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Breadcrumbs from "@/components/Breadcrumbs";
import { getProductsPassives } from "@/services/Products.service";
import Input from "@/components/Input";

export default function CreditProducts() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loanProducts, setLoanProducts] = React.useState<any | null>([]);
  const [loanProductsAll, setLoanProductsAll] = React.useState<any | null>([]);
  const router = useRouter();

  const columns: GridColDef<(typeof loanProducts)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "shortName",
      headerName: "Clave",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => `${row.shortName || ""}`,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getProductsPassives();
      if (response?.status === 200) {
        setLoanProducts(response?.data);
        setLoanProductsAll(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const filterData = (value: string) => {
    try {
      if (value) {
        const filteredProducts = loanProductsAll.filter((product: any) => product.name.toLowerCase().includes(value.toLowerCase()));
        setLoanProducts(filteredProducts);
        return;
      }

      setLoanProducts(loanProductsAll);

      return;
    } catch (error) {
      console.error("error al filtrar");
    }
  };

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Productos pasivo"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Productos", href: "/administracion/productos" },
          { title: "Productos pasivo", href: "/administracion/productos/productos-pasivos" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 8 }}>
        <Input
          placeholder="Filtrar"
          onChange={e => {
            console.log(e.target.value);
            filterData(e.target.value);
          }}
        />
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            size="small"
            variant="primary"
            text="Crear producto pasivo"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() => router.push("/administracion/productos/productos-pasivos/crear")}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <DataGrid
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
          onRowClick={(params, event, details) => router.push(`/administracion/productos/productos-pasivos/${params.row.id}`)}
          pageSizeOptions={[10, 25, 50]}
        />
      </Stack>
    </Wrapper>
  );
}
