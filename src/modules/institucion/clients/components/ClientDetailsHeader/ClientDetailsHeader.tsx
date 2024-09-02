import React, { useContext } from "react";
import { formatSpanishDate } from "@/utilities/common.utility";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import Image from "next/image";
import Button from "@/components/Button";
import EditIcon from "@/assets/icons/EditIcon";
import LockIcon from "@/assets/icons/LockIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import { ClientDetailsContext } from "../../context/ClientDetails/ClientDetails.context";
import { useParams } from "next/navigation";

export default function ClientDetailsHeader({ clientData, getClientData }: { clientData: any; getClientData: () => void }) {
  const [isLoadingActivation, setIsLoadingActivation] = React.useState<boolean>(false);
  const params = useParams();
  const { activateUser } = useContext(ClientDetailsContext);

  async function handleActivationUser() {
    setIsLoadingActivation(true);
    await activateUser(params.clientId);
    getClientData();
    setIsLoadingActivation(false);
  }

  return (
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
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Stack
            sx={{
              alignItems: "center",
              width: "160px",
              height: "160px",
              position: "relative",
              borderRadius: "20px",
            }}
          >
            {/* Status */}
            <Tooltip
              placement="top"
              title={clientData?.status?.value === "Active" ? "Activo" : clientData?.status?.value === "Pending" ? "Pendiente" : "Activo"}
            >
              <Box
                sx={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "8px",
                  bgcolor: `${
                    clientData?.status?.value === "Active" ? "var(--primaryGreen)" : clientData?.status?.value === "Pending" ? "#FF9300" : "var(--primaryGreen)"
                  }`,
                  position: "absolute",
                  top: "7px",
                  right: "24px",
                }}
              />
            </Tooltip>
            <Image width={160} height={160} src="/assets/images/profile.jpg" style={{ borderRadius: "100px", objectFit: "cover" }} alt="Profile" />
            <Typography variant="caption" fontWeight="300" color="var(--secondaryText)" sx={{ mt: 1 }}>
              Ver firma
            </Typography>
          </Stack>
          <Stack>
            <Stack sx={{ pl: 6, gap: 1.5, py: 1 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Nombre del cliente:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.displayName}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Oficina:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.officeName}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Documento:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.externalId}
                </Typography>
              </Stack>
              {clientData?.timeline?.activatedOnDate && (
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Fecha de activación:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {formatSpanishDate(clientData?.timeline?.activatedOnDate)}
                  </Typography>
                </Stack>
              )}
              {clientData?.loanOfficer && (
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography variant="body2" color="var(--secondaryText)">
                    Asesor:
                  </Typography>
                  <Typography variant="body2" color="var(--text)">
                    {clientData?.loanOfficer}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack sx={{ pl: 6, gap: 1.5, pt: 3 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Número de teléfono:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  0412-15-4757
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Correo electrónico:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  requenade@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Box sx={{ gap: 3, display: "flex" }}>
            {clientData?.status?.value !== "Active" && (
              <Button
                variant="success"
                iconLeft
                icon={<PersonHexagonalIcon color={"#fff"} size={26} />}
                text="Activar cliente"
                onClick={handleActivationUser}
                asyncAction
                isLoading={isLoadingActivation}
              />
            )}
            <Button variant="standard" iconLeft icon={<EditIcon color={"#fff"} size={20} />} text="Editar cliente" />
            <Button variant="standard" text="" buttonList />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
