"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Wrapper from "@/components/Wrapper";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import VerifyIcon from "@/assets/icons/VerifyIcon";
import LockIcon from "@/assets/icons/LockIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import Input from "@/components/Input";
import Toggle from "@/components/Toggle";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";

export default function UserDetails({ params }: { params: { username: string } }) {
  const [isActiveUser, setIsActiveUser] = React.useState<boolean>(false);
  const [showEditView, setShowEditView] = React.useState<boolean>(false);
  const router = useRouter();

  function handleShowEditView() {
    setShowEditView(!showEditView);
  }
  return (
    <Grid md={10} sx={{ bgcolor: "#FAFAFA", borderRadius: 8, pt: 6, maxHeight: "100%", overflow: "auto", pb: 4 }}>
      <Wrapper>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/auth/login">
                <Typography variant="body2">BDC</Typography>
              </Link>
              <Typography variant="body2">Autoservicio</Typography>
              <Link underline="hover" color="text.primary" href="/autoservicio/gestion-de-usuarios">
                <Typography variant="body2">Gestión de usuarios</Typography>
              </Link>
              <Typography variant="body2">{params?.username}</Typography>
            </Breadcrumbs>
          </Stack>
        </Stack>
        {showEditView ? (
          <Stack sx={{ mt: 5 }}>
            <Box>
              <Button
                icon={<ArrowLeftIcon size={18} color="#484848" />}
                size="small"
                variant="navigation"
                text="Volver"
                onClick={() => setShowEditView(false)}
              />
            </Box>
          </Stack>
        ) : (
          <Stack>
            <Stack sx={{ mt: 5 }}>
              <Typography variant="h4" color="#12141a">
                {params?.username}
              </Typography>
              <Typography variant="body1" fontWeight="300" color="#606778">
                Los detalles de este usuario se encuentran debajo.
              </Typography>
            </Stack>

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
                    Detalles del usuario
                  </Typography>
                  <Box onClick={handleShowEditView}>
                    <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
                      Ver y editar
                    </Typography>
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
                    Nombre
                  </Typography>
                  <Typography variant="body2" fontWeight="400" color="#12141a">
                    Victor Requena
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
                    Correo eléctronico
                  </Typography>
                  <Typography variant="body2" fontWeight="400" color="#12141a">
                    requendev1@gmail.com
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
                    Número de teléfono
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
                      Editar contraseña
                    </Typography>
                  </Stack>

                  {/* Form */}
                  <Stack sx={{ gap: 3, mt: 3 }}>
                    <Stack>
                      <Input label="Nueva contraseña" type="password" />
                    </Stack>
                    <Stack>
                      <Input label="Confirmar nueva contraseña" type="password" />
                    </Stack>
                    <Box>
                      <Button disabled size="small" text="Guardar cambios" variant="primary" />
                    </Box>
                  </Stack>
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
                      Activar / Desactivar usuario
                    </Typography>
                    <Toggle size="small" isChecked={isActiveUser} setIsChecked={setIsActiveUser} />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Wrapper>
    </Grid>
  );
}
