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
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ReportIcon from "@/assets/icons/ReportIcon";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import OfficesIcon from "@/assets/icons/OfficesIcon";
import QuickNavItem from "@/modules/dashboard/components/QuickNavItem/QuickNavItem";

interface RawDataPoint {
  count: number;
  days: [number, number, number];
}

interface ProcessedDataPoint {
  date: Date;
  value: number;
}

interface OutputData {
  date: Date;
  value: number;
}

function convertDateArray(input: ProcessedDataPoint[]): OutputData[] {
  return input.map(item => ({
    date: new Date(item.date),
    value: item.value,
  }));
}

export default function DashboardPage() {
  const [chartData, setChartData] = React.useState<ProcessedDataPoint[]>([]);

  React.useEffect(() => {
    // Tus datos originales
    const rawData: RawDataPoint[] = [
      { count: 1, days: [2024, 8, 18] },
      { count: 2, days: [2024, 8, 19] },
      { count: 1, days: [2024, 8, 20] },
      { count: 3, days: [2024, 8, 22] },
      { count: 1, days: [2024, 8, 21] },
      { count: 2, days: [2024, 8, 23] },
    ];

    // Procesar los datos
    const processedData: ProcessedDataPoint[] = rawData.map(item => ({
      date: new Date(item.days[0], item.days[1] - 1, item.days[2]), // Restamos 1 al mes porque en JS los meses van de 0 a 11
      value: item.count,
    }));

    // Filtrar para mostrar solo la última semana
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const filteredData = processedData
      .filter(item => item.date >= oneWeekAgo)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    console.log("🚀 ~ React.useEffect ~ filteredData:", filteredData);
    setChartData(convertDateArray(filteredData));
  }, []);
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

      <Stack sx={{ flexDirection: "row", gap: 6 }}>
        <Stack sx={{ flex: 2 }}>
          <Box sx={{ mt: 4, width: "auto", display: "flex", maxWidth: "1050px" }}>
            <Stack sx={{ width: "100%", flexDirection: "column", columnGap: 3 }}>
              <Stack sx={{ width: "100%", flexDirection: "row", gap: 3 }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    p: 2,
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
                        bgcolor: "#07195210",
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
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    p: 2,
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
                        bgcolor: "#07195210",
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
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    p: 2,
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
                        bgcolor: "#07195210",
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
            </Stack>
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              width: "100%",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                maxWidth: "100%",
                height: "100%",
                flex: 1,
                mt: 7,
              }}
            >
              <Typography variant="body1" sx={{ ml: 1 }} fontWeight="300" color="var(--secondaryText)">
                Actividad de clientes la última semana
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  width: "100%",
                  px: 0,
                  borderRadius: "8px",
                  mt: 2,
                }}
              >
                {chartData.length > 0 && <LineChart data={chartData} />}
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ pr: 4 }}>
          <Stack
            sx={{
              flex: 1,
              width: "100%",
              maxWidth: "360px",
              height: "100%",
              alignItems: "center",
              mt: 4,
              bgcolor: "#ffffff",
              px: 2,
              py: 4,
              pt: 2,
              borderRadius: "8px",
            }}
          >
            <Stack sx={{ gap: 2 }}>
              <Typography variant="body2" color="var(--secondaryText)">
                Navegación rapida
              </Typography>
              <QuickNavItem path="/institucion/clientes" title="Clientes" subtitle="Visualizar clientes del sistema." />
              <QuickNavItem path="/reportes" title="Reportes" subtitle="Visualizar reportes del sistema." />
              <QuickNavItem
                path="/administracion/usuarios"
                title="Usuarios"
                subtitle="Visualizar usuarios del sistema."
              />
              <QuickNavItem
                path="/administracion/sistema/administrar-oficinas"
                title="Oficinas"
                subtitle="Visualizar oficinas del sistema."
              />
            </Stack>
          </Stack>
          <Stack>
            <Stack
              sx={{
                flex: 1,
                width: "100%",
                maxWidth: "360px",
                height: "100%",
                alignItems: "center",
                mt: 4,
                bgcolor: "#ffffff",
                px: 2,
                py: 4,
                pt: 2,
                pb: 0,
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{ alignSelf: "flex-start" }}
                fontWeight="400"
                variant="body2"
                color="var(--secondaryText)"
              >
                Monto Pendiente / Desembolsado
              </Typography>
              <PieChart />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
