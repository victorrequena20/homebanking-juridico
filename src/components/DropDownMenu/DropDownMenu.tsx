import React from "react";
import { DropDownMenuProps } from "./DropDownMenuProps";
import { Box, Stack, Typography, SxProps, IconButton } from "@mui/material";
import EllipsisVertical from "@/assets/icons/EllipsisVertical";

export default function DropDownMenu({ options = [], moreOptions }: DropDownMenuProps) {
  const [isListVisible, setIsListVisible] = React.useState<boolean>(false);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [showMoreList, setShowMoreList] = React.useState<boolean>(false);
  const [showActionsList, setShowActionsList] = React.useState<boolean>(false);

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

  const toggleListVisibility = () => {
    setIsListVisible(prev => !prev);
  };

  React.useEffect(() => {
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

  const onAction = () => {};

  return (
    <Stack id="dropdown">
      <Box sx={{ gap: 3, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ position: "relative", mt: { xs: 3, sm: 0 } }} ref={listRef}>
          <IconButton onClick={toggleListVisibility}>
            <EllipsisVertical />
          </IconButton>
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
              {options.map((option, index) => (
                <Stack
                  sx={listItemStyles}
                  key={index}
                  onClick={() => {
                    option.action();
                    toggleListVisibility();
                  }}
                >
                  {option.icon && option.icon}
                  <Typography variant="body2" fontWeight="300">
                    {option?.label}
                  </Typography>
                </Stack>
              ))}
              {moreOptions && (
                <Stack sx={listItemStyles} onMouseEnter={() => setShowMoreList(true)} onMouseLeave={() => setShowMoreList(false)}>
                  {/* <PlusIcon color={"#000"} size={20} /> */}
                  <Typography variant="body2" fontWeight="300">
                    Más
                  </Typography>
                </Stack>
              )}
              {/* Más acciones */}
            </Box>
          )}
          {/* Secondary list actions */}
          <Box
            className="second-list"
            sx={{
              display: showMoreList ? "block" : "none",
              position: "absolute",
              top: "195px",
              right: "240px",
              width: "180px",
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 8px 16px 0px #2636990A",
              zIndex: 1,
            }}
            onMouseEnter={() => setShowActionsList(true)}
            onMouseLeave={() => setShowActionsList(false)}
          >
            <Stack sx={listItemStyles}>
              <Typography variant="body2" fontWeight="300">
                Publicar interés
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
