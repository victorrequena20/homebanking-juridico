"use client";
import EditIcon from "@/assets/icons/EditIcon";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { getProductPassiveInfoById } from "@/services/Products.service";
import { formatAmountB } from "@/utilities/amount.utility";
import { Stack, SxProps, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductPassiveDetailPage({ params }: { params: { loanId: string } }) {
  const [loanData, setLoanData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const sectionSubtitleBox: SxProps = {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #cccccc80",
    pb: 2,
    mt: 4,
  };

  const infoCell: SxProps = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 3,
  };

  function mapToSpanish(text: string): string {
    const translations: { [key: string]: string } = {
      Daily: "Diario",
      Monthly: "Mensual",
      "Daily Balance": "Saldo diario",
      Annual: "Anual",
      "365 Days": "365 Dias",
      NONE: "Ninguno",
    };
    return translations[text] || text; // Devuelve la traducción si existe, o el texto original si no se encuentra
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getProductPassiveInfoById(parseInt(params.loanId), { template: "false" });
      if (response?.status) {
        setLoanData(response.data); // Asigna la data del producto de crédito al estado
      }
      setIsLoading(false);
    })();
  }, []);

  const RenderInfoCell = ({ textLeft, rightText }: { textLeft: string; rightText?: string }) => {
    return (
      <Stack sx={infoCell}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          {textLeft}
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="50ch">
          {rightText || ""}
        </Typography>
      </Stack>
    );
  };

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Producto de ahorro"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Productos pasivo", href: "/administracion/productos/productos-pasivos" },
          { title: "Producto de ahorro" },
        ]}
      />

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", mt: 8 }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            size="small"
            variant="primary"
            text="Editar"
            iconLeft
            icon={<EditIcon size={20} color="#fff" />}
            onClick={() => router.push("/administracion/productos/productos-pasivo/crear")}
          />
        </Stack>
      </Stack>

      <Stack sx={{ mt: 1, minWidth: "800px", maxWidth: "800px" }}>
        {/* Detalles */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Detalles
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Clave" rightText={loanData?.shortName} />

          <RenderInfoCell textLeft="Descripción" rightText={loanData?.description} />
        </Stack>

        {/* Moneda */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Moneda
            </Typography>
          </Stack>
          {/* <RenderInfoCell textLeft="Moneda" rightText={loanData?.currency?.code} /> */}
          <RenderInfoCell textLeft="Moneda" rightText={loanData?.currency?.name} />
          <RenderInfoCell textLeft="Lugares decimales" rightText={`${loanData?.currency?.decimalPlaces}`} />
          <RenderInfoCell textLeft="Moneda en múltiplos de" rightText={`${loanData?.currency?.inMultiplesOf}`} />
        </Stack>

        {/* Términos */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Términos
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Tasa de interés nominal anual" rightText={`${formatAmountB(loanData?.nominalAnnualInterestRate)}%`} />
          <RenderInfoCell textLeft="Período de contabilización de intereses" rightText={mapToSpanish(loanData?.interestCompoundingPeriodType?.value)} />
          <RenderInfoCell textLeft="Período de capitalización de intereses" rightText={mapToSpanish(loanData?.interestPostingPeriodType?.value)} />
          <RenderInfoCell textLeft="Interés calculado usando" rightText={mapToSpanish(loanData?.interestCalculationType?.value)} />
          <RenderInfoCell textLeft="Días en el año:" rightText={mapToSpanish(loanData?.interestCalculationDaysInYearType?.value)} />
        </Stack>

        {/* Ajustes */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Ajustes
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Aplicar comisión de retiro para transferencias" rightText={loanData?.withdrawalFeeForTransfers ? "Sí" : "No"} />
          <RenderInfoCell textLeft="Saldo mínimo requerido" rightText={loanData?.enforceMinRequiredBalance ? "Sí" : "No"} />
          <RenderInfoCell textLeft="Se aplica la retención de impuestos" rightText={loanData?.withHoldTax ? "Sí" : "No"} />
          <RenderInfoCell textLeft="¿Se permite el sobregiro?" rightText={loanData?.lienAllowed ? "Sí" : "No"} />
          <RenderInfoCell textLeft="Habilitar seguimiento de inactividad" rightText={loanData?.isDormancyTrackingActive ? "Sí" : "No"} />
        </Stack>

        {/* Contabilidad */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Contabilidad
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Tipo" rightText={mapToSpanish(loanData?.accountingRule?.value)} />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
