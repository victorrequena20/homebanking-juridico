"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Wrapper from "@/components/Wrapper";
import { deleteAccountingRule, getAccountingRuleById } from "@/services/Accounting.service";
import { toast } from "sonner";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import { useRouter } from "next/navigation";

export default function AccountingRuleDetails({ params }: { params: { ruleId: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accountingRuleData, setAccountingRuleData] = React.useState<any | null>(null);
  const router = useRouter();

  async function handleGetAccountingRuleById() {
    setIsLoading(true);
    const response = await getAccountingRuleById(params.ruleId);
    if (response?.status === 200) {
      setAccountingRuleData(response?.data);
    } else {
      toast.error("Error al obtener la regla de contabilidad.");
    }
    setIsLoading(false);
  }
  async function handleDelete() {
    const response = await deleteAccountingRule(accountingRuleData?.id);
    if (response?.status === 200) {
      toast.success("Regla contable eliminada correctamente.");
      router.push("/contabilidad/reglas-de-contabilidad");
    } else {
      toast.error("Error al eliminar la regla contable.");
    }
  }

  React.useEffect(() => {
    handleGetAccountingRuleById();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title={accountingRuleData?.name || "Reglas de contabilidad"}
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Reglas de contabilidad", href: "/contabilidad/reglas-de-contabilidad" },
          { title: accountingRuleData?.name || "" },
        ]}
      />

      <Stack>
        <Stack sx={{ mt: 1 }}>
          <Typography variant="body2" fontWeight="400" color="#606778">
            Los detalles de esta regla contable se encuentran debajo.
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
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Detalles de la regla contable
            </Typography>
            <Box
              sx={{ ...flexRowCenter, gap: 1 }}
              onClick={() => router.push(`/contabilidad/reglas-de-contabilidad/${params?.ruleId}/editar`)}
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
              Oficina
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {`${accountingRuleData?.officeName}`}
            </Typography>
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
              Descripción
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {`${accountingRuleData?.description}`}
            </Typography>
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
              Se permiten múltiples asientos de débito
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {`${accountingRuleData?.allowMultipleDebitEntries ? "Si" : "No"}`}
            </Typography>
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
              Se permiten múltiples entradas de crédito
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {`${accountingRuleData?.allowMultipleCreditEntries ? "Si" : "No"}`}
            </Typography>
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
              Nombre de la cuenta de débito
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="26ch" textAlign="start">
              {`${accountingRuleData?.debitAccounts[0]?.name}`}
            </Typography>
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
              Nombre de la cuenta de crédito
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="26ch" textAlign="start">
              {`${accountingRuleData?.creditAccounts[0]?.name}`}
            </Typography>
          </Stack>

          {/* Eliminar */}
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
                mt: 5,
              }}
            >
              <Typography variant="body2" fontWeight="400" color="#12141a">
                Eliminar regla contable
              </Typography>
              <ConfirmDeleteModal
                title="¿Estás seguro de que deseas eliminar esta regla contable?"
                actionCallback={handleDelete}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
