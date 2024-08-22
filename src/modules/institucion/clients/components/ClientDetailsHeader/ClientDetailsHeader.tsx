import React from "react";
import { formatSpanishDate } from "@/utilities/common.utility";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import Image from "next/image";

export default function ClientDetailsHeader({ clientData }: { clientData: any }) {
  return (
    <Stack sx={{ alignItems: "center", width: "100%" }}>
      <Stack
        sx={{
          bgcolor: "#f2f4f7",
          width: "100%",
          height: "300px",
          borderRadius: "16px",
          justifyContent: "center",
          boxShadow: "0px 4px 12px -4px #10182810",
        }}
      >
        <Stack sx={{ px: 4, flexDirection: "row", alignItems: "center" }}>
          <Stack
            sx={{
              alignItems: "center",
              width: "160px",
              height: "160px",
              position: "relative",
              borderRadius: "80px",
            }}
          >
            {/* Status */}
            <Tooltip
              placement="top"
              title={
                clientData?.status?.value === "Active"
                  ? "Activo"
                  : clientData?.status?.value === "Pending"
                  ? "Pendiente"
                  : "Activo"
              }
            >
              <Box
                sx={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "8px",
                  bgcolor: `${
                    clientData?.status?.value === "Active"
                      ? "var(--primaryGreen)"
                      : clientData?.status?.value === "Pending"
                      ? "#FF9300"
                      : "var(--primaryGreen)"
                  }`,
                  position: "absolute",
                  top: "7px",
                  right: "24px",
                }}
              />
            </Tooltip>
            <Image
              width={160}
              height={160}
              src="/assets/images/profile.jpg"
              style={{ borderRadius: "100px", objectFit: "cover" }}
              alt="Profile"
            />
            <Typography variant="caption" fontWeight="300" color="var(--secondaryText)" sx={{ mt: 1 }}>
              Ver firma
            </Typography>
          </Stack>
          <Stack>
            <Stack sx={{ pl: 4, gap: 1.5, py: 1 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Nombre del cliente:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.displayName}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Oficina:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.officeName}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Documento:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.externalId}
                </Typography>
              </Stack>
              {clientData?.timeline?.activatedOnDate && (
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Fecha de activación:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {formatSpanishDate(clientData?.timeline?.activatedOnDate)}
                  </Typography>
                </Stack>
              )}
              {clientData?.loanOfficer && (
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Asesor:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {clientData?.loanOfficer}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack sx={{ pl: 4, gap: 1.5, pt: 3 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Número de teléfono:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  0412-15-4757
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Correo electrónico:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  requenade@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
