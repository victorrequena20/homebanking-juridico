"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography, Box } from "@mui/material";
import { flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  deleteFinancialActivityMapping,
  getFinancialActivityAccountsTemplateById,
} from "@/services/Accounting.service";
import { toast } from "sonner";
import CreateGlMappingForm from "@/modules/contabilidad/components/CreateGlAccountMapping/CreateGlAccountMapping";
import { useRouter } from "next/navigation";

export default function GlAccountDetails({ params }: { params: { glAccountId: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any>(null);
  const router = useRouter();

  async function handleGetFinancialActivityAccountsTemplateById() {
    setIsLoading(true);
    const response = await getFinancialActivityAccountsTemplateById(params.glAccountId);
    if (response?.status === 200) {
      setTemplateData(response?.data);
    } else {
      toast.error("Error al obtener la información de la actividad financiera");
    }
    setIsLoading(false);
  }

  async function handleDeleteFinancialActivity() {
    const response = await deleteFinancialActivityMapping(params.glAccountId);
    if (response?.status === 200) {
      toast.success("Actividad financiera eliminada correctamente");
      router.push("/contabilidad/cuentas-vinculadas-actividades-financieras");
    } else {
      toast.error("Error al eliminar la actividad financiera");
    }
  }

  React.useEffect(() => {
    handleGetFinancialActivityAccountsTemplateById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Mapeos de actividades financieras"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          {
            title: "Mapeos de actividades financieras",
            href: "/contabilidad/cuentas-vinculadas-actividades-financieras",
          },
          { title: "Detalles de la cuenta" },
        ]}
      />

      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        <Stack>
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
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Detalles de la actividad financiera
            </Typography>
            <Box
              sx={{ ...flexRowCenter, gap: 1 }}
              onClick={() =>
                router.push(`/contabilidad/cuentas-vinculadas-actividades-financieras/${params.glAccountId}/editar`)
              }
            >
              <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
                Ver y editar
              </Typography>
              <ArrowRightIcon size={16} color="var(--secondaryText)" />
            </Box>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Actividad financiera
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {templateData?.financialActivityData?.name}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Tipo de cuenta
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {templateData?.financialActivityData?.mappedGLAccountType}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Nombre de la cuenta
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="40ch" textAlign="end">
              {templateData?.glAccountData?.name}
            </Typography>
          </Stack>

          {/* Activación / desactivación */}
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
                mt: 5,
              }}
            >
              <Typography variant="body2" fontWeight="400" color="#12141a">
                Eliminar actividad financiera
              </Typography>
              <ConfirmDeleteModal
                title="¿Estás seguro de que deseas eliminar esta actividad financiera?"
                actionCallback={handleDeleteFinancialActivity}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
