"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import PeopleIcon from "@/assets/icons/PeopleIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import WalletAddIcon from "@/assets/icons/WalletAddIcon";
import BellLineIcon from "@/assets/icons/BellLineIcon";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <Wrapper>
      <Breadcrumbs items={[{ title: "Litecore" }]} />
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Stack className="fade-in-bottom">
          <Typography variant="h4" fontWeight="500">
            Hola, Litecore
          </Typography>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Accede al historial completo de actividades bancarias aquí.
          </Typography>
        </Stack>

        <Stack sx={{}}>
          <Link href="/notificaciones">
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "var(--secondaryBg)",
                "&:hover": {
                  bgcolor: "#d6d6d6",
                  cursor: "pointer",
                },
              }}
            >
              <BellLineIcon color="#12141a" />
            </Box>
          </Link>
        </Stack>
      </Stack>

      <Stack sx={{ mt: 4, flexDirection: "row", columnGap: 3 }}>
        <Box
          sx={{
            width: "300px",
            height: "auto",
            borderRadius: "16px",
            backgroundColor: "var(--secondaryBg)",
            p: 2,
            // border: "1px solid black",
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#07195215",
                border: "1px solid #E4E7EC",
              }}
            >
              <PeopleIcon size={26} color="#12141a" />
            </Box>
            <Stack sx={{ flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="body1" fontWeight="300">
                Total de clientes
              </Typography>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" fontWeight="600">
                  115
                </Typography>
                <Typography variant="caption" fontWeight="400" color="#067647">
                  +15%
                </Typography>{" "}
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "300px",
            height: "auto",
            borderRadius: "16px",
            backgroundColor: "var(--secondaryBg)",
            p: 2,
            // border: "1px solid black",
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#07195215",
                border: "1px solid #E4E7EC",
              }}
            >
              <PersonHexagonalIcon strokeWidth="1.5" size={28} color="#12141a" />
            </Box>
            <Stack sx={{ flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="body1" fontWeight="300">
                Total de usuarios
              </Typography>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" fontWeight="600">
                  72
                </Typography>
                <Typography variant="caption" fontWeight="400" color="#067647">
                  +80.5%
                </Typography>{" "}
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "300px",
            height: "auto",
            borderRadius: "16px",
            backgroundColor: "var(--secondaryBg)",
            p: 2,
            // border: "1px solid black",
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#07195215",
                border: "1px solid #E4E7EC",
              }}
            >
              <WalletAddIcon size={28} color="#12141a" />
            </Box>
            <Stack sx={{ flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="body1" fontWeight="300">
                Créditos otorgados
              </Typography>

              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" fontWeight="600">
                  1.203
                </Typography>
                <Typography variant="caption" fontWeight="400" color="#067647">
                  +7.5%
                </Typography>{" "}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {/* Graphics */}
      <Stack sx={{ alignItems: "center", height: "100%", mt: 24 }}>
        <Image width={120} height={120} alt="" src="/assets/images/daw.svg" />
        <Typography variant="caption" fontWeight="300" color="var(--secondaryText)">
          No hay datos que mostrar.
        </Typography>
      </Stack>
    </Wrapper>
  );
}
