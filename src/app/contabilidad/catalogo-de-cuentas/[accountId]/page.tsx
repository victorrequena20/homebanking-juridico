"use client";
import React from "react";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import Wrapper from "@/components/Wrapper";
import { detailRowStyles, detailRowWithAction, flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useRouter } from "next/navigation";

export default function AccountDetailPage({ params }: { params: { accountId: string } }) {
  const router = useRouter();
  return (
    <Wrapper>
      <Breadcrumbs
        items={[
          { title: "Inicio" },
          { title: "Administración" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "CUENTAS CONTINGENTES" },
        ]}
      />

      <Stack sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="600">
          CUENTAS CONTINGENTES
        </Typography>
        <Typography variant="body1" fontWeight="300" color="#606778">
          Los detalles de esta cuenta se encuentran debajo.
        </Typography>
      </Stack>

      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #cccccc80",
            pb: 2,
          }}
        >
          <Typography variant="body2" fontWeight="400">
            Detalles de la cuenta
          </Typography>
          <Box sx={{ ...flexRowCenter, gap: 1 }}>
            <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="var(--secondaryText)">
              Ver y editar
            </Typography>
            <ArrowRightIcon size={16} color="var(--secondaryText)" />
          </Box>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Tipo de cuenta
          </Typography>
          <Typography variant="body2" fontWeight="400">
            Activo
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Número de cuenta
          </Typography>
          <Typography variant="body2" fontWeight="400">
            600.00
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Uso de la cuenta
          </Typography>
          <Typography variant="body2" fontWeight="400">
            HEADER
          </Typography>
        </Stack>
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="var(--secondaryText)">
            Permitir entradas manuales
          </Typography>
          <Typography variant="body2" fontWeight="400">
            Sí
          </Typography>
        </Stack>

        {/* Agregar cuenta auxiliar */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Cuenta auxiliar
          </Typography>
          <Button
            text="Agregar"
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            onClick={() =>
              router.push(`/contabilidad/catalogo-de-cuentas/${params?.accountId}/agregar-cuenta-auxiliar`)
            }
          />
        </Stack>

        {/* Activación / desactivación */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Desactivar cuenta
          </Typography>
          <ConfirmDeleteModal
            buttonText="Desactivar"
            title="¿Estás seguro de que deseas eliminar esta cuenta?"
            //   actionCallback={handleDeleteUser}
          />
        </Stack>
        {/* Eliminar */}
        <Stack sx={detailRowWithAction}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Eliminar cuenta
          </Typography>
          <ConfirmDeleteModal
            title="¿Estás seguro de que deseas eliminar esta cuenta?"
            //   actionCallback={handleDeleteUser}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
