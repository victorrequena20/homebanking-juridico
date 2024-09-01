import React, { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { detailRowStyles, detailRowWithAction, flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { CreateLoanContext } from "../../context/CreateLoan.context";

export default function CreateLoanResume() {
  const { setStep, globalForm } = useContext(CreateLoanContext);

  return (
    <Stack sx={{ width: "100%", maxWidth: "800px", mx: "auto", pb: 10 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" fontWeight="600">
        Resumen
      </Typography>

      {/* ----- Details start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          General
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      {/* Nombre */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Nombre:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.productName}
        </Typography>
      </Stack>
      {/* Clave */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Clave:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.key}
        </Typography>
      </Stack>
      {/* Fondo */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Fondo:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.fund?.label}
        </Typography>
      </Stack>
      {/* Incluir en el contador de credito del cliente */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Incluir en el contador de créditos al cliente:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.includeInBorrowerCycle ? "Si" : "No"}
        </Typography>
      </Stack>
      {/* Fecha de incio */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Fecha de inicio:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.startDate}
        </Typography>
      </Stack>
      {/* Fecha de cierre */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Fecha de inicio:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.endDate}
        </Typography>
      </Stack>
      {/* Descripción */}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Descripción:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.description}
        </Typography>
      </Stack>
      {/* ----- Details end ----- */}

      {/* ----- Currency start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Moneda
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          código de la moneda:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.currencyCode?.value}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Moneda:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.currencyCode?.label}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Lugares decimales:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.digitsAfterDecimal}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Moneda en múltiplos de:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.currencyInMultiplesOf}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Pago en múltiplos de:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.payInMultiplesOf}
        </Typography>
      </Stack>
      {/* ----- Currency end ----- */}

      {/* ----- Terms start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Términos
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Principal:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm.conditionsPrincipalDefault +
            " (Min " +
            globalForm.conditionsPrincipalMin +
            " : " +
            "Max " +
            globalForm.conditionsPrincipalMax +
            ")"}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Permitir montos aprobados/desembolsados ​por encima de los aplicados:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm.conditionsAllowApprovalAboveCreditAmount ? "Si" : "No"}
        </Typography>
      </Stack>
      {globalForm.conditionsAllowApprovalAboveCreditAmount && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Monto extra:
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${globalForm?.conditionsExtraAmount} ${
              globalForm?.conditionsCalculeType?.value === "PERCENTAGE" ? "%" : "Bs."
            }`}
          </Typography>
        </Stack>
      )}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Cálculo del día de pago a partir de:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm.conditionsRepaymentStartDateType?.label}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Número de reembolsos:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${globalForm?.conditionsNumberOfRepaymentsDefault} (Min ${globalForm?.conditionsNumberOfRepaymentsMin} : Max ${globalForm?.conditionsNumberOfRepaymentsMax})`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Vinculado a tasa de interés variable:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          No
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Tasa de interés nominal:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${globalForm?.conditionsInterestRateDefault} (Min ${globalForm?.conditionsInterestRateMin} : Max ${globalForm?.conditionsInterestRateMax}) ${globalForm?.conditionsInterestRateFrequencyType?.label}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Los términos varían según el ciclo del crédito:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          No
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Paga cada:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${globalForm?.conditionsRepaymentEvery} ${globalForm?.conditionsRepaymentFrequencyType?.label}`}
        </Typography>
      </Stack>
      {/* ----- Terms end ----- */}

      {/* ----- Settings start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Ajustes
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Amortización:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.amortizationType?.label}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          ¿Amortizaciones iguales?:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.isEqualAmortization ? "Si " : "No"}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Método de interés:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.interestType?.label}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Período de cálculo de intereses:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {globalForm?.interestCalculationPeriodType?.label}
        </Typography>
      </Stack>
      {/* ----- Settings end ----- */}

      {/* ----- Pay calendar start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Calendario de pagos
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Tipo de calendario de pagos:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Estrategia de pago:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Pay calendar end ----- */}

      {/* ----- Initial pay start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Pago inicial
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Habilitar Pagos Iniciales:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Initial pay end ----- */}

      {/* ----- Moratoria start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Moratoria
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Clasificación de morosidad:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Dias en el año:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Dias en el mes:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Permitir la fijación del importe de la cuota.:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          La cuenta sale del NPA solo después de que se hayan liquidado todos los atrasos:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Cuotas variables permitidas:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Se permite su uso para proporcionar Créditos de recarga:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Moratoria end ----- */}

      {/* ----- Interest recalculation ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Recálculo de intereses
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Recalcular el interés
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Regla de cálculo de intereses previo al cierre:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Tipo de ajuste de pagos anticipados:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Recálculo de intereses compuestos en:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Frecuencia para recalcular el capital pendiente:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          ¿El reconocimiento de atrasos se basa en el calendario original?:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Interest recalculation ----- */}

      {/* ----- Guarantee requirements start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Poner los fondos de garantía en espera:
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      {/* ----- Guarantee requirements end ----- */}

      {/* ----- Detalles de dispersion de credito start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Detalles del dispersión de Crédito
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Habilitar múltiples desembolsos:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Detalles de dispersion de credito end ----- */}

      {/* ----- Events configuration start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Configuración de eventos
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Utilice los valores de Configuraciones Globales para el Evento de Pago (notificaciones):
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Días de vencimiento para el evento de pago:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Días vencidos para evento de pago:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Events configuration end ----- */}

      {/* ----- Terminos y condiciones configurables start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Términos y condiciones configurables
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Permitir anular términos y configuraciones seleccionados en cuentas de Créditos:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Amortización:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Método de interés:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Estrategia de pago:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Periodo de cálculo de intereses:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Tolerancia de morosidad:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Frecuencia de Pago:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Moratoria:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Número de días que un Crédito puede estar vencido antes de entrar en mora:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Prueba
        </Typography>
      </Stack>
      {/* ----- Terminos y condiciones configurables end ----- */}

      {/* ----- Accounting start ----- */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Contabilidad
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Tipo:
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Ninguno
        </Typography>
      </Stack>
      {/* ----- Accounting end ----- */}
    </Stack>
  );
}
