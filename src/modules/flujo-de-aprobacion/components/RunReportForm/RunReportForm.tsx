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
import { reportsData } from "@/constants/global";

export default function AccountDetailPage({ params }: { params: any }) {
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [isLoadingInfo, setIsLoadingInfo] = React.useState<boolean>(false);
  const [templateByIdData, setTemplateByIdData] = React.useState<any>({});
  const [data, setData] = React.useState<any>({});
  const router = useRouter();

  async function handleGetTemplateById() {
    setIsLoadingInfo(true);
    const response = await getGlAccountsTemplateById(params?.accountId);
    if (response?.status === 200) {
      setTemplateByIdData(response?.data);
      setIsDisabled(response?.data?.disabled);
    } else {
      // toast.error("Error al obtener los datos de la cuenta.");
    }
    setIsLoadingInfo(false);
  }

  function handleDeleteUser() {
    const response = reportsData.find(item => item.name == params?.reportName);
  }

  async function handleDeactivateAccount() {
    const response = await updateGlAccount({ disabled: !isDisabled }, params?.id);
    if (response?.status === 200) {
      toast.success(`Cuenta ${isDisabled ? "activada" : "desactivada"} correctamente`);
      setIsDisabled(!isDisabled);
    } else {
      toast.error("Error al desactivar la cuenta.");
    }
  }

  React.useEffect(() => {
    handleGetTemplateById();
    const decodeUri = decodeURIComponent(params?.reportName?.toString());
    const response = reportsData.find(item => item.name == decodeUri);
    setData(response);
  }, []);

  return (
    <Wrapper isLoading={isLoadingInfo}>
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
            Detalles del flujo de aprobación
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Nombre
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {data?.name}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Tipo de flujo de aprobación
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {data?.type}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Categoria
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {data?.category}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Activo
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {data?.active ? "Sí" : "No"}
          </Typography>
        </Stack>

        {data?.steps?.length > 0 && (
          <Stack sx={{ mt: 3 }}>
            <Typography variant="body2" fontWeight="300" color="var(--secondaryText)" sx={{ mb: 2 }}>
              Pasos del flujo de aprobación
            </Typography>
            {data?.steps.map((step: any, index: number) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: 2,
                  mb: 1,
                  border: "1px solid var(--lightGray)",
                  borderRadius: "8px",
                  backgroundColor: "var(--lightBackground)",
                }}
              >
                <Typography variant="body2" fontWeight="400">
                  Paso {index + 1}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
                    Rol: {step.role}
                  </Typography>
                  <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
                    Nivel: {step.level}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}

        {/* Activación / desactivación */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {!data?.active ? "Activar" : "Desactivar"} flujo de aprobación
          </Typography>
          <Button
            text={!data?.active ? "Activar" : "Desactivar"}
            variant={!data?.active ? "success" : "warning-red"}
            onClick={() => handleDeactivateAccount()}
          />
        </Stack>
        {/* Eliminar */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Eliminar flujo de aprobación
          </Typography>
          <ConfirmDeleteModal title="¿Estás seguro de que deseas eliminar esta cuenta?" actionCallback={handleDeleteUser} />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
