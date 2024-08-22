"use client";
import React from "react";
import { Stack } from "@mui/material";
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
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AccountingPage() {
  return (
    <Wrapper>
      <Breadcrumbs title="Contabilidad" items={[{ title: "Inicio", href: "/dashboard" }, { title: "Contabilidad" }]} />
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
          path="/contabilidad/publicaciones-frecuentes/crear"
          icon={<ChartSquareIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Catálogo de cuentas"
          subtitle="Lista de cuentas utilizadas por la organización."
          path="/contabilidad/catalogo-de-cuentas"
          icon={<HierarchyIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Crear entradas de diario."
          subtitle="Transacciones de asiento de diario manuales registradas en un diario."
          path="/contabilidad/crear-entradas-de-diario"
          icon={<PlusIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Entradas de cierre"
          subtitle="Asientos de diario realizados al final del período contable."
          path="/contabilidad/entradas-de-cierre"
          icon={<ArchiveIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Buscar entradas de diario"
          subtitle="Opción de búsqueda avanzada para entradas de diario."
          path="/contabilidad/buscar-entradas-de-diario"
          icon={<SearchIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Reglas de contabilidad"
          subtitle="Lista de todas las reglas contables."
          path="/contabilidad/reglas-de-contabilidad"
          icon={<BillIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Cuentas vinculadas a actividades financieras"
          subtitle="Lista de actividades financieras y asignaciones de cuentas del libro mayor."
          path="/contabilidad/cuentas-vinculadas-actividades-financieras"
          icon={<LinkIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Devengos"
          subtitle="Devenga ingresos, gastos y pasivos a la fecha proporcionada."
          path="/contabilidad/devengos"
          icon={<CalendarIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Migrar saldos iniciales (en la oficina)"
          subtitle="Establecer o actualizar saldos de apertura a nivel de oficina para cuentas del libro mayor."
          path="/contabilidad/migrar-saldos-iniciales"
          icon={<CashIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Entradas de aprovisionamiento"
          subtitle="Crear entradas de aprovisionamiento."
          path="/contabilidad/entradas-de-aprovisionamiento"
          icon={<ToggleOnIcon size={28} color="#153075" />}
        />
      </Stack>
    </Wrapper>
  );
}
