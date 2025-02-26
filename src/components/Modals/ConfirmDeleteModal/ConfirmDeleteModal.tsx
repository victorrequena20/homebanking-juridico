import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@/components/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TrashIcon from "@/assets/icons/TrashIcon";
import { ConfirmDeleteModalProps } from "./ConfirmDeleteModalProps";
import { Tooltip } from "@mui/material";

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

export default function ConfirmDeleteModal({
  title,
  actionCallback,
  buttonActionCallback,
  buttonType = "normal",
  buttonText = "Borrar",
  icon = <TrashIcon size={20} color="#fff" />,
  confirmText = "Eliminar"
}: ConfirmDeleteModalProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    buttonActionCallback && buttonActionCallback();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAction = async () => {
    setIsLoading(true);
    actionCallback && (await actionCallback());
    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      {buttonType === "action" ? (
        <Tooltip title="Eliminar" placement="top">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#ea3647",
              maxWidth: "36px",
              width: "36px",
              borderRadius: "8px",
              height: "36px",
              cursor: "pointer",
            }}
            onClick={handleOpen}
          >
            <TrashIcon size={20} color="#fff" />
          </Box>
        </Tooltip>
      ) : (
        <Button iconLeft icon={icon} size="small" text={buttonText} variant="warning-red" onClick={handleOpen} />
      )}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
            <Button iconLeft size="small" text="Cancelar" variant="navigation" onClick={handleClose} />
            <Button iconLeft size="small" text={confirmText} variant="warning-red" onClick={handleAction} isLoading={isLoading} />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
