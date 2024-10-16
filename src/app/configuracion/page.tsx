"use client";
import React from "react";
import { Grid, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import CheckIcon from "@/assets/icons/Checkicon";
import { useRouter } from "next/navigation";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import ChangeUserPasswordForm from "@/modules/administracion/usuarios/components/ChangeUserPasswordForm";

export default function ConfigurationPage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accountData, setAccountData] = React.useState<any>({
    roles: [],
  });
  const router = useRouter();

  async function handleGetActuatorInfo() {
    setIsLoading(true);
    const data = localStorage.getItem("litecoreXCredentials");
    if (data) {
      setAccountData(JSON.parse(data));
    } else {
      toast.error("Error al obtener la información de la cuenta.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetActuatorInfo();
  }, []);

  const columns: GridColDef<(typeof accountData.roles)[number]>[] = [
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      valueGetter: (value, row) => `${row?.description || ""} `,
    },
  ];
  return (
    <Grid xs={10.2} sx={{ overflow: "auto" }}>
      {isLoading ? (
        <Loader size="40" color="#484848" />
      ) : (
        <Stack>
          <Stack sx={{ alignItems: "center", maxWidth: "100%", px: 10, py: 1, bgcolor: "#f2f4f7" }}>
            <Stack
              sx={{
                width: "100%",
                py: 4,
                borderRadius: "16px",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexDirection: "row",
              }}
            >
              <Stack sx={{ pl: 2, gap: 2, py: 1 }}>
                {accountData?.entityId && (
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <Typography variant="body2" color="var(--secondaryText)">
                      ID de la entidad:
                    </Typography>
                    <Typography variant="body2" color="var(--text)">
                      {accountData?.entityId}
                    </Typography>
                  </Stack>
                )}
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    ID de usuario:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {accountData?.userId}
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Nombre de usuario:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {accountData?.username}
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Oficina:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {accountData?.officeName}
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Estado:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {accountData?.authenticated ? "Autenticado" : "No autenticado"}
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 2 }}>
                <Button
                  icon={<CheckIcon size={14} color="#fff" />}
                  iconLeft
                  text="Permisos"
                  variant="standard"
                  onClick={() => {
                    router.push("/administracion/sistema/roles-permisos");
                  }}
                />
                <Button
                  icon={<SettingsIcon size={20} color="#fff" />}
                  iconLeft
                  text="Cambiar la contraseña"
                  variant="standard"
                  onClick={() => {
                    setShowChangePasswordModal(true);
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ mt: 5, px: 10 }}>
            <DataGrid
              rows={accountData?.roles || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                    page: 0,
                  },
                },
              }}
              disableRowSelectionOnClick
              rowSelection
              pageSizeOptions={[10, 25, 50]}
            />
          </Stack>
        </Stack>
      )}

      <RenderFormModal
        title="Cambiar la contraseña"
        subtitle="Ingrese su nueva contraseña"
        isOpen={showChangePasswordModal}
        sx={{ maxWidth: "400px", width: "400px" }}
        setIsOpen={setShowChangePasswordModal}
      >
        <ChangeUserPasswordForm fromAdmin userId={accountData?.userId} secondaryAction={() => setShowChangePasswordModal(false)} />
      </RenderFormModal>
    </Grid>
  );
}
