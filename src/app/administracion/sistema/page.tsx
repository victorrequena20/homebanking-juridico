import React from "react";
import { Box, Stack } from "@mui/material";
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
import WalletAddIcon from "@/assets/icons/WalletAddIcon";
import KeySquareIcon from "@/assets/icons/KeySquareIcon";
import MessagesSendIcon from "@/assets/icons/MessagesSendIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function AdministrationSystemPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Sistema"
        items={[{ title: "Inicio", href: "/auth/login" }, { title: "Administración" }, { title: "Sistema" }]}
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
          title="Administrar tablas de datos"
          subtitle="Agregue nuevos campos adicionales a cualquier entidad en forma de tabla de datos."
          path="/administracion/sistema/administrar-tablas-de-datos"
          icon={<OfficesIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Pistas de auditoría"
          subtitle="Registros de auditoría de todas las actividades, como crear clientes, desembolsar créditos, etc."
          path="/administracion/sistema/pistas-de-auditorias"
          icon={<SettingsIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar códigos"
          subtitle="Los códigos se utilizan para definir valores desplegables."
          path="/administracion/sistema/codigos"
          icon={<CalendarEditIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar reportes"
          subtitle="Agregar nuevo reporte y clasificar reportes."
          path="/administracion/sistema/administrar-reportes"
          icon={<PercentageSquareIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar roles y permisos"
          subtitle="Definir o modificar roles y permisos asociados."
          path="/administracion/sistema/roles-permisos"
          icon={<PeopleIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar procesos"
          subtitle="Administre calendarización de procesos y sus flujos, modifique procesos o vea el historial."
          path="/administracion/sistema/administrar-procesos"
          icon={<WalletReloadIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Configurar tareas de realizador aprobador"
          subtitle="Definir o modificar tareas de realizador aprobador."
          path="/administracion/sistema/config-tareas-realizador-aprobador"
          icon={<BillIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Configuraciones"
          subtitle="Configuraciones globales, configuración de caché y fecha del sistema."
          path="/administracion/sistema/configuraciones"
          icon={<CashIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar ganchos"
          subtitle="Definir ganchos."
          path="/administracion/sistema/ganchos"
          icon={<PersonPlusIcon size={28} color="#153075" />}
        />
        {/* <IntermediateMenuItem
          title="Preferencias de número de cuenta"
          subtitle="Preferencias para generar números de cuenta para cuentas de clientes, créditos y ahorros."
          path=""
          icon={<Calendar2Icon size={28} color="#153075" />}
        /> */}
        <IntermediateMenuItem
          title="Mapeo de entidad a entidad"
          subtitle="Definir o modificar asignaciones de entidad a entidad"
          path="/administracion/sistema/mapeo-de-entidad-a-entidad"
          icon={<MoneyCheckIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Servicios externos"
          subtitle="Configuración de servicios externos."
          path="/administracion/sistema/servicios-externos"
          icon={<WalletAddIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar encuestas"
          subtitle="Gestiona tus servicios."
          path="/administracion/sistema/administrar-encuestas"
          icon={<KeySquareIcon size={28} color="#153075" />}
        />
        {/* <IntermediateMenuItem
          title="Configuración de dos factores"
          subtitle="Ajustes de configuración de autenticación de dos factores."
          path="/administracion/sistema/configuracion-de-dos-factores"
          icon={<MessagesSendIcon size={28} color="#153075" />}
        /> */}
        <IntermediateMenuItem
          title="Gestionar eventos externos"
          subtitle="Configuración de eventos externos, para habilitar o deshabilitar la publicación de eventos."
          path="/administracion/sistema/gestionar-eventos-externos"
          icon={<FilterIcon size={28} color="#153075" />}
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
