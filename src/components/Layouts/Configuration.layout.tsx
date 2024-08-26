"use client";
import React from "react";
import { Box, SxProps, Grid, Typography, Stack } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useParams, usePathname, useRouter } from "next/navigation";
import ClientDetailsProvider from "@/modules/institucion/clients/context/ClientDetails/ClientDetails.provider";

const containerStyles: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  maxHeight: "100vh",
  backgroundColor: "var(--darkBg)",
  overflow: "auto",
  overflowX: "hidden",
  maxWidth: "100vw",
};

const gridContainerStyles: SxProps = {
  width: "100%",
  height: "100%",
  bgcolor: "#FAFAFA",
  borderTop: "8px solid var(--darkBg)",
  borderBottom: "8px solid var(--darkBg)",
  borderLeft: "8px solid var(--darkBg)",
  borderRight: "8px solid var(--darkBg)",
  borderRadius: "32px",
  overflow: "hidden",
  maxWidth: "100vw",
};

const sidebarItemStyles: SxProps = {
  borderRadius: "8px",
  py: 1,
  px: 1,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f2f4f7",
  },
};

export default function ConfigurationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  console.log("🚀 ~ ClientDetailsLayout ~ params:", params);
  const isConfigurationAccount = pathname.includes("configuracion");

  return (
    <ClientDetailsProvider>
      <Box sx={containerStyles}>
        <Grid container sx={gridContainerStyles}>
          <Grid item xs={12} sx={{ pt: 2 }}>
            <Stack
              sx={{
                width: "100%",
                borderBottom: "1px solid #bac3d480",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                py: 0.5,
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  px: 4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Breadcrumbs items={[{ title: "Inicio", href: "/dashboard" }, { title: "Configuración" }]} />
                <Box
                  sx={{
                    backgroundColor: "var(--darkBg)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "24px",
                    cursor: "pointer",
                    mr: -1,
                    mt: 0.5,
                  }}
                  onClick={() => router.push("/institucion/clientes")}
                >
                  <GridCloseIcon sx={{ color: "#fff", fontSize: "15.5px" }} />
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={1.8} sx={{ borderRight: "1px solid #bac3d480", height: "100%", p: 2 }}>
            <Box
              sx={{ ...sidebarItemStyles, backgroundColor: isConfigurationAccount ? "#f2f4f7" : "transparent" }}
              onClick={() => router.push(`/configuracion`)}
            >
              <Typography variant="caption" fontWeight="400" color="var(--secondaryText)">
                Cuenta
              </Typography>
            </Box>
          </Grid>
          {children}
        </Grid>
      </Box>
    </ClientDetailsProvider>
  );
}
