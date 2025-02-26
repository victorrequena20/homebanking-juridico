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
import { reports } from "@/constants/global";

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
    const response = reports.find(item => item.id == params?.reportName);
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
    console.warn(params?.reportName);
    const response = reports.find(item => item.id == params?.reportName);
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
            Detalles del reporte
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Fecha
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {data?.fecha}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Cliente
          </Typography>
          <Typography variant="body2" fontWeight="400">
            {data?.cliente}
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Monto
          </Typography>
          <Typography variant="body2" fontWeight="400">
            Bs. {data?.monto}
          </Typography>
        </Stack>

        {/* Activación / desactivación */}
        {!data?.fechaConciliacion ? (
          <Stack sx={detailRowWithAction}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Conciliar
            </Typography>
            <Button
              text={!data?.active ? "Conciliar" : "Desactivar"}
              variant={!data?.active ? "success" : "warning-red"}
              onClick={() => handleDeactivateAccount()}
            />
          </Stack>
        ) : (
          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
              Fecha de concialición
            </Typography>
            <Typography variant="body2" fontWeight="400">
              {data?.fechaConciliacion}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Wrapper>
  );
}
