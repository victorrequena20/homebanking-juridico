import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
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

export default function AdministrationSystemPage() {
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
            <Typography variant="h4">Sistema</Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link underline="hover" color="inherit" href="/auth/login">
                <Typography variant="body2">BDC</Typography>
              </Link>
              <Typography variant="body2">Administración</Typography>
              <Link underline="hover" color="text.primary" href="/institucion/clientes" aria-current="page">
                <Typography variant="body2">Sistema</Typography>
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
            title="Administrar tablas de datos"
            subtitle="Agregue nuevos campos adicionales a cualquier entidad en forma de tabla de datos."
            path=""
            icon={<OfficesIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Pistas de auditoría"
            subtitle="Registros de auditoría de todas las actividades, como crear clientes, desembolsar créditos, etc."
            path=""
            icon={<SettingsIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Administrar códigos"
            subtitle="Los códigos se utilizan para definir valores desplegables."
            path=""
            icon={<CalendarEditIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Administrar reportes"
            subtitle="Agregar nuevo reporte y clasificar reportes."
            path=""
            icon={<PercentageSquareIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Administrar roles y permisos"
            subtitle="Definir o modificar roles y permisos asociados."
            path=""
            icon={<PeopleIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Administrar procesos"
            subtitle="Administre calendarización de procesos y sus flujos, modifique procesos o vea el historial."
            path=""
            icon={<WalletReloadIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Configurar tareas de realizador aprobador"
            subtitle="Definir o modificar tareas de realizador aprobador."
            path=""
            icon={<BillIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Configuraciones"
            subtitle="Configuraciones globales, configuración de caché y fecha del sistema."
            path=""
            icon={<CashIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Administrar ganchos"
            subtitle="Definir ganchos."
            path=""
            icon={<PersonPlusIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Preferencias de número de cuenta"
            subtitle="Preferencias para generar números de cuenta para cuentas de clientes, créditos y ahorros."
            path=""
            icon={<Calendar2Icon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Mapeo de entidad a entidad"
            subtitle="Definir o modificar asignaciones de entidad a entidad"
            path=""
            icon={<MoneyCheckIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Servicios externos"
            subtitle="Configuración de servicios externos."
            path=""
            icon={<WalletAddIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Administrar encuestas"
            subtitle="Gestiona tus servicios."
            path=""
            icon={<KeySquareIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Configuración de dos factores"
            subtitle="Ajustes de configuración de autenticación de dos factores."
            path=""
            icon={<MessagesSendIcon size={28} color="#153075" />}
          />
          <IntermediateMenuItem
            title="Gestionar eventos externos"
            subtitle="Configuración de eventos externos, para habilitar o deshabilitar la publicación de eventos."
            path=""
            icon={<FilterIcon size={28} color="#153075" />}
          />
        </Stack>
      </Wrapper>
    </Grid>
  );
}
