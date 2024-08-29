"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrencies } from "@/services/Core.service";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ConfiguracionDeMonedaPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currencies, setCurrencies] = React.useState<any>([{ id: 1 }]);

  const router = useRouter();

  const columns: GridColDef<(typeof currencies)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre de la moneda",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "code",
      headerName: "Código de moneda",
      flex: 1,
      valueGetter: (value, row) => `${row?.code || ""} `,
    },
  ];

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getCurrencies();
      if (response?.status === 200) {
        setCurrencies(
          response?.data?.selectedCurrencyOptions?.map((item: any) => {
            return {
              name: item?.name,
              code: item?.code,
              id: item?.name,
            };
          })
        );
      }

      setIsLoading(false);
    })();
  }, []);
  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Configuración de moneda"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Configuración de moneda" },
        ]}
      />

      <Stack sx={{ alignItems: "flex-end" }}>
        <Button
          iconLeft
          icon={<PlusIcon size={20} color="#fff" />}
          size="small"
          variant="primary"
          text="Agregar/Editar"
          onClick={() => router.push("/administracion/organizacion/configuracion-de-moneda/manejo")}
        />
      </Stack>

      <Stack sx={{ mt: 5 }}>
        <DataGrid
          rows={currencies}
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
      </Stack>
    </Wrapper>
  );
}
