"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Divider, Drawer, IconButton, Stack, SxProps, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@/assets/icons/HomeIcon";
import BankIcon from "@/assets/icons/BankIcon";
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import ReportIcon from "@/assets/icons/ReportIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ExitIcon from "@/assets/icons/ExitIcon";
import Link from "next/link";
import LogoIcon from "@/assets/icons/LogoIcon";

const containerStyles: SxProps = {
  backgroundColor: "#001F3F",
  width: "100%",
  height: "100vh",
  maxHeight: "100vh",
};

const itemStyles: SxProps = {
  borderRadius: "8px",
  py: 1,
  px: 2,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f2f4f7",
  },
};

function RenderMenu() {
  const [showInstitutionLinks, setShowInstitutionLinks] = React.useState(false);
  const [showPayMenus, setShowPayMenus] = React.useState(false);
  const [showAdministrationLinks, setShowAdministrationLinks] = React.useState(false);
  const [showReportsLinks, setShowReportsLinks] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeValidations = {
    dashboard: pathname === "/dashboard",
    plantillas: pathname.includes("/plantillas"),
    institution: pathname.includes("/institucion"),
    institutionClients: pathname.includes("/institucion/clientes"),
    institutionGroups: pathname.includes("/institucion/grupos"),
    payMasivos: pathname === "/gestion-de-pagos-masivos",
    institutionCenters: pathname.includes("/institucion/centros"),
    accounting: pathname.includes("/contabilidad"),
    reports: pathname === "/reportes",
    flowSuccess: pathname === "/flujo-de-aprobacion",
    reportsAll: pathname.includes("/reportes") && searchParams.get("filter") === "todos",
    reportsClients: pathname.includes("/reportes") && searchParams.get("filter") === "clientes",
    reportsLoans: pathname.includes("/reportes") && searchParams.get("filter") === "creditos",
    reportsSavings: pathname.includes("/reportes") && searchParams.get("filter") === "ahorros",
    reportsFunds: pathname.includes("/reportes") && searchParams.get("filter") === "fondos",
    reportsAccounting: pathname.includes("/reportes") && searchParams.get("filter") === "contabilidad",
    administrationTab: pathname.includes("/administracion"),
    administrationUsers: pathname.includes("/administracion/usuarios"),
    administrationOrganization: pathname.includes("/administracion/organizacion"),
    administrationSystem: pathname.includes("/administracion/sistema"),
    administrationProducts: pathname.includes("/administracion/productos"),
    selfManagementUserManagement: pathname.includes("/autoservicio/gestion-de-usuarios"),
  };

  React.useEffect(() => {
    setShowInstitutionLinks(pathname.includes("/institucion"));
    setShowAdministrationLinks(pathname.includes("/administracion"));
    setShowReportsLinks(pathname.includes("/reportes"));
  }, [pathname]);

  React.useEffect(() => {
    const token = localStorage.getItem("litecoreAuthToken");
    if (!token && Object.values(routeValidations).some(Boolean)) {
      router.push("/auth/login");
    }
  }, [pathname, router]);

  return (
    <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
      <Stack>
        {/* <Stack sx={{ px: 1.5, flexDirection: "row", alignItems: "center" }}>
          <LogoIcon size={20} />
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              padding: "2px 6px", // Tamaño compacto
              backgroundColor: "#000", // Fondo gris claro
              borderRadius: "4px",
              fontSize: "8px", // Fuente pequeña
              textTransform: "uppercase",
              overflow: "hidden",
              marginLeft: 1,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "8px", // Tamaño pequeño
                fontWeight: 600,
                letterSpacing: 0.5,
                textShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
                display: "inline-block",
              }}
            >
              Beta
            </Typography>
          </Box>
        </Stack> */}
        <Stack sx={{ mt: 0 }}>
          {/* Dashboard */}
          <Box
            sx={{
              ...itemStyles,
              bgcolor: routeValidations.dashboard ? "hsl(0, 0%, 12%)" : "transparent",
              "& > p": {
                color: routeValidations.dashboard ? "#fff" : "#9aa3b8",
              },
            }}
            onClick={() => setShowPayMenus(!showPayMenus)}
          >
            <HomeIcon size={24} color={routeValidations.dashboard ? "#fff" : "#9aa3b8"} />
            <Typography variant="body2" fontWeight="200">
              Nominas
            </Typography>
          </Box>
          {showPayMenus && (
            <Stack sx={{ mt: 1, pl: 4, cursor: "pointer" }}>
              <Link href={"/institucion/clientes"}>
                <Box
                  sx={{
                    borderRadius: "8px",
                    py: 1,
                    px: 2,
                    bgcolor: routeValidations.institutionClients ? "hsl(0, 0%, 12%)" : "transparent",
                    "& > p": {
                      color: routeValidations.institutionClients ? "#cad0db" : "#9aa3b8",
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight="200">
                    Pagos de Nómina
                  </Typography>
                </Box>
              </Link>
              <Link href={"/gestion-de-pagos-masivos"}>
                <Box
                  sx={{
                    borderRadius: "8px",
                    py: 1,
                    px: 2,
                    bgcolor: routeValidations.payMasivos ? "hsl(0, 0%, 12%)" : "transparent",
                    "& > p": {
                      color: routeValidations.payMasivos ? "#cad0db" : "#9aa3b8",
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight="200">
                    Gestión de pagos masivos
                  </Typography>
                </Box>
              </Link>
            </Stack>
          )}
          {/* Institucion */}

          {/* Pagos a Proveedores */}
          <Link href="/contabilidad">
            <Stack sx={{ mt: 2 }}>
              <Box
                sx={{
                  ...itemStyles,
                  bgcolor: routeValidations.accounting ? "#f2f4f7" : "transparent",
                  "& > p": {
                    color: routeValidations.accounting ? "#000" : "#ccc",
                  },
                }}
              >
                <ChartSquareIcon size={24} color={routeValidations.accounting ? "#000" : "#ccc"} />
                <Typography variant="body2" fontWeight="200">
                  Pagos a Proveedores
                </Typography>
              </Box>
            </Stack>
          </Link>
          {/*  Autorizaciones y Seguridad */}
          <Stack sx={{ mt: 2 }}>
            <Link href={"/flujo-de-aprobacion?filter=todos"}>
              <Box
                sx={{
                  ...itemStyles,
                  bgcolor: routeValidations.flowSuccess ? "#f2f4f7" : "transparent",
                  "& > p": {
                    color: routeValidations.flowSuccess ? "#000" : "#ccc",
                  },
                }}
                // onClick={() => setShowReportsLinks(!showReportsLinks)}
              >
                <ReportIcon size={24} color={routeValidations.flowSuccess ? "#000" : "#ccc"} />
                <Typography variant="body2" fontWeight="200">
                  Flujo de aprobación
                </Typography>
              </Box>
            </Link>
          </Stack>
          {/* Reportes y Conciliación */}
          <Stack sx={{ mt: 2, cursor: "pointer" }}>
            <Link href={"/reportes"}>
              <Box
                sx={{
                  ...itemStyles,
                  bgcolor: routeValidations.reports ? "#f2f4f7" : "transparent",
                  "& > p": {
                    color: routeValidations.reports ? "#000" : "#ccc",
                  },
                }}
              >
                <PersonHexagonalIcon size={24} color={routeValidations.reports ? "#000" : "#ccc"} />
                <Typography variant="body2" fontWeight="200">
                  Reportes y Conciliación
                </Typography>
              </Box>
            </Link>
          </Stack>
          {/* Atención al Cliente y Soporte */}
          <Stack sx={{ mt: 2, cursor: "pointer" }}>
            <Box
              sx={{
                ...itemStyles,
                "& > p": {
                  color: routeValidations.administrationTab ? "#000" : "#ccc",
                },
              }}
            >
              <PersonHexagonalIcon size={24} color={routeValidations.administrationTab ? "#000" : "#ccc"} />
              <Typography variant="body2" fontWeight="200" color={routeValidations.administrationTab ? "#000" : "#ccc"}>
                Atención al Cliente y Soporte
              </Typography>
            </Box>
            {showAdministrationLinks && (
              <Stack sx={{ mt: 1, pl: 4, cursor: "pointer" }}>
                <Link href={"/administracion/usuarios"}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.administrationUsers ? "hsl(0, 0%, 12%)" : "transparent",
                      "& > p": {
                        color: routeValidations.administrationUsers ? "#cad0db" : "#9aa3b8",
                      },
                    }}
                    onClick={() => router.push("/administracion/usuarios")}
                  >
                    <Typography variant="body2" fontWeight="200">
                      Usuarios
                    </Typography>
                  </Box>
                </Link>
                <Link href={"/administracion/organizacion"}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.administrationOrganization ? "hsl(0, 0%, 12%)" : "transparent",
                      "& > p": {
                        color: routeValidations.administrationOrganization ? "#cad0db" : "#9aa3b8",
                      },
                    }}
                    onClick={() => router.push("/administracion/organizacion")}
                  >
                    <Typography variant="body2" fontWeight="200">
                      Organización
                    </Typography>
                  </Box>
                </Link>
                <Link href={"/administracion/sistema"}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.administrationSystem ? "hsl(0, 0%, 12%)" : "transparent",
                      "& > p": {
                        color: routeValidations.administrationSystem ? "#cad0db" : "#9aa3b8",
                      },
                    }}
                    onClick={() => router.push("/administracion/sistema")}
                  >
                    <Typography variant="body2" fontWeight="200">
                      Sistema
                    </Typography>
                  </Box>
                </Link>
                <Link href={"/administracion/productos"}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      px: 2,
                      bgcolor: routeValidations.administrationProducts ? "hsl(0, 0%, 12%)" : "transparent",
                      "& > p": {
                        color: routeValidations.administrationProducts ? "#cad0db" : "#9aa3b8",
                      },
                    }}
                    onClick={() => router.push("/administracion/productos")}
                  >
                    <Typography variant="body2" fontWeight="200">
                      Productos
                    </Typography>
                  </Box>
                </Link>
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
              onClick={() => router.push("/configuracion")}
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
                Juridico
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
            onClick={() => {
              localStorage.removeItem("litecoreAuthToken");
              router.push("/auth/login");
            }}
          >
            <ExitIcon />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const isTablet = useMediaQuery("(max-width: 1030px)");
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  //
  // useLayoutEffect(() => {
  //   setIsReady(true);
  // }, []);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  // if (!isReady) return null;

  return (
    <section>
      <Grid container sx={containerStyles}>
        <>
          <Grid sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: { xs: "70vw", md: "30vw" },
                // bgcolor: "var(--darkBg)",
              },
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff", position: "absolute", right: "0" }}>
              <MenuIcon />
            </IconButton>
            <RenderMenu />
          </Drawer>
        </>
        <Grid
          md={1.8}
          sx={{
            // bgcolor: "var(--darkBg)",
            px: 2,
            pt: 3,
            pb: 4,
            height: "100%",
            display: { xs: "none", md: "block" },
          }}
        >
          <RenderMenu />
        </Grid>
        {children}
      </Grid>
    </section>
  );
}
