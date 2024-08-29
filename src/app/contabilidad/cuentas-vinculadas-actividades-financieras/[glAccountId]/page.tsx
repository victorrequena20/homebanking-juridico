"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography, Box } from "@mui/material";
import { flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function GlAccountDetails({ params }: { params: { glAccountId: string } }) {
  return (
    <Wrapper>
      <Breadcrumbs
        title="Mapeos de actividades financieras"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          {
            title: "Mapeos de actividades financieras",
            href: "/contabilidad/cuentas-vinculadas-actividades-financieras",
          },
          { title: "Detalles de la cuenta" },
        ]}
      />

      <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
        <Stack>
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
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Detalles de la actividad financiera
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
                Ver y editar
              </Typography>
              <ArrowRightIcon size={16} color="var(--secondaryText)" />
            </Box>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Actividad financiera
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {/* {`${userData?.firstname} ${userData?.lastname}`} */}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Tipo de cuenta
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              {/* {userData?.email} */}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" fontWeight="300" color="#606778">
              Nombre de la cuenta
            </Typography>
            <Typography variant="body2" fontWeight="400" color="#12141a">
              04121504757
            </Typography>
          </Stack>

          {/* Editar contraseña */}
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
                mt: 5,
              }}
            >
              <Typography variant="body2" fontWeight="400" color="#12141a">
                Editar actividad financiera
              </Typography>
            </Stack>

            {/* Form */}
          </Stack>

          {/* Activación / desactivación */}
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
                mt: 5,
              }}
            >
              <Typography variant="body2" fontWeight="400" color="#12141a">
                Eliminar actividad financiera
              </Typography>
              <ConfirmDeleteModal
                title="¿Estás seguro de que deseas eliminar esta actividad financiera?"
                // actionCallback={handleDeleteUser}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
