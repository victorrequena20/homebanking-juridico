import Button from "@/components/Button";
import Input from "@/components/Input";
import Toggle from "@/components/Toggle";
import { updateCodeValue } from "@/services/Core.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { Box, Modal, SxProps, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const style: SxProps = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4px",
  height: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  px: 6,
  py: 4,
};

export const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string(),
  position: yup.string(),
});

export default function EditCodeValueModal({
  isOpen,
  setIsOpen,
  codeValue,
  codeId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  codeValue: any;
  codeId: string;
}) {
  console.log("🚀 ~ codeValue:", codeValue);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<{ name: string; description?: string; position?: string }>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleClose = () => setIsOpen(false);

  const onSubmit = async (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    setIsLoading(true);
    const dataToSend = {
      ...data,
      isActive,
    };
    const response = await updateCodeValue(dataToSend, codeId, codeValue?.id);
    setIsLoading(true);
    if (response?.status === 200) {
      setIsOpen(false);
      reset({ name: "", description: "", position: "" });
      setValue("name", "");
      setValue("description", "");
      setValue("position", "");
      toast.success("Código actualizado con exito.");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    setIsActive(codeValue?.active);
    setValue("name", codeValue?.name || "");
    setValue("description", codeValue?.description || "");
    setValue("position", codeValue?.position || "");
  }, [codeValue]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="p" textAlign="center">
          Editar {codeValue?.name}
        </Typography>

        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, gap: 2 }}>
          <Stack>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Nombre*"
                  type="text"
                  onChange={onChange}
                  value={value}
                  isValidField={!errors.name}
                  hint={errors.name?.message}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Descripción"
                  type="text"
                  onChange={onChange}
                  value={value}
                  isValidField={!errors.description}
                  hint={errors.description?.message}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="position"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Posición"
                  type="text"
                  onChange={onChange}
                  value={value}
                  isValidField={!errors.position}
                  hint={errors.position?.message}
                />
              )}
            />
          </Stack>

          <Stack sx={{ alignItems: "flex-end" }}>
            <Toggle size="small" label="Activo" isChecked={isActive} setIsChecked={setIsActive} />
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              mt: 3,
            }}
          >
            <Button iconLeft size="small" text="Cancelar" variant="navigation" onClick={handleClose} />
            <Button iconLeft size="small" text="Guardar" variant="primary" isLoading={isLoading} type="submit" />
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
