"use client";
import React from "react";
import { Box, SxProps, Grid, Typography, Stack, Button } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useParams, usePathname, useRouter } from "next/navigation";
import ClientDetailsProvider from "@/modules/institucion/clients/context/ClientDetails/ClientDetails.provider";

interface Route {
  label: string;
  path: string;
}

const containerStyles: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  maxHeight: "100vh",
  // backgroundColor: "var(--darkBg)",
  overflow: "auto",
  overflowX: "hidden",
  maxWidth: "100vw",
};

const gridContainerStyles: SxProps = {
  width: "100%",
  height: "100%",
  bgcolor: "#FAFAFA",
  // borderTop: "8px solid var(--darkBg)",
  // borderBottom: "8px solid var(--darkBg)",
  // borderLeft: "8px solid var(--darkBg)",
  // borderRight: "8px solid var(--darkBg)",
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

const routes: Route[] = [{ label: "General", path: "general" }];

const routes2: Route[] = [
  { label: "General", path: "/" },
  { label: "Transacciones", path: "/transacciones" },
  { label: "Comisiones", path: "/comisiones" },
  { label: "Documentos", path: "/documentos" },
  { label: "Notas", path: "/notas" },
  { label: "Instrucciones permanentes", path: "/instrucciones-permanentes" },
];

export default function ClientDetailsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [currentRoutes, setCurrentRoutes] = React.useState<Route[]>([]);
  const [isTypeOfAccountPath, setIsTypeOfAccountPath] = React.useState(false);

  React.useEffect(() => {
    setIsTypeOfAccountPath(pathname.includes("/cuentas"));
    const route = pathname.includes("/cuentas") ? routes2 : routes;
    setCurrentRoutes(route);
  }, [pathname]);

  const activePath = currentRoutes
    .slice()
    .sort((a, b) => b.path.length - a.path.length)
    .find(item => pathname.includes(item.path));

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
                <Breadcrumbs items={[{ title: "Inicio", href: "/dashboard" }, { title: "Institución" }, { title: "Clientes" }]} />
                <Box
                  sx={{
                    // backgroundColor: "var(--darkBg)",
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

          <Grid
            xs={1.8}
            sx={{
              borderRight: "1px solid #bac3d480",
              height: "100%",
              px: 2,
              pt: 2,
              pb: 6,
              display: { xs: "none", md: "block" },
              overflowY: "auto",
              maxHeight: "calc(100vh - 64px)",
            }}
          >
            {currentRoutes.map(item => (
              <Box
                key={item.path}
                sx={{
                  ...sidebarItemStyles,
                  backgroundColor: activePath?.path === item.path ? "#f2f4f7" : "transparent",
                  mt: 0.5,
                }}
                onClick={() =>
                  router.push(`/institucion/clientes/${params?.clientId}${isTypeOfAccountPath ? `/cuentas/${params?.accountId}` : ""}/${item.path}`)
                }
              >
                <Typography variant="caption" fontWeight="400" color="var(--secondaryText)">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid
            xs={12}
            sx={{
              display: { xs: "block", md: "none" },
              px: 2,
              py: 1.5,
              overflowX: "auto",
            }}
          >
            <Stack direction="row" spacing={2} sx={{ width: "max-content" }}>
              {currentRoutes.map(item => (
                <Button
                  key={item.path}
                  sx={{
                    minWidth: "auto",
                    backgroundColor: activePath?.path === item.path ? "#f2f4f7" : "transparent",
                    borderRadius: "8px",
                    py: 1,
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#f2f4f7",
                    },
                  }}
                  onClick={() =>
                    router.push(`/institucion/clientes/${params?.clientId}${isTypeOfAccountPath ? `/cuentas/${params?.accountId}` : ""}/${item.path}`)
                  }
                >
                  <Typography variant="caption" fontWeight="400" color="var(--secondaryText)">
                    {item.label}
                  </Typography>
                </Button>
              ))}
            </Stack>
          </Grid>
          {children}
        </Grid>
      </Box>
    </ClientDetailsProvider>
  );
}
