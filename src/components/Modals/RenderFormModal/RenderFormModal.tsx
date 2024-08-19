import React from "react";
import { IRenderFormModalProps } from "./RenderFormModalProps";
import { Box, Modal, Stack, Typography } from "@mui/material";

export default function RenderFormModal({ isOpen = false, setIsOpen, title, children, sx }: IRenderFormModalProps) {
  const style = {
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
    py: 6,
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
        <Typography id="modal-modal-title" variant="h6" component="p" textAlign="center">
          {title}
        </Typography>
        <Stack sx={{ mt: 3 }}>{children}</Stack>
      </Box>
    </Modal>
  );
}
