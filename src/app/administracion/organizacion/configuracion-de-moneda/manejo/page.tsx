"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal/ConfirmDeleteModal";
import InputSelect from "@/components/InputSelect";
import { getCurrencies, updateCurrencies } from "@/services/Core.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { toast } from "sonner";

export default function ManejoPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = React.useState<boolean>(false);
  const [currencySelected, setCurrencySelected] = React.useState<any | null>({});
  const [currencyToDelete, setCurrencyToDelete] = React.useState<string>("");
  const [currencies, setCurrencies] = React.useState<any>({});
  const router = useRouter();

  const handleGetCurrencies = async () => {
    setIsLoading(true);
    const response = await getCurrencies();
    if (response?.status === 200) {
      setCurrencies(response?.data);
    }
    setIsLoading(false);
  };

  const handleUpdateCurrencies = async () => {
    setIsLoadingUpdating(true);
    const selectedCurrencies = currencies?.selectedCurrencyOptions?.map((el: any) => el?.code);
    selectedCurrencies?.push(currencySelected?.value);
    const response = await updateCurrencies({ currencies: selectedCurrencies });
    if (response?.status === 200) {
      handleGetCurrencies();
      setCurrencySelected(null);
      toast.success("Operación exitosa!");
    }
    setIsLoadingUpdating(false);
  };

  const handleDeleteCurrency = async () => {
    const selectedCurrencies = currencies?.selectedCurrencyOptions?.filter((el: any) => el?.code !== currencyToDelete);
    const response = await updateCurrencies({ currencies: selectedCurrencies?.map((el: any) => el?.code) });
    if (response?.status === 200) {
      handleGetCurrencies();
      toast.success("Moneda eliminada con exito.");
    }
  };

  React.useEffect(() => {
    handleGetCurrencies();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Administrar monedas</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">Inicio</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link color="inherit" href="/administracion/organizacion">
              <Typography variant="body2">Organización</Typography>
            </Link>
            <Link color="text.primary" href="/administracion/organizacion/configuracion-de-moneda" aria-current="page">
              <Typography variant="body2">Configuración de moneda</Typography>
            </Link>
            <Typography variant="body2">Administrar monedas</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>

      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        {/* Monedas */}
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
          <InputSelect
            label="Moneda*"
            options={keyValueAdapter(currencies?.currencyOptions, "displayLabel", "code")}
            setItem={item => setCurrencySelected(item)}
          />
          <Button
            size="small"
            variant="primary"
            text="Agregar"
            iconLeft
            icon={<PlusIcon color="#fff" size={20} />}
            isLoading={isLoadingUpdating}
            disabled={!currencySelected?.value}
            onClick={handleUpdateCurrencies}
          />
        </Stack>
        <Stack sx={{ mt: 12, bgcolor: "#F2F4F7", padding: 2, borderRadius: "8px" }}>
          <Stack>
            <Typography variant="body1" color="#484848">
              Lista de monedas
            </Typography>
          </Stack>
          {/* Eliminar */}
          {currencies?.selectedCurrencyOptions?.map((el: any) => (
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
                mt: 4,
              }}
            >
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {el?.name}
              </Typography>
              <ConfirmDeleteModal
                buttonActionCallback={() => setCurrencyToDelete(el?.code)}
                actionCallback={handleDeleteCurrency}
                title="¿Estás seguro de que deseas eliminar esta moneda?"
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Wrapper>
  );
}
