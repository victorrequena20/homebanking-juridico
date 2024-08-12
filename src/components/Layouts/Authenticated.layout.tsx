"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Typography } from "@mui/material";
// Assets
import HomeIcon from "@/assets/icons/HomeIcon";
import SendIcon from "@/assets/icons/SendIcon";
import BankIcon from "@/assets/icons/BankIcon";
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import ReportIcon from "@/assets/icons/ReportIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import PeopleIcon from "@/assets/icons/PeopleIcon";
// Utils
import { usePathname, useRouter } from "next/navigation";

export default function AuthenticatedLayout({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const routeValidations = {
    dashboard: pathname === "/dashboard",
    institutionClients: pathname === "/institucion/clientes",
    accounting: pathname === "/contabilidad",
    reports: pathname === "/reportes",
    administrationUsers: pathname === "/administracion/usuarios",
    administrationOrganization: pathname === "/administracion/organizacion",
    administrationSystem: pathname === "/administracion/sistema",
    administrationProducts: pathname === "/administracion/productos",
    selfManagementUserManagement: pathname === "/autoservicio/gestion-de-usuarios",
  };
  return (
    <Grid
      container
      sx={{ backgroundColor: "hsl(0, 0%, 10%)", width: "100%", height: "100vh", maxHeight: "100vh", py: 1, pr: 1 }}
    >
      <Grid md={2} sx={{ bgcolor: "hsl(0, 0%, 10%)", px: 2, pt: 2 }}>
        <Typography variant="body1" color="#fff">
          Banco Digital de Caracas
        </Typography>
        <Stack sx={{ mt: 4 }}>
          <Stack>
            <Box
              sx={{
                borderRadius: "8px",
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                bgcolor: routeValidations.dashboard ? "hsl(0, 0%, 12%)" : "transparent",
              }}
              onClick={() => router.push("/dashboard")}
            >
              <HomeIcon size={24} />
              <Typography variant="body2" color="#fff">
                Dashboard
              </Typography>
            </Box>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <SendIcon size={24} />
              <Typography variant="body2" color="#fff">
                Navegación
              </Typography>
            </Box>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <BankIcon size={24} />
              <Typography variant="body2" color="#fff">
                Institución
              </Typography>
            </Box>
            <Stack sx={{ mt: 1, pl: 4, cursor: "pointer" }} onClick={() => router.push("/institucion/clientes")}>
              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  bgcolor: routeValidations.institutionClients ? "hsl(0, 0%, 12%)" : "transparent",
                }}
              >
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Clientes
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Grupos
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Centros
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack
            sx={{
              mt: 1.5,
              cursor: "pointer",
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "hsl(0, 0%, 12%)",
              },
            }}
            onClick={() => router.push("/contabilidad")}
          >
            <Box
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                gap: 1.5,
                bgcolor: routeValidations.accounting ? "hsl(0, 0%, 12%)" : "transparent",
              }}
            >
              <ChartSquareIcon size={24} />
              <Typography variant="body2" color="#fff">
                Contabilidad
              </Typography>
            </Box>
          </Stack>
          <Stack
            sx={{
              mt: 1.5,
            }}
            onClick={() => router.push("/reportes")}
          >
            <Box
              sx={{
                borderRadius: "8px",
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                bgcolor: routeValidations.reports ? "hsl(0, 0%, 12%)" : "transparent",
                "&:hover": {
                  bgcolor: "hsl(0, 0%, 12%)",
                },
              }}
            >
              <ReportIcon size={24} />
              <Typography variant="body2" color="#fff">
                Reportes
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <PersonHexagonalIcon size={24} />
              <Typography variant="body2" color="#fff">
                Administración
              </Typography>
            </Box>
            <Stack sx={{ mt: 1, pl: 4, cursor: "pointer" }}>
              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  bgcolor: routeValidations.administrationUsers ? "hsl(0, 0%, 12%)" : "transparent",
                }}
                onClick={() => router.push("/administracion/usuarios")}
              >
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Usuarios
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  bgcolor: routeValidations.administrationOrganization ? "hsl(0, 0%, 12%)" : "transparent",
                }}
                onClick={() => router.push("/administracion/organizacion")}
              >
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Organización
                </Typography>
              </Box>

              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  bgcolor: routeValidations.administrationSystem ? "hsl(0, 0%, 12%)" : "transparent",
                }}
                onClick={() => router.push("/administracion/sistema")}
              >
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Sistema
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  bgcolor: routeValidations.administrationProducts ? "hsl(0, 0%, 12%)" : "transparent",
                }}
                onClick={() => router.push("/administracion/productos")}
              >
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Productos
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Plantillas
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <PeopleIcon size={24} />
              <Typography variant="body2" color="#fff">
                Autoservicio
              </Typography>
            </Box>
            <Stack sx={{ mt: 1, pl: 4, cursor: "pointer" }}>
              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  bgcolor: routeValidations.selfManagementUserManagement ? "hsl(0, 0%, 12%)" : "transparent",
                }}
                onClick={() => router.push("/autoservicio/gestion-de-usuarios")}
              >
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Gestión de usuarios
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      {children}
    </Grid>
  );
}
