import React from "react";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import IntermediateMenuItem from "@/components/IntermediateMenuItem/IntermediateMenuItem";
// Assets
import BillIcon from "@/assets/icons/BillIcon";
import CashIcon from "@/assets/icons/CashIcon";
import Wrapper from "@/components/Wrapper";
import OfficesIcon from "@/assets/icons/OfficesIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import CalendarEditIcon from "@/assets/icons/CalendarEditIcon";
import PercentageSquareIcon from "@/assets/icons/PercentageSquareIcon";
import PeopleIcon from "@/assets/icons/PeopleIcon";
import WalletReloadIcon from "@/assets/icons/WalletReloadIcon";
import PersonPlusIcon from "@/assets/icons/PersonPlusIcon";
import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import MoneyCheckIcon from "@/assets/icons/MoneyCheckIcon";

export default function AdministrationProductsPage() {
  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Productos</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link underline="hover" color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
              <Typography variant="body2">Productos</Typography>
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
          title="Productos de crédito"
          subtitle="Agregar un nuevo producto de crédito o modificar o desactivar un producto de crédito."
          path="/administracion/productos/productos-de-credito"
          icon={<OfficesIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Mezcla de productos"
          subtitle="Define reglas para tomar múltiples reglas."
          path=""
          icon={<SettingsIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de ahorro"
          subtitle="Agregar nuevo producto de ahorro o modificar o desactivar producto de ahorro."
          path=""
          icon={<CalendarEditIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de depósito fijo"
          subtitle="Agregar, modificar o desactivar un producto de depósito fijo."
          path=""
          icon={<PercentageSquareIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de acciones"
          subtitle="Agregar nuevo producto de acciones o modificar o desactivar el producto de acciones"
          path=""
          icon={<PeopleIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de depósito recurrentes"
          subtitle="Agregar, modificar o desactivar un producto de depósito Recurrente"
          path=""
          icon={<WalletReloadIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Comisiones"
          subtitle="Definir cargos/penalizaciones para productos de crédito, ahorro y depósito."
          path=""
          icon={<BillIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar configuraciones de impuestos"
          subtitle="Definir componentes de impuestos y grupos de impuestos."
          path=""
          icon={<CashIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administración de garantias"
          subtitle="Definir garantías para la gestión de garantías."
          path=""
          icon={<PersonPlusIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Tasas variables"
          subtitle="Definir tasas flotantes para productos crediticios."
          path=""
          icon={<Calendar2Icon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Grupos de morosidad"
          subtitle="Definir rangos de días de morosidad y conjuntos de categorías para productos de crédito."
          path=""
          icon={<MoneyCheckIcon size={28} color="#153075" />}
        />
      </Stack>
    </Wrapper>
  );
}
