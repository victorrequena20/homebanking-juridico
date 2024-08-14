"use client";
import Wrapper from "@/components/Wrapper";
import { getLoanInfoById } from "@/services/Loans.service";
import { Box, Breadcrumbs, Stack, SxProps, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function LoanDetailsPage({ params }: { params: { loanId: string } }) {
  const [loanData, setLoanData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getLoanInfoById(parseInt(params.loanId), { template: "false" });
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
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link color="#484848" href="/administracion/productos">
              <Typography variant="body2">Productos</Typography>
            </Link>
            <Link color="#484848" href="/administracion/productos/productos-de-credito">
              <Typography variant="body2">Productos de crédito</Typography>
            </Link>
            <Typography variant="body2">{loanData?.name}</Typography>
          </Breadcrumbs>
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
          <RenderInfoCell textLeft="Nombre" rightText={loanData?.name} />
          <RenderInfoCell textLeft="Clave" rightText={loanData?.shortName} />
          <RenderInfoCell textLeft="Fondo" rightText={loanData?.fundName} />
          <RenderInfoCell
            textLeft="Incluir en el contador de créditos al cliente"
            rightText={loanData?.includeInBorrowerCycle ? "Si" : "No"}
          />
          <RenderInfoCell
            textLeft="Fecha de inicio"
            rightText={`${
              loanData?.startDate ? `${loanData?.startDate[2]}-${loanData?.startDate[1]}-${loanData?.startDate[0]}` : ""
            }`}
          />
          <RenderInfoCell textLeft="Descripción" rightText={loanData?.description} />
        </Stack>

        {/* Moneda */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Moneda
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Moneda" rightText={loanData?.currency?.code} />
          <RenderInfoCell textLeft="Moneda" rightText={loanData?.currency?.name} />
          <RenderInfoCell textLeft="Lugares decimales" rightText={`${loanData?.currency?.decimalPlaces}`} />
          <RenderInfoCell textLeft="Moneda en múltiplos de" rightText={`${loanData?.currency?.inMultiplesOf}`} />
          <RenderInfoCell textLeft="Pago en múltiplos de" rightText={`${loanData?.currency?.inMultiplesOf}`} />
        </Stack>

        {/* Términos */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Términos
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Principal"
            rightText={`${loanData?.principal} (Min ${
              loanData?.minPrincipal ? loanData?.minPrincipal?.toLocaleString() : loanData?.principal
            } : Max ${loanData?.maxPrincipal ? loanData?.maxPrincipal?.toLocaleString() : loanData?.principal})`}
          />
          <RenderInfoCell
            textLeft="Permitir montos aprobados/desembolsados ​​por encima de los aplicados"
            rightText={loanData?.allowApprovedDisbursedAmountsOverApplied ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Cálculo del día de pago a partir de"
            rightText={loanData?.repaymentStartDateType?.value}
          />
          <RenderInfoCell
            textLeft="Número de reembolsos"
            rightText={`${loanData?.numberOfRepayments} (Min: ${loanData?.minNumberOfRepayments}, Max: ${loanData?.maxNumberOfRepayments})`}
          />
          <RenderInfoCell
            textLeft="Vinculado a tasa de interés variable"
            rightText={loanData?.isLinkedToFloatingInterestRates ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Tasa de interés nominal"
            rightText={`${loanData?.interestRatePerPeriod} (Min: ${loanData?.minInterestRatePerPeriod}, Max: ${loanData?.maxInterestRatePerPeriod}) ${loanData?.interestRateFrequencyType?.value}`}
          />
          <RenderInfoCell
            textLeft="Los términos varían según el ciclo del Crédito"
            rightText={loanData?.useBorrowerCycle ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Paga cada"
            rightText={`${loanData?.repaymentEvery} ${loanData?.repaymentFrequencyType?.value}`}
          />
        </Stack>

        {/* Ajustes */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Ajustes
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Amortización" rightText={loanData?.amortizationType?.value} />
          <RenderInfoCell textLeft="¿Amortizaciones iguales?" rightText={loanData?.isEqualAmortization ? "Sí" : "No"} />
          <RenderInfoCell textLeft="Método de interés" rightText={loanData?.interestType?.value} />
          <RenderInfoCell
            textLeft="Período de cálculo de intereses"
            rightText={loanData?.interestCalculationPeriodType?.value}
          />
          <RenderInfoCell
            textLeft="Permitir el cálculo de interés parcial con el mismo pago"
            rightText={loanData?.allowPartialPeriodInterestCalculation ? "Sí" : "No"}
          />
        </Stack>

        {/* Calendario de pagos */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Calendario de pagos
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Tipo de calendario de pagos" rightText={loanData?.loanScheduleType?.value} />
          <RenderInfoCell textLeft="Estrategia de pago" rightText={loanData?.transactionProcessingStrategyName} />
        </Stack>

        {/* Pago inicial */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Pago inicial
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Habilitar Pagos Iniciales" rightText={loanData?.enableDownPayment ? "Sí" : "No"} />
          <RenderInfoCell
            textLeft="Porcentaje del monto desembolsado para el Pago inicial (%)"
            rightText={`${loanData?.disbursedAmountPercentageForDownPayment}%`}
          />
          <RenderInfoCell
            textLeft="Habilitar el pago automático para el pago inicial"
            rightText={loanData?.enableAutoRepaymentForDownPayment ? "Sí" : "No"}
          />
        </Stack>

        {/* Moratoria */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Moratoria
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Clasificación de morosidad"
            rightText={loanData?.delinquencyBucket?.ranges?.length > 0 ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Habilitar morosidad a nivel de cuotas"
            rightText={loanData?.enableInstallmentLevelDelinquency ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Periodos de Gracia en el pago del principal"
            rightText={`${loanData?.graceOnPrincipalPayment}`}
          />
          <RenderInfoCell
            textLeft="Periodos de Gracia en el pago de intereses"
            rightText={`${loanData?.graceOnInterestPayment}`}
          />
          <RenderInfoCell textLeft="Dias en el año" rightText={loanData?.daysInYearType?.value} />
          <RenderInfoCell textLeft="Dias en el mes" rightText={loanData?.daysInMonthType?.value} />
          <RenderInfoCell
            textLeft="Permitir la fijación del importe de la cuota."
            rightText={loanData?.canDefineInstallmentAmount ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Número de días que un Crédito puede estar vencido antes de entrar en mora"
            rightText={`${loanData?.overDueDaysForRepaymentEvent}`}
          />
          <RenderInfoCell
            textLeft="La cuenta sale del NPA solo después de que se hayan liquidado todos los atrasos"
            rightText={loanData?.accountMovesOutOfNPAOnlyOnArrearsCompletion ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Cuotas variables permitidas"
            rightText={loanData?.allowVariableInstallments ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Se permite su uso para proporcionar Créditos de recarga"
            rightText={loanData?.canUseForTopup ? "Sí" : "No"}
          />
        </Stack>

        {/* Recálculo de intereses */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Recálculo de intereses
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Recalcular el interés"
            rightText={loanData?.isInterestRecalculationEnabled ? "Sí" : "No"}
          />
        </Stack>

        {/* Requisitos de garantía */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Requisitos de garantía
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Poner los fondos de garantía en espera"
            rightText={loanData?.holdGuaranteeFunds ? "Sí" : "No"}
          />
        </Stack>

        {/* Detalles del dispersión de Crédito */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Detalles del dispersión de Crédito
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Habilitar múltiples desembolsos"
            rightText={loanData?.multiDisburseLoan ? "Sí" : "No"}
          />
        </Stack>

        {/* Configuración de eventos */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Configuración de eventos
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Utilice los valores de Configuraciones Globales para el Evento de Pago (notificaciones)"
            rightText={loanData?.syncExpectedWithDisbursementDate ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Días de vencimiento para el evento de pago"
            rightText={`${loanData?.dueDaysForRepaymentEvent}`}
          />
          <RenderInfoCell
            textLeft="Días vencidos para evento de pago"
            rightText={`${loanData?.overDueDaysForRepaymentEvent}`}
          />
        </Stack>

        {/* Términos y Condiciones configurables */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Términos y Condiciones configurables
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Permitir anular términos y configuraciones seleccionados en cuentas de Créditos"
            rightText={loanData?.allowAttributeOverrides?.isNew ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Amortización"
            rightText={loanData?.allowAttributeOverrides?.amortizationType ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Método de interés"
            rightText={loanData?.allowAttributeOverrides?.interestType ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Estrategia de pago"
            rightText={loanData?.allowAttributeOverrides?.transactionProcessingStrategyCode ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Periodo de cálculo de intereses"
            rightText={loanData?.allowAttributeOverrides?.interestCalculationPeriodType ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Tolerancia de morosidad"
            rightText={loanData?.allowAttributeOverrides?.inArrearsTolerance ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Frecuencia de Pago"
            rightText={loanData?.allowAttributeOverrides?.repaymentEvery ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Moratoria"
            rightText={loanData?.allowAttributeOverrides?.graceOnPrincipalAndInterestPayment ? "Sí" : "No"}
          />
          <RenderInfoCell
            textLeft="Número de días que un Crédito puede estar vencido antes de entrar en mora"
            rightText={loanData?.allowAttributeOverrides?.graceOnArrearsAgeing ? "Sí" : "No"}
          />
        </Stack>

        {/* Contabilidad */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Contabilidad
            </Typography>
          </Stack>
          <RenderInfoCell textLeft="Tipo" rightText={loanData?.accountingRule?.value} />
        </Stack>

        {/* Activos / Pasivo */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Activos / Pasivo
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Fuente de Recursos"
            rightText={`(${loanData?.accountingMappings?.fundSourceAccount?.glCode}) ${loanData?.accountingMappings?.fundSourceAccount?.name}`}
          />
        </Stack>

        {/* Activos */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Activos
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Cartera de créditos"
            rightText={`${loanData?.accountingMappings?.loanPortfolioAccount?.glCode} - ${loanData?.accountingMappings?.loanPortfolioAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Intereses por cobrar"
            rightText={`${loanData?.accountingMappings?.receivableInterestAccount?.glCode} - ${loanData?.accountingMappings?.receivableInterestAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Comisiones por cobrar"
            rightText={`${loanData?.accountingMappings?.receivableFeeAccount?.glCode} - ${loanData?.accountingMappings?.receivableFeeAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Penalizaciones por Cobrar"
            rightText={`${loanData?.accountingMappings?.receivablePenaltyAccount?.glCode} - ${loanData?.accountingMappings?.receivablePenaltyAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Transferencia en suspenso"
            rightText={`${loanData?.accountingMappings?.transfersInSuspenseAccount?.glCode} - ${loanData?.accountingMappings?.transfersInSuspenseAccount?.name}`}
          />
        </Stack>

        {/* Ingreso */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Ingreso
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Ingresos por intereses"
            rightText={`${loanData?.accountingMappings?.interestOnLoanAccount?.glCode} - ${loanData?.accountingMappings?.interestOnLoanAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Ingresos por Comisiones"
            rightText={`${loanData?.accountingMappings?.incomeFromFeeAccount?.glCode} - ${loanData?.accountingMappings?.incomeFromFeeAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Ingresos por penalizaciones"
            rightText={`${loanData?.accountingMappings?.incomeFromPenaltyAccount?.glCode} - ${loanData?.accountingMappings?.incomeFromPenaltyAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Ingresos por amortizaciones de recuperación"
            rightText={`${loanData?.accountingMappings?.incomeFromRecoveryAccount?.glCode} - ${loanData?.accountingMappings?.incomeFromRecoveryAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Ingresos por intereses de cancelación"
            rightText={`${loanData?.accountingMappings?.incomeFromChargeOffInterestAccount?.glCode} - ${loanData?.accountingMappings?.incomeFromChargeOffInterestAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Ingresos por comisiones de cancelación"
            rightText={`${loanData?.accountingMappings?.incomeFromChargeOffFeesAccount?.glCode} - ${loanData?.accountingMappings?.incomeFromChargeOffFeesAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Ingresos por penalización de cancelación"
            rightText={`${loanData?.accountingMappings?.incomeFromChargeOffPenaltyAccount?.glCode} - ${loanData?.accountingMappings?.incomeFromChargeOffPenaltyAccount?.name}`}
          />
        </Stack>

        {/* Gastos */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Gastos
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Pérdidas cancelaciones"
            rightText={`${loanData?.accountingMappings?.writeOffAccount?.glCode} - ${loanData?.accountingMappings?.writeOffAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Gastos del crédito de buena voluntad"
            rightText={`${loanData?.accountingMappings?.goodwillCreditAccount?.glCode} - ${loanData?.accountingMappings?.goodwillCreditAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Gastos de cancelación"
            rightText={`${loanData?.accountingMappings?.chargeOffExpenseAccount?.glCode} - ${loanData?.accountingMappings?.chargeOffExpenseAccount?.name}`}
          />
          <RenderInfoCell
            textLeft="Cargo por fraude de cancelación"
            rightText={`${loanData?.accountingMappings?.chargeOffFraudExpenseAccount?.glCode} - ${loanData?.accountingMappings?.chargeOffFraudExpenseAccount?.name}`}
          />
        </Stack>

        {/* Pasivo */}
        <Stack>
          <Stack sx={sectionSubtitleBox}>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Pasivo
            </Typography>
          </Stack>
          <RenderInfoCell
            textLeft="Responsabilidad por sobrepago"
            rightText={`${loanData?.accountingMappings?.overpaymentLiabilityAccount?.glCode} - ${loanData?.accountingMappings?.overpaymentLiabilityAccount?.name}`}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
