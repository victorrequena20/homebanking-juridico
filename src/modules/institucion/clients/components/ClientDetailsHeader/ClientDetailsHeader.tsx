import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Stack, Typography, Tooltip, SxProps } from "@mui/material";
import Image from "next/image";
import Button from "@/components/Button";
import EditIcon from "@/assets/icons/EditIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import { ClientDetailsContext } from "../../context/ClientDetails/ClientDetails.context";
import { useParams, useRouter } from "next/navigation";
import PlayIcon from "@/assets/icons/PlayIcon";
import PersonPlusIcon from "@/assets/icons/PersonPlusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { formatSpanishDate } from "@/utilities/common.utility";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import { assignAndDeallocateAdviser, deleteCliente } from "@/services/Clients.service";
import { toast } from "sonner";

interface ClientDetailsHeaderProps {
  clientData: any;
  getClientData: () => void;
}

export default function ClientDetailsHeader({ clientData, getClientData }: ClientDetailsHeaderProps) {
  const [showMoreList, setShowMoreList] = useState<boolean>(false);
  const [isLoadingActivation, setIsLoadingActivation] = useState<boolean>(false);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const [showActionsList, setShowActionsList] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const router = useRouter();
  const { activateUser } = useContext(ClientDetailsContext);

  async function handleDeleteClient() {
    const response = await deleteCliente(params.clientId?.toString());
    if (response?.status === 200) {
      toast.success("Cliente eliminado con éxito");
      router.push("/institucion/clientes");
    } else {
      toast.error("Error al eliminar el cliente");
    }
  }

  async function handleActivationUser() {
    setIsLoadingActivation(true);
    await activateUser(params.clientId);
    getClientData();
    setIsLoadingActivation(false);
  }

  const toggleListVisibility = () => {
    setIsListVisible(prev => !prev);
  };

  const handleClickOutsideMouse = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsListVisible(false);
    }
  };

  const handleClickOutsideTouch = (event: TouchEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    if (isListVisible) {
      document.addEventListener("mousedown", handleClickOutsideMouse);
      document.addEventListener("touchstart", handleClickOutsideTouch);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMouse);
      document.removeEventListener("touchstart", handleClickOutsideTouch);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMouse);
      document.removeEventListener("touchstart", handleClickOutsideTouch);
    };
  }, [isListVisible]);

  const listItemStyles: SxProps = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    pl: 2,
    py: 1.5,
    cursor: "pointer",
    "&:hover": {
      bgcolor: "#f2f4f760",
    },
  };

  const deallocateAdviser = async () => {
    const response = await assignAndDeallocateAdviser(
      params?.clientId?.toString(),
      {
        staffId: clientData?.staffId,
      },
      false
    );
    if (response?.status === 200) {
      toast.success("Asesor desasignado con éxito");
      toggleListVisibility();
      getClientData();
    } else {
      toast.error("Error al desasignar el asesor");
    }
  };

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
            <Image width={160} height={160} src="/assets/images/genericProfile.webp" style={{ borderRadius: "100px", objectFit: "cover" }} alt="Profile" />
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
                  Documento:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData?.externalId}
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ pl: 6, gap: 1.5 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Correo electrónico:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {clientData.displayName + "@gmail.com"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Box sx={{ gap: 3, display: "flex" }}>
            {/* <Button variant="standard" iconLeft icon={<EditIcon color={"#fff"} size={20} />} text="Editar cliente" /> */}
            <Box sx={{ position: "relative" }} ref={listRef}>
              <Button text="Pagar nómina" variant="success" />
              {isListVisible && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "46px",
                    right: 0,
                    width: "180px",
                    bgcolor: "#fff",
                    borderRadius: 2,
                    py: 1,
                    boxShadow: "0px 8px 16px 0px #2636990A",
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  <Stack
                    sx={{
                      ...listItemStyles,
                      "&:hover .second-list": {
                        display: "block",
                      },
                    }}
                  >
                    <EditIcon color={"#000"} size={20} />
                    <Typography variant="body2" fontWeight="300">
                      Editar
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      ...listItemStyles,
                      "&:hover .second-list": {
                        display: "block",
                      },
                    }}
                    onMouseEnter={() => setShowActionsList(true)}
                    onMouseLeave={() => setShowActionsList(false)}
                  >
                    <PlayIcon color={"#000"} size={20} />
                    <Typography variant="body2" fontWeight="300">
                      Acciones
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <PersonPlusIcon color={"#000"} size={20} />
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        if (clientData?.staffId) {
                          deallocateAdviser();
                          return;
                        }

                        router.push(`/institucion/clientes/${params.clientId}/acciones/asignar-asesor`);
                      }}
                    >
                      {!clientData?.staffId ? "Asignar asesor" : " Desasignar asesor"}
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }} onMouseEnter={() => setShowMoreList(true)} onMouseLeave={() => setShowMoreList(false)}>
                    <PlusIcon color={"#000"} size={20} />
                    <Typography variant="body2" fontWeight="300">
                      Más
                    </Typography>
                  </Stack>
                </Box>
              )}
              {/* Secondary list actions */}
              <Box
                className="second-list"
                sx={{
                  display: showActionsList ? "block" : "none",
                  // display: "block",
                  position: "absolute",
                  top: "100px",
                  right: "182px",
                  width: "180px",
                  bgcolor: "#fff",
                  borderRadius: 2,
                  boxShadow: "0px 8px 16px 0px #2636990A",
                  zIndex: 1,
                }}
                onMouseEnter={() => setShowActionsList(true)}
                onMouseLeave={() => setShowActionsList(false)}
              >
                <Stack>
                  {(clientData?.status?.value === "Active" ||
                    clientData?.status?.value === "Pending" ||
                    clientData?.status?.value === "Withdrawn" ||
                    clientData?.status?.value === "Rejected") && (
                    <Stack
                      sx={{ ...listItemStyles }}
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/cerrar`);
                      }}
                    >
                      <Typography variant="body2" fontWeight="300">
                        Cerrar
                      </Typography>
                    </Stack>
                  )}
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/transferir-cliente`);
                      }}
                    >
                      Transferir cliente
                    </Typography>
                  </Stack>
                  {clientData?.status?.value === "Transfer in progress" && (
                    <Stack sx={{ ...listItemStyles }}>
                      <Typography
                        variant="body2"
                        fontWeight="300"
                        onClick={() => {
                          router.push(`/institucion/clientes/${params.clientId}/acciones/aceptar-transferencia-de-cliente`);
                        }}
                      >
                        Aceptar transferencia
                      </Typography>
                    </Stack>
                  )}
                  {clientData?.status?.value === "Closed" && (
                    <Stack
                      sx={{ ...listItemStyles }}
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/reactivar`);
                      }}
                    >
                      <Typography variant="body2" fontWeight="300">
                        Reactivar
                      </Typography>
                    </Stack>
                  )}
                  {clientData?.status?.value !== "Closed" &&
                    clientData?.status?.value !== "Active" &&
                    clientData?.status?.value !== "Withdrawn" &&
                    clientData?.status?.value !== "Rejected" && (
                      <Stack sx={{ ...listItemStyles }} onClick={handleActivationUser}>
                        <Typography variant="body2" fontWeight="300">
                          Activar
                        </Typography>
                      </Stack>
                    )}
                  {clientData?.status?.value !== "Closed" &&
                    clientData?.status?.value !== "Active" &&
                    clientData?.status?.value !== "Withdrawn" &&
                    clientData?.status?.value !== "Rejected" && (
                      <Stack
                        sx={{ ...listItemStyles }}
                        onClick={() => {
                          router.push(`/institucion/clientes/${params.clientId}/acciones/retirar`);
                        }}
                      >
                        <Typography variant="body2" fontWeight="300">
                          Retirar
                        </Typography>
                      </Stack>
                    )}
                  {clientData?.status?.value !== "Closed" &&
                    clientData?.status?.value !== "Active" &&
                    clientData?.status?.value !== "Withdrawn" &&
                    clientData?.status?.value !== "Rejected" && (
                      <Stack sx={{ ...listItemStyles }} onClick={() => router.push(`/institucion/clientes/${params.clientId}/acciones/rechazar`)}>
                        <Typography variant="body2" fontWeight="300">
                          Rechazar
                        </Typography>
                      </Stack>
                    )}
                  {clientData?.status?.value === "Rejected" && (
                    <Stack sx={{ ...listItemStyles }} onClick={() => router.push(`/institucion/clientes/${params.clientId}/acciones/deshacer-rechazo`)}>
                      <Typography variant="body2" fontWeight="300">
                        Deshacer rechazo
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
              <Box
                className="second-list"
                sx={{
                  display: showMoreList ? "block" : "none",
                  position: "absolute",
                  top: "0px",
                  right: "182px",
                  width: "280px",
                  bgcolor: "#fff",
                  borderRadius: 2,
                  boxShadow: "0px 8px 16px 0px #2636990A",
                  zIndex: 1,
                }}
                onMouseEnter={() => setShowMoreList(true)}
                onMouseLeave={() => setShowMoreList(false)}
              >
                <Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/mas/agregar-comision`);
                      }}
                    >
                      Agregar Comisión
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/mas/crear-garantia`);
                      }}
                    >
                      Crear garantía
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/encuesta`);
                      }}
                    >
                      Encuesta
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/actualizar-ahorros-predeterminados`);
                      }}
                    >
                      Actualizar ahorros predeterminados
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/transferir-cliente`);
                      }}
                    >
                      Subir firma
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/transferir-cliente`);
                      }}
                    >
                      Eliminar firma
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/reportes-de-pantalla-del-cliente`);
                      }}
                    >
                      Reportes de pantalla del cliente
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/transferir-cliente`);
                      }}
                    >
                      Crear instrucciones permanentes
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/ver-instrucciones-permanentes`);
                      }}
                    >
                      Ver instrucciones permanentes
                    </Typography>
                  </Stack>
                  <Stack sx={{ ...listItemStyles }}>
                    <Typography
                      variant="body2"
                      fontWeight="300"
                      onClick={() => {
                        router.push(`/institucion/clientes/${params.clientId}/acciones/transferir-cliente`);
                      }}
                    >
                      Crear usuario de autoservicio
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
