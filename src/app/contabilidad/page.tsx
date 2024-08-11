import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import IntermediateMenuItem from "@/components/IntermediateMenuItem/IntermediateMenuItem";
// Assets
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import HierarchyIcon from "@/assets/icons/HierarchyIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import ArchiveIcon from "@/assets/icons/ArchiveIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import BillIcon from "@/assets/icons/BillIcon";
import LinkIcon from "@/assets/icons/LinkIcon";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import ToggleOnIcon from "@/assets/icons/ToggleIcon";
import CashIcon from "@/assets/icons/CashIcon";
import Wrapper from "@/components/Wrapper";

export default function AccountingPage() {
  return (
    <Grid
      md={10}
      sx={{
        bgcolor: "#FAFAFA",
        borderRadius: 8,
        pt: 6,
        maxHeight: "100%",
        overflow: "auto",
        pb: 4,
      }}
    >
      <Wrapper>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="h4">Contabilidad</Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link underline="hover" color="inherit" href="/auth/login">
                <Typography variant="body2">BDC</Typography>
              </Link>
              <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
                <Typography variant="body2">Contabilidad</Typography>
              </Link>
            </Breadcrumbs>
          </Stack>
          {/* <Stack sx={{ alignItems: "flex-end" }}>
          <Button size="small" variant="primary" text="Crear cliente" />
        </Stack> */}
        </Stack>
        <Stack
          sx={{
            border: "1px solid transparent",
            mt: 5,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            mx: "auto",
            gap: 3,
          }}
        >
          <IntermediateMenuItem
            title="Publicaciones frecuentes"
            subtitle="Estas son publicaciones predefinidas."
            path=""
            icon={<ChartSquareIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Catálogo de cuentas"
            subtitle="Lista de cuentas utilizadas por una organización."
            path=""
            icon={<HierarchyIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Crear entradas de diario."
            subtitle="Transacciones de asiento de diario manuales registradas en un diario."
            path=""
            icon={<PlusIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Entradas de cierre"
            subtitle="Asientos de diario realizados al final del período contable."
            path=""
            icon={<ArchiveIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Buscar entradas de diario"
            subtitle="Opción de búsqueda avanzada para entradas de diario."
            path=""
            icon={<SearchIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Reglas de contabilidad"
            subtitle="Lista de todas las reglas contables."
            path=""
            icon={<BillIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Cuentas vinculadas a actividades financieras"
            subtitle="Lista de actividades financieras y asignaciones de cuentas del libro mayor."
            path=""
            icon={<LinkIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Devengos"
            subtitle="Devenga ingresos, gastos y pasivos a la fecha proporcionada."
            path=""
            icon={<CalendarIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Migrar saldos iniciales (en la oficina)"
            subtitle="Establecer o actualizar saldos de apertura a nivel de oficina para cuentas del libro mayor."
            path=""
            icon={<CashIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Entradas de aprovisionamiento"
            subtitle="Crear entradas de aprovisionamiento."
            path=""
            icon={<ToggleOnIcon size={28} color="#153075" />}
          />
        </Stack>
      </Wrapper>
    </Grid>
  );
}
