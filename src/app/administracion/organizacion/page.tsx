import React from "react";
import { Stack } from "@mui/material";
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
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdministrationOrganizationPage() {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Organización"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización" },
        ]}
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
          pb: 5,
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
          path="/administracion/organizacion/historial-instrucciones-permanentes"
          icon={<BillIcon size={28} color="#153075" />}
        />

        <IntermediateMenuItem
          title="Inversores"
          subtitle="Ver los detalles de la cuenta de crédito asociados con los inversores."
          path="/administracion/organizacion/inversores"
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
          path="/administracion/organizacion/mapeo-de-fondos"
          icon={<MoneyCheckIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Tipo de pago"
          subtitle="Administrar tipos de pago"
          path="/administracion/organizacion/tipo-de-pago"
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
          path="/administracion/organizacion/criterios-de-concesion-de-creditos"
          icon={<FilterIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Consulta ad hoc"
          subtitle="Definir AdHocQuery para la organización"
          path="/administracion/organizacion/consulta-ad-hoc"
          icon={<MirroringScreenIcon size={28} color="#153075" />}
        />
        <IntermediateMenuItem
          title="Verificaciones de la tabla de datos de la entidad"
          subtitle="Definir comprobaciones de la tabla de datos de la entidad para la organización"
          path="/administracion/organizacion/verificacion-de-tablas"
          icon={<TaskListIcon size={28} color="#153075" />}
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
        {/* <IntermediateMenuItem
          title="Importación masiva"
          subtitle="Importación masiva de datos mediante plantillas de hojas de cálculo excel para clientes, oficinas, etc."
          path="/administracion/organizacion/importacion-masiva"
          icon={<MessagesReceivedIcon size={28} color="#153075" />}
        /> */}
      </Stack>
    </Wrapper>
  );
}
