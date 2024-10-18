"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography, Box } from "@mui/material";
import { flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { deleteFinancialActivityMapping } from "@/services/Accounting.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { activeHoliday, deleteHoliday, getDetailHoliday } from "@/services/Holidays.service";
import ConfirmActiveHolidayModal from "@/components/Modals/ConfirmActiveHolidayModal";

export default function GlAccountDetails({ params }: { params: { dayId: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any>(null);
  const router = useRouter();

  function formatDate(dateArray: any) {
    try {
      const [year, month, day] = dateArray;

      const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

      const formattedDate = `${day} ${months[month - 1]} ${year}`;
      return formattedDate;
    } catch (error) {
      return "";
    }
  }

  async function handleGetFinancialActivityAccountsTemplateById() {
    setIsLoading(true);
    const response = await getDetailHoliday(params.dayId);
    if (response?.status === 200) {
      setTemplateData(response?.data);
    } else {
      toast.error("Error al obtener la información del dia festivo");
    }
    setIsLoading(false);
  }

  async function handleDeleteFinancialActivity() {
    const response = await deleteHoliday(params.dayId);
    if (response?.status === 200) {
      toast.success("Dia festivo eliminado correctamente");
      router.push("/administracion/organizacion/administrar-festivos/");
    } else {
      toast.error("Error al eliminar la dia festivo");
    }
  }

  async function handleActiveHoliday() {
    const response = await activeHoliday(params.dayId);
    if (response?.status === 200) {
      router.push("/administracion/organizacion/administrar-festivos");
    } else {
      toast.error("Error al eliminar la dia festivo");
    }
  }

  React.useEffect(() => {
    handleGetFinancialActivityAccountsTemplateById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Administrar festivos"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Administrar festivos" },
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
              Administrar festivos
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => router.push(`/administracion/organizacion/administrar-festivos/${params.dayId}/editar`)}>
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
              Nombre
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {templateData?.name}
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
              Desde la fecha
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {formatDate(templateData?.fromDate)}
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
              Hasta la fecha
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="40ch" textAlign="end">
              {formatDate(templateData?.toDate)}
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
              Reembolsos programados para
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="40ch" textAlign="end">
              Próxima fecha de pago
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
                Eliminar dia festivo
              </Typography>
              <Box sx={{ flexDirection: "row", gap: 2, display: "flex" }}>
                <ConfirmDeleteModal title="¿Estás seguro de que deseas eliminar este dia festivo?" actionCallback={handleDeleteFinancialActivity} />
                {templateData?.status?.value == "Active" && (
                  <ConfirmActiveHolidayModal title="¿Estás seguro de que deseas activar este dia festivo?" actionCallback={handleActiveHoliday} />
                )}
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
