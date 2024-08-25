"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Divider, Stack, Typography } from "@mui/material";
// Assets
import HomeIcon from "@/assets/icons/HomeIcon";
import BankIcon from "@/assets/icons/BankIcon";
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import ReportIcon from "@/assets/icons/ReportIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
// Utils
import { usePathname, useRouter } from "next/navigation";
import ExitIcon from "@/assets/icons/ExitIcon";

const gradients = [
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
  "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
  "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)",
  "linear-gradient(rgb(68, 101, 219) 0%, rgb(122, 218, 231) 100%)",
];
const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [showInstitutionLinks, setShowInstitutionLinks] = React.useState<boolean>(false);
  const [showAdministrationLinks, setShowAdministrationLinks] = React.useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const routeValidations = {
    dashboard: pathname === "/dashboard",
    plantillas: pathname.includes("/plantillas"),
    institution: pathname.includes("/institucion"),
    institutionClients: pathname.includes("/institucion/clientes"),
    institutionGroups: pathname.includes("/institucion/grupos"),
    institutionCenters: pathname.includes("/institucion/centros"),
    accounting: pathname.includes("/contabilidad"),
    reports: pathname === "/reportes",
    administrationTab: pathname.includes("/administracion"),
    administrationUsers: pathname.includes("/administracion/usuarios"),
    administrationOrganization: pathname.includes("/administracion/organizacion"),
    administrationSystem: pathname === "/administracion/sistema",
    administrationProducts: pathname.includes("/administracion/productos"),
    selfManagementUserManagement: pathname.includes("/autoservicio/gestion-de-usuarios"),
  };

  React.useEffect(() => {
    setShowInstitutionLinks(pathname.includes("/institucion"));
    setShowAdministrationLinks(pathname.includes("/administracion"));
  }, [pathname]);

  React.useEffect(() => {
    const token = localStorage.getItem("litecoreAuthToken");
    if (!token && Object.values(routeValidations).some(Boolean)) {
      router.push("/auth/login");
    }
  }, [pathname, router]);
  return (
    <section>
      <Grid
        container
        sx={{
          backgroundColor: "hsl(0, 0%, 10%)",
          width: "100%",
          height: "100vh",
          maxHeight: "100vh",
          py: 1,
          pr: 1,
        }}
      >
        <Grid
          md={2}
          sx={{
            bgcolor: "hsl(0, 0%, 10%)",
            px: 2,
            pt: 2,
            pb: 4,
          }}
        >
          <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
            <Stack>
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
                      "&:hover": {
                        bgcolor: "hsl(0, 0%, 12%)",
                      },
                      "& > p": {
                        color: routeValidations.dashboard ? "#fff" : "#9aa3b8",
                      },
                    }}
                    onClick={() => router.push("/dashboard")}
                  >
                    <HomeIcon size={24} color={routeValidations.dashboard ? "#fff" : "#9aa3b8"} />
                    <Typography variant="body2" fontWeight="200">
                      Inicio
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
                      "& > p": {
                        color: routeValidations.institution ? "#fff" : "#9aa3b8",
                      },
                      "&:hover": {
                        bgcolor: "hsl(0, 0%, 12%)",
                      },
                    }}
                    onClick={() => setShowInstitutionLinks(!showInstitutionLinks)}
                  >
                    <BankIcon size={24} color={routeValidations.institution ? "#fff" : "#9aa3b8"} />
                    <Typography variant="body2" fontWeight="200">
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
                          "& > p": {
                            color: routeValidations.institutionClients ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/institucion/clientes")}
                      >
                        <Typography variant="body2" fontWeight="200">
                          Clientes
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          px: 2,
                          bgcolor: routeValidations.institutionGroups ? "hsl(0, 0%, 12%)" : "transparent",
                          "& > p": {
                            color: routeValidations.institutionGroups ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/institucion/grupos")}
                      >
                        <Typography variant="body2" fontWeight="200">
                          Grupos
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          px: 2,
                          bgcolor: routeValidations.institutionCenters ? "hsl(0, 0%, 12%)" : "transparent",
                          "& > p": {
                            color: routeValidations.institutionCenters ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/institucion/centros")}
                      >
                        <Typography variant="body2" fontWeight="200">
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
                      "& > p": {
                        color: routeValidations.accounting ? "#fff" : "#9aa3b8",
                      },
                    }}
                  >
                    <ChartSquareIcon size={24} color={routeValidations.accounting ? "#fff" : "#9aa3b8"} />
                    <Typography variant="body2" fontWeight="200">
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
                      "& > p": {
                        color: routeValidations.reports ? "#fff" : "#9aa3b8",
                      },
                    }}
                  >
                    <ReportIcon size={24} color={routeValidations.reports ? "#fff" : "#9aa3b8"} />
                    <Typography variant="body2" fontWeight="200">
                      Reportes
                    </Typography>
                  </Box>
                </Stack>
                {/* administracion */}
                <Stack sx={{ mt: 2, cursor: "pointer" }}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      "&:hover": {
                        bgcolor: "hsl(0, 0%, 12%)",
                      },
                      "& > p": {
                        color: routeValidations.administrationTab ? "#fff" : "#9aa3b8",
                      },
                    }}
                    onClick={() => setShowAdministrationLinks(!showAdministrationLinks)}
                  >
                    <PersonHexagonalIcon size={24} color={routeValidations.administrationTab ? "#fff" : "#9aa3b8"} />
                    <Typography variant="body2" fontWeight="200">
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
                          "& > p": {
                            color: routeValidations.administrationUsers ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/administracion/usuarios")}
                      >
                        <Typography variant="body2" fontWeight="200">
                          Usuarios
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          px: 2,
                          bgcolor: routeValidations.administrationOrganization ? "hsl(0, 0%, 12%)" : "transparent",
                          "& > p": {
                            color: routeValidations.administrationOrganization ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/administracion/organizacion")}
                      >
                        <Typography variant="body2" fontWeight="200">
                          Organización
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          px: 2,
                          bgcolor: routeValidations.administrationSystem ? "hsl(0, 0%, 12%)" : "transparent",
                          "& > p": {
                            color: routeValidations.administrationSystem ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/administracion/sistema")}
                      >
                        <Typography variant="body2" fontWeight="200">
                          Sistema
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          px: 2,
                          bgcolor: routeValidations.administrationProducts ? "hsl(0, 0%, 12%)" : "transparent",
                          "& > p": {
                            color: routeValidations.administrationProducts ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/administracion/productos")}
                      >
                        <Typography variant="body2" fontWeight="200">
                          Productos
                        </Typography>
                      </Box>
                      {/* <Box
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          px: 2,
                          bgcolor: routeValidations.plantillas ? "hsl(0, 0%, 12%)" : "transparent",
                          "& > p": {
                            color: routeValidations.plantillas ? "#fff" : "#9aa3b8",
                          },
                        }}
                        onClick={() => router.push("/administracion/plantillas")}
                      >
                        <Typography variant="body2" fontWeight="200" color="#fff">
                          Plantillas
                        </Typography>
                      </Box> */}
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>

            <Stack>
              <Stack>
                <Stack>
                  <Box
                    sx={{
                      py: 1,
                      px: 1,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "hsl(0, 0%, 12%)",
                      },
                    }}
                    onClick={() => router.push("/dashboard")}
                  >
                    <Typography variant="body2" fontSize={"13px"} fontWeight="400" color="#9aa3b8">
                      Configuración
                    </Typography>
                  </Box>
                </Stack>
                <Divider sx={{ width: "94%", mx: "auto", bgcolor: "hsl(0, 0%, 16%)", mt: 1 }} />
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                  width: "94%",
                  mx: "auto",
                  "& svg": {
                    display: "none",
                  },
                  "&:hover": {
                    "& svg": {
                      display: "block",
                    },
                  },
                }}
              >
                <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "40px",
                      backgroundImage: "linear-gradient(rgb(68, 101, 219) 0%, rgb(122, 218, 231) 100%)",
                    }}
                  />
                  <Stack sx={{ justifyContent: "center" }}>
                    <Typography fontSize="14px" color="#CAD0Db" fontWeight="300">
                      Litecore
                    </Typography>
                    <Typography fontSize="12px" color="#9AA3B8" fontWeight="300">
                      Administrador
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    cursor: "pointer",
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#ffffff10",
                    },
                  }}
                  onClick={() => router.push("/auth/login")}
                >
                  <ExitIcon />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        {children}
      </Grid>
    </section>
  );
}
