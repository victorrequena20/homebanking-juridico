import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Stack, Typography, SxProps } from "@mui/material";
import Button from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import ArrowUpIcon from "@/assets/icons/ArrowUpIcon";
import LockIcon from "@/assets/icons/LockIcon";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import PercentageSquareIcon from "@/assets/icons/PercentageSquareIcon";
import PlusIcon from "@/assets/icons/PlusIcon";

interface AccountDetailsHeaderProps {
  accountData: any;
}

export default function AccountDetailsHeader({ accountData }: AccountDetailsHeaderProps) {
  const [showMoreList, setShowMoreList] = useState<boolean>(false);
  const [isLoadingActivation, setIsLoadingActivation] = useState<boolean>(false);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const router = useRouter();

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

  const actions = [
    {
      label: "Depósito",
      icon: <ArrowUpIcon color={"#000"} size={20} />,
      action: () => action(),
    },
    {
      label: "Bloquear depósitos",
      icon: <LockIcon color={"#000"} size={20} />,
      action: () => action(),
    },
    {
      label: "Retiro",
      icon: <ArrowDownIcon color={"#000"} size={20} />,
      action: () => action(),
    },
    {
      label: "Bloquear retiros",
      icon: <LockIcon color={"#000"} size={20} />,
      action: () => action(),
    },
    {
      label: "Bloquear cuenta",
      icon: <LockIcon color={"#000"} size={20} />,
      action: () => action(),
    },
    {
      label: "Monto retenido",
      icon: <LockIcon color={"#000"} size={20} />,
      action: () => action(),
    },
    {
      label: "Calcular interés",
      icon: <PercentageSquareIcon color={"#000"} size={20} />,
      action: () => action(),
    },
  ];

  const secondaryActions = [
    {
      label: "Publicar interés",
      action: () => action(),
    },
    {
      label: "Agregar cargo",
      action: () => action(),
    },
    {
      label: "Cerrar",
      action: () => action(),
    },
    {
      label: "Transferir fondos",
      action: () => action(),
    },
    {
      label: "Asignar asesor",
      action: () => action(),
    },
  ];

  const action = () => {
    console.log("action");
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        maxWidth: "100%",
        px: { xs: 4, sm: 10 },
        py: { xs: 2, sm: 1 },
        bgcolor: "#f2f4f7",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          py: { xs: 3, sm: 4 },
          borderRadius: "16px",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "flex-end" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, md: 20 } }}>
            <Stack sx={{ gap: 1.5, py: 1 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Producto Pasivo:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {accountData?.savingsProductName}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Número de cuenta:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {accountData?.accountNo}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Cliente nombre:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {accountData?.clientName}
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ gap: 1.5, py: 1 }}>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--text)">
                  Resumen de la cuenta
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Saldo actual:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {accountData?.currency?.code} {accountData?.summary?.accountBalance}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2" color="var(--secondaryText)">
                  Saldo disponible:
                </Typography>
                <Typography variant="body2" color="var(--text)">
                  {accountData?.currency?.code} {accountData?.summary?.availableBalance}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Box sx={{ gap: 3, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ position: "relative", mt: { xs: 3, sm: 0 } }} ref={listRef}>
              <Button variant="standard" text="Acciones" buttonList onClick={toggleListVisibility} />
              {isListVisible && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "46px",
                    right: 0,
                    width: { xs: "100%", sm: "235px" },
                    bgcolor: "#fff",
                    borderRadius: 2,
                    py: 1,
                    boxShadow: "0px 8px 16px 0px #2636990A",
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  {/* Lista de acciones */}
                  {actions.map((action, index) => (
                    <Stack
                      sx={listItemStyles}
                      key={index}
                      onClick={() => {
                        action.action();
                        toggleListVisibility();
                      }}
                    >
                      {action.icon && action.icon}
                      <Typography variant="body2" fontWeight="300">
                        {action?.label}
                      </Typography>
                    </Stack>
                  ))}
                  <Stack sx={listItemStyles} onMouseEnter={() => setShowMoreList(true)} onMouseLeave={() => setShowMoreList(false)}>
                    <PlusIcon color={"#000"} size={20} />
                    <Typography variant="body2" fontWeight="300">
                      Más
                    </Typography>
                  </Stack>
                  {/* Más acciones */}
                </Box>
              )}
              {/* Secondary list actions */}
              <Stack
                sx={{
                  display: showMoreList ? "block" : "none",
                  position: "absolute",
                  top: "195px",
                  right: "230px",
                  paddingRight: "10px",
                  zIndex: 1,
                }}
                onMouseEnter={() => setShowMoreList(true)}
                onMouseLeave={() => setShowMoreList(false)}
              >
                <Box
                  className="second-list"
                  sx={{
                    width: "180px",
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px 0px #2636990A",
                  }}
                >
                  {secondaryActions.map((action, index) => (
                    <Stack
                      sx={listItemStyles}
                      key={index}
                      onClick={() => {
                        action.action();
                        toggleListVisibility();
                      }}
                    >
                      <Typography variant="body2" fontWeight="300">
                        {action.label}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
