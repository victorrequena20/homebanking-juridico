"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { CreateClientContext } from "../../context/CreateClient/CreateClient.context";
import { Box } from "@mui/material";
import { detailRowStyles, detailRowWithAction, flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";

export default function ClientResume() {
  const { clientGeneralData } = React.useContext(CreateClientContext);
  return (
    <Stack sx={{ width: "100%", maxWidth: "800px", mx: "auto" }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" fontWeight="600">
        Resumen
      </Typography>
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          General
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Nombre
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.firstname || ""} ${clientGeneralData?.middlename || ""} ${
            clientGeneralData?.lastname || ""
          }`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Oficina
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.officeId?.label || ""}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Forma juridica
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.legalFormId?.label || ""}`}
        </Typography>
      </Stack>
      {/* Asesor */}
      {clientGeneralData?.staffId && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Asesor
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.staffId?.label || ""}`}
          </Typography>
        </Stack>
      )}
      {/* Fecha de nacimiento */}
      {clientGeneralData?.staffId && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Fecha de nacimiento
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.dateOfBirth || ""}`}
          </Typography>
        </Stack>
      )}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          ID externo
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.externalId || ""}`}
        </Typography>
      </Stack>
      {/* Numero de telefono movil */}
      {clientGeneralData?.mobileNo && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Número de teléfono móvil
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.mobileNo || ""}`}
          </Typography>
        </Stack>
      )}
      {/* email */}
      {clientGeneralData?.emailAddress && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Correo electrónico
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.emailAddress || ""}`}
          </Typography>
        </Stack>
      )}
      {/* Producto de ahorro */}
      {clientGeneralData?.savingsProductId && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Producto de ahorro
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.savingsProductId?.label || ""}`}
          </Typography>
        </Stack>
      )}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Registrado el día
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${"Hoy" || ""}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Activo?
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.active ? "Si" : "No" || ""}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Es Staff?
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.isStaff ? "Si" : "No" || ""}`}
        </Typography>
      </Stack>
    </Stack>
  );
}
