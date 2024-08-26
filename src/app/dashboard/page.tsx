"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Typography } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import BellLineIcon from "@/assets/icons/BellLineIcon";
import Link from "next/link";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import QuickNavItem from "@/modules/dashboard/components/QuickNavItem/QuickNavItem";
import CardInfoList from "@/modules/dashboard/components/CardInfoList/CardInfoList";
import { getClients } from "@/services/Clients.service";

interface ClientData {
  timeline: {
    submittedOnDate: [number, number, number];
  };
}

interface RawDataPoint {
  count: number;
  days: [number, number, number];
}

interface DataPoint {
  date: Date;
  value: number;
}

function convertToRawData(clients: ClientData[], days: number): RawDataPoint[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normaliza la fecha actual al inicio del día
  const startDate = new Date(now.getTime() - (days - 1) * 24 * 60 * 60 * 1000);

  const countMap: { [key: string]: number } = {};

  // Inicializa el countMap con todos los días del período
  for (let d = 0; d < days; d++) {
    const currentDate = new Date(startDate.getTime() + d * 24 * 60 * 60 * 1000);
    const dateString = currentDate.toISOString().split("T")[0];
    countMap[dateString] = 0;
  }

  clients.forEach(client => {
    const [year, month, day] = client.timeline.submittedOnDate;
    const date = new Date(year, month - 1, day);

    if (date >= startDate && date <= now) {
      const dateString = date.toISOString().split("T")[0];
      if (dateString in countMap) {
        countMap[dateString]++;
      }
    }
  });

  return Object.entries(countMap)
    .map(([dateString, count]) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return { count, days: [year, month, day] as [number, number, number] };
    })
    .sort((a, b) => {
      const dateA = new Date(a.days[0], a.days[1] - 1, a.days[2]);
      const dateB = new Date(b.days[0], b.days[1] - 1, b.days[2]);
      return dateA.getTime() - dateB.getTime();
    });
}

function getLastWeekData(clients: ClientData[]): RawDataPoint[] {
  return convertToRawData(clients, 7);
}

function getLastMonthData(clients: ClientData[]): RawDataPoint[] {
  return convertToRawData(clients, 30);
}

export default function DashboardPage() {
  const [clients, setClients] = React.useState<any>([]);
  const [chartData, setChartData] = React.useState<DataPoint[]>([]);

  async function handleGetClients() {
    const response = await getClients({ limit: -1, paginated: false });
    if (response?.status === 200) {
      setClients(response?.data?.pageItems);
    }
  }

  React.useEffect(() => {
    const lastWeekData = getLastWeekData(clients);
    const processedData: DataPoint[] = lastWeekData.map(item => ({
      date: new Date(item.days[0], item.days[1] - 1, item.days[2]), // Restamos 1 al mes porque en JS los meses van de 0 a 11
      value: item.count,
    }));
    setChartData(processedData);
  }, [clients]);

  React.useEffect(() => {
    handleGetClients();
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
          <CardInfoList clients={clients} />
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
