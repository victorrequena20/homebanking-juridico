"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Typography } from "@mui/material";
// Assets
import HomeIcon from "@/assets/icons/HomeIcon";
import BankIcon from "@/assets/icons/BankIcon";
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import ReportIcon from "@/assets/icons/ReportIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
// Utils
import { usePathname, useRouter } from "next/navigation";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [showInstitutionLinks, setShowInstitutionLinks] = React.useState<boolean>(false);
  const [showAdministrationLinks, setShowAdministrationLinks] = React.useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const routeValidations = {
    dashboard: pathname === "/dashboard",
    institutionClients: pathname.includes("/institucion/clientes"),
    institutionGroups: pathname.includes("/institucion/grupos"),
    institutionCenters: pathname.includes("/institucion/centros"),
    accounting: pathname.includes("/contabilidad"),
    reports: pathname === "/reportes",
    administrationTab: pathname.includes("/administracion"),
    administrationUsers: pathname.includes("/administracion/usuarios"),
    administrationOrganization: pathname.includes("/administracion/organizacion"),
    administrationSystem: pathname === "/administracion/sistema",
    administrationProducts: pathname === "/administracion/productos",
    selfManagementUserManagement: pathname.includes("/autoservicio/gestion-de-usuarios"),
  };

  React.useEffect(() => {
    setShowInstitutionLinks(pathname.includes("/institucion"));
    setShowAdministrationLinks(pathname.includes("/administracion"));
  }, [pathname]);

  return (
    <section>
      <Grid
        container
        sx={{ backgroundColor: "hsl(0, 0%, 10%)", width: "100%", height: "100vh", maxHeight: "100vh", py: 1, pr: 1 }}
      >
        <Grid md={2} sx={{ bgcolor: "hsl(0, 0%, 10%)", px: 2, pt: 2 }}>
          <Typography variant="body1" fontWeight="300" color="#fff" sx={{ ml: 2 }}>
            Banco Digital de Caracas
          </Typography>
          <Stack sx={{ mt: 5 }}>
            {/* Dashboard */}
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
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Dashboard
                </Typography>
              </Box>
            </Stack>
            {/* Institucion */}
            <Stack sx={{ mt: 2 }}>
              <Box
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                }}
                onClick={() => setShowInstitutionLinks(!showInstitutionLinks)}
              >
                <BankIcon size={24} />
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Institución
                </Typography>
              </Box>
              {showInstitutionLinks && (
                <Stack sx={{ mt: 1, pl: 4, cursor: "pointer" }}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.institutionClients ? "hsl(0, 0%, 12%)" : "transparent",
                    }}
                    onClick={() => router.push("/institucion/clientes")}
                  >
                    <Typography variant="body2" fontWeight="200" color="#fff">
                      Clientes
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.institutionGroups ? "hsl(0, 0%, 12%)" : "transparent",
                    }}
                    onClick={() => router.push("/institucion/grupos")}
                  >
                    <Typography variant="body2" fontWeight="200" color="#fff">
                      Grupos
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.institutionCenters ? "hsl(0, 0%, 12%)" : "transparent",
                    }}
                    onClick={() => router.push("/institucion/centros")}
                  >
                    <Typography variant="body2" fontWeight="200" color="#fff">
                      Centros
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Stack>
            {/* Contabilidad */}
            <Stack
              sx={{
                mt: 2,
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
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Contabilidad
                </Typography>
              </Box>
            </Stack>
            {/* Reportes */}
            <Stack
              sx={{
                mt: 2,
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
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Reportes
                </Typography>
              </Box>
            </Stack>
            {/* administracion */}
            <Stack sx={{ mt: 2, cursor: "pointer" }}>
              <Box
                sx={{ borderRadius: "8px", py: 1, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}
                onClick={() => setShowAdministrationLinks(!showAdministrationLinks)}
              >
                <PersonHexagonalIcon size={24} />
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Administración
                </Typography>
              </Box>
              {showAdministrationLinks && (
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
              )}
            </Stack>
            {/* Autoservicio */}
            {/* <Stack sx={{ mt: 2 }}>
            <Box
              sx={{
                borderRadius: "8px",
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
              }}
              onClick={() => setShowSelfServiceLinks(!showSelfServiceLinks)}
            >
              <PeopleIcon size={24} />
              <Typography variant="body2" color="#fff">
                Autoservicio
              </Typography>
            </Box>
            {showSelfServiceLinks && (
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
            )}
          </Stack> */}
          </Stack>
        </Grid>
        {children}
      </Grid>
    </section>
  );
}
