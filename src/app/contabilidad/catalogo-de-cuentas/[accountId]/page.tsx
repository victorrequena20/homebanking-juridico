"use client";
import React from "react";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import Wrapper from "@/components/Wrapper";
import { detailRowStyles, detailRowWithAction, flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";
import { deleteGlAccount, getGlAccountsTemplateById, updateGlAccount } from "@/services/Accounting.service";
import { toast } from "sonner";

export default function AccountDetailPage({ params }: { params: { accountId: string } }) {
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [isLoadingInfo, setIsLoadingInfo] = React.useState<boolean>(false);
  const [templateByIdData, setTemplateByIdData] = React.useState<any>({});
  const router = useRouter();

  async function handleGetTemplateById() {
    setIsLoadingInfo(true);
    const response = await getGlAccountsTemplateById(params?.accountId);
    if (response?.status === 200) {
      setTemplateByIdData(response?.data);
      setIsDisabled(response?.data?.disabled);
    } else {
      toast.error("Error al obtener los datos de la cuenta.");
    }
    setIsLoadingInfo(false);
  }

  async function handleDeleteUser() {
    const response = await deleteGlAccount(params?.accountId);
    if (response?.status === 200) {
      toast.success("Cuenta eliminada correctamente.");
      router.push("/contabilidad/catalogo-de-cuentas");
    } else {
      toast.error("Error al eliminar la cuenta.");
    }
  }

  async function handleDeactivateAccount() {
    const response = await updateGlAccount({ disabled: !isDisabled }, params?.accountId);
    if (response?.status === 200) {
      toast.success(`Cuenta ${isDisabled ? "activada" : "desactivada"} correctamente`);
      setIsDisabled(!isDisabled);
    } else {
      toast.error("Error al desactivar la cuenta.");
    }
  }

  React.useEffect(() => {
    handleGetTemplateById();
  }, []);

  return (
    <Wrapper isLoading={isLoadingInfo}>
      <Breadcrumbs
        items={[
          { title: "Inicio" },
          { title: "Administración" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Catálogo de cuentas", href: "/contabilidad/catalogo-de-cuentas" },
          { title: templateByIdData?.name },
        ]}
      />

      <Stack sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="600">
          {templateByIdData?.name}
        </Typography>
        <Typography variant="body1" fontWeight="300" color="#606778">
          Los detalles de esta cuenta se encuentran debajo.
        </Typography>
      </Stack>

      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #cccccc80",
            pb: 2,
          }}
        >
          <Typography variant="body2" fontWeight="400">
            Detalles de la cuenta
          </Typography>
          <Box sx={{ ...flexRowCenter, gap: 1 }}>
            <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="var(--secondaryText)">
              Ver y editar
            </Typography>
            <ArrowRightIcon size={16} color="var(--secondaryText)" />
          </Box>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Tipo de cuenta
          </Typography>
          <Typography variant="body2" fontWeight="400">
            Activo
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Número de cuenta
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {templateByIdData?.glCode}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Uso de la cuenta
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {templateByIdData?.usage?.value}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Permitir entradas manuales
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {templateByIdData?.manualEntriesAllowed ? "Sí" : "No"}
          </Typography>
        </Stack>
        {templateByIdData?.description && (
          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
              Descripción
            </Typography>
            <Typography variant="body2" fontWeight="400">
              {templateByIdData?.description}
            </Typography>
          </Stack>
        )}

        {/* Agregar cuenta auxiliar */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Cuenta auxiliar
          </Typography>
          <Button
            text="Agregar"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() =>
              router.push(`/contabilidad/catalogo-de-cuentas/${params?.accountId}/agregar-cuenta-auxiliar`)
            }
          />
        </Stack>

        {/* Activación / desactivación */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {isDisabled ? "Activar" : "Desactivar"} cuenta
          </Typography>
          <Button
            text={isDisabled ? "Activar" : "Desactivar"}
            variant={isDisabled ? "success" : "warning-red"}
            onClick={() => handleDeactivateAccount()}
          />
        </Stack>
        {/* Eliminar */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Eliminar cuenta
          </Typography>
          <ConfirmDeleteModal
            title="¿Estás seguro de que deseas eliminar esta cuenta?"
            actionCallback={handleDeleteUser}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
