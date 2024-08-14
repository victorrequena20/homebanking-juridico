"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Wrapper from "@/components/Wrapper";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import ChangeUserPasswordForm from "@/modules/administracion/usuarios/components/ChangeUserPasswordForm";
import { getUserById } from "@/services/Users.service";
import { User } from "@/types/User.types";
import CreateEditUserForm from "@/modules/administracion/usuarios/components/CreateEditUserForm";

import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import { deleteUser } from "@/services/Users.service";

export default function UserDetails({ params }: { params: { userId: string } }) {
  const [userData, setUserData] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isActiveUser, setIsActiveUser] = React.useState<boolean>(false);
  const [showEditView, setShowEditView] = React.useState<boolean>(false);
  const router = useRouter();

  function handleShowEditView() {
    setShowEditView(!showEditView);
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getUserById(params.userId);
      if (response?.status) {
        setUserData(response?.data);
        setIsActiveUser(response?.data?.isSelfServiceUser);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      {!showEditView && (
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
              <Typography variant="body2">Administración</Typography>
              <Link underline="hover" color="text.primary" href="/administracion/usuarios">
                <Typography variant="body2">Usuarios</Typography>
              </Link>
              <Typography variant="body2">{userData?.username}</Typography>
            </Breadcrumbs>
          </Stack>
        </Stack>
      )}
      {showEditView ? (
        <Stack sx={{ width: "100%" }}>
          <Box>
            <Button
              icon={<ArrowLeftIcon size={18} color="#484848" />}
              size="small"
              variant="navigation"
              text="Volver"
              onClick={() => setShowEditView(false)}
            />
          </Box>
          <CreateEditUserForm user={userData} close={() => setShowEditView(false)} />
        </Stack>
      ) : (
        <Stack>
          <Stack sx={{ mt: 5 }}>
            <Typography variant="h4" color="#12141a">
              {userData?.username}
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
                  {`${userData?.firstname} ${userData?.lastname}`}
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
                  {userData?.email}
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
                <ChangeUserPasswordForm userId={userData?.id?.toString()} />
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
                    Eliminar usuario
                  </Typography>
                  <ConfirmDeleteModal userId={userData?.id?.toString()} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Wrapper>
  );
}
