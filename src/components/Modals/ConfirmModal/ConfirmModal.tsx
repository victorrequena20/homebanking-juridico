import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@/components/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ConfirmModalProps } from "./ConfirmModalProps";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4px",
  height: "100px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  px: 6,
};

export default function ConfirmModal({
  title,
  isOpen = false,
  actionCallback,
  closeCallback,
  confirmText = "Eliminar"
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAction = async () => {
    setIsLoading(true);
    actionCallback && (await actionCallback());
    setIsLoading(false);
    closeCallback;
  };

  return (
    <>
      <Modal open={isOpen} onClose={closeCallback} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" fontWeight="400" component="p" textAlign="center">
            {title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              mt: 2,
            }}
          >
            <Button iconLeft size="small" text="Cancelar" variant="navigation" onClick={closeCallback} />
            <Button iconLeft size="small" text={confirmText} variant="warning-red" onClick={handleAction} isLoading={isLoading} />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
