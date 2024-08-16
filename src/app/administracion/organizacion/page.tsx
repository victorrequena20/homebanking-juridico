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
import WalletAddIcon from "@/assets/icons/WalletAddIcon";
import KeySquareIcon from "@/assets/icons/KeySquareIcon";
import MessagesSendIcon from "@/assets/icons/MessagesSendIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import MirroringScreenIcon from "@/assets/icons/MirroringScreenIcon";
import TaskListIcon from "@/assets/icons/TaskListIcon";
import MessagesReceivedIcon from "@/assets/icons/MessagesReceivedIcon";

export default function AdministrationOrganizationPage() {
  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Organización</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link underline="hover" color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Typography variant="body2">Administración</Typography>
            <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
              <Typography variant="body2">Organización</Typography>
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
          title="Administrar oficinas"
          subtitle="Agregar nueva oficina o modificar o desactivar oficina o modificar jerarquía."
          path="/administracion/organizacion/administrar-oficinas"
          icon={<OfficesIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Configuración de moneda"
          subtitle="Monedas disponibles en toda la organización para diferentes productos."
          path="/administracion/organizacion/configuracion-de-moneda"
          icon={<SettingsIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar festivos"
          subtitle="Definir días festivos para la oficina."
          path="/administracion/organizacion/administrar-festivos"
          icon={<CalendarEditIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar fondos"
          subtitle="Los fondos están asociados con créditos."
          path="/administracion/organizacion/administrar-fondos"
          icon={<PercentageSquareIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Administrar empleados"
          subtitle="Un empleado representa a agentes de crédito sin acceso a los sistemas."
          path="/administracion/organizacion/administrar-empleados"
          icon={<PeopleIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Reasignación de créditos másiva"
          subtitle="Manera fácil de reasignar todo el crédito de un LO a otro LO."
          path="/administracion/organizacion/reasignacion-de-creditos-masiva"
          icon={<WalletReloadIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Historial de instrucciones permanentes"
          subtitle="Ver el historial registrado de instrucciones permanentes."
          path=""
          icon={<BillIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Gestión de ventanillas y cajeros"
          subtitle="Gestionar cajeros/cajeros y asignación y liquidación de efectivo."
          path=""
          icon={<CashIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Inversores"
          subtitle="Ver los detalles de la cuenta de crédito asociados con los inversores."
          path=""
          icon={<PersonPlusIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Días laborables"
          subtitle="Defina días laborables y configure el comportamiento de los pagos vencidos en días festivos."
          path="/administracion/organizacion/dias-laborables"
          icon={<Calendar2Icon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Mapeo de fondos"
          subtitle="Pantalla de entrada masiva para asignar fuentes de fondos a créditos."
          path=""
          icon={<MoneyCheckIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Tipo de pago"
          subtitle="Administrar tipos de pago"
          path=""
          icon={<WalletAddIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Preferencias de contraseña"
          subtitle="Definir estándares para hacer cumplir el uso de contraseñas más seguras."
          path="/administracion/organizacion/preferencias-contrasena"
          icon={<KeySquareIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Campañas de SMS"
          subtitle="Definir campañas de SMS para la organización"
          path="/administracion/organizacion/campana-sms"
          icon={<MessagesSendIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Criterios de concesión de créditos"
          subtitle="Definir criterios de concesión de créditos para la organización"
          path=""
          icon={<FilterIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Consulta ad hoc"
          subtitle="Definir AdHocQuery para la organización"
          path=""
          icon={<MirroringScreenIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Verificaciones de la tabla de datos de la entidad"
          subtitle="Definir comprobaciones de la tabla de datos de la entidad para la organización"
          path=""
          icon={<TaskListIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Importación masiva"
          subtitle="Importación masiva de datos mediante plantillas de hojas de cálculo excel para clientes, oficinas, etc."
          path=""
          icon={<MessagesReceivedIcon size={28} color="#153075" />}
        />
      </Stack>
    </Wrapper>
  );
}
