import React from "react";
import { IRenderFormModalProps } from "./RenderFormModalProps";
import { Box, Modal, Stack, SxProps, Typography } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

export default function RenderFormModal({ isOpen = false, setIsOpen, title, children, subtitle, sx }: IRenderFormModalProps) {
  const style: SxProps = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4px",
    height: "auto",
    maxWidth: "1000px",
    width: "1000px",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    px: 4,
    py: 4,
    pt: 6,
    ...sx,
  };

  function handleClose() {
    setIsOpen?.(false);
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            backgroundColor: "var(--darkBg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "24px",
            height: "24px",
            borderRadius: "24px",
            cursor: "pointer",
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
          onClick={() => {
            handleClose();
          }}
        >
          <GridCloseIcon sx={{ color: "#fff", fontSize: "14px" }} />
        </Box>
        <Stack sx={{ width: "100%", alignItems: "flex-start" }}>
          <Typography id="modal-modal-title" variant="body1" component="p" textAlign="start">
            {title}
          </Typography>
          <Typography sx={{ mt: 0.8 }} id="modal-modal-title" variant="caption" component="p" textAlign="start" color="var(--secondaryText)" fontWeight="300">
            {subtitle}
          </Typography>
        </Stack>
        <Stack sx={{ mt: 3 }}>{children}</Stack>
      </Box>
    </Modal>
  );
}
