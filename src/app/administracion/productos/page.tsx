import React from "react";
import { Stack, Typography } from "@mui/material";
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
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrationProductsPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Productos"
        items={[{ title: "Inicio", href: "/auth/login" }, { title: "Administración" }, { title: "Productos" }]}
      />
      <Stack
        sx={{
          border: "1px solid transparent",
          mt: 5,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
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
          path="/administracion/productos/mezcla-de-productos"
          icon={<SettingsIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de ahorro"
          subtitle="Agregar nuevo producto de ahorro o modificar o desactivar producto de ahorro."
          path="/administracion/productos/productos-de-ahorro"
          icon={<CalendarEditIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de depósito fijo"
          subtitle="Agregar, modificar o desactivar un producto de depósito fijo."
          path="/administracion/productos/productos-de-deposito-fijo"
          icon={<PercentageSquareIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de acciones"
          subtitle="Agregar nuevo producto de acciones o modificar o desactivar el producto de acciones"
          path="/administracion/productos/productos-de-acciones"
          icon={<PeopleIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Productos de depósito recurrentes"
          subtitle="Agregar, modificar o desactivar un producto de depósito Recurrente"
          path="/administracion/productos/productos-de-deposito-recurrentes"
          icon={<WalletReloadIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Comisiones"
          subtitle="Definir cargos/penalizaciones para productos de crédito, ahorro y depósito."
          path="/administracion/productos/comisiones"
          icon={<BillIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar configuraciones de impuestos"
          subtitle="Definir componentes de impuestos y grupos de impuestos."
          path="/administracion/productos/administrar-configuraciones-de-impuestos"
          icon={<CashIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administración de garantias"
          subtitle="Definir garantías para la gestión de garantías."
          path="/administracion/productos/administracion-de-garantias"
          icon={<PersonPlusIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Tasas variables"
          subtitle="Definir tasas flotantes para productos crediticios."
          path="/administracion/productos/tasas-variables"
          icon={<Calendar2Icon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Grupos de morosidad"
          subtitle="Definir rangos de días de morosidad y conjuntos de categorías para productos de crédito."
          path="/administracion/productos/grupos-de-morosidad"
          icon={<MoneyCheckIcon size={28} color="#153075" />}
        />
        <Stack
          sx={{
            display: "flex",
            flex: 1,
            width: "100%",
            minWidth: "340px",
            maxWidth: "340px",
            height: "80px",
            maxHeight: "80px",
            opacity: 0,
            px: 2,
            py: 3,
          }}
        ></Stack>
      </Stack>
    </Wrapper>
  );
}
