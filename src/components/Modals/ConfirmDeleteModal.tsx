import * as React from 'react';
import Box from '@mui/material/Box';
import Button from "@/components/Button";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrashIcon from '@/assets/icons/TrashIcon';
import { deleteUser } from '@/services/Users.service';
import { useRouter } from "next/navigation";

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4px',
  height: '100px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmDeleteModal( userId: any  ) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter()
  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userId?.userId?.toString());
      console.log("delete user", userId);
      if (response.status === 200) {
        handleClose(); 
        router.push('/administracion/usuarios');
      } else {
        console.error("Error al eliminar el usuario:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <div>
      <Button
        iconLeft
        icon={<TrashIcon size={20} color="#fff" />}
        size="small"
        text="Borrar"
        variant="warning-red"
        onClick={handleOpen} 
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Esta seguro que desea eliminar al usuario?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>

          <Box style={
            {
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%'
            }
          }>
            <Button 
            iconLeft
            size="small"
            text="Cancelar"
            variant="primary"
            onClick={handleClose}/>

            <Button 
            iconLeft
            size="small"
            text="Eliminar"
            variant="warning-red"
            onClick= {handleDeleteUser}/>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
