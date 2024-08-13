"use client";
import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Box, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IChangeUserPasswordForm } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserPassword } from "@/services/Users.service";
import { schema } from "./yup";
import { toast } from "sonner";
import { IChangeUserPasswordFormProps } from "./ChangeUserPasswordFormProps";

export default function ChangeUserPasswordForm({ userId }: IChangeUserPasswordFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IChangeUserPasswordForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: IChangeUserPasswordForm) => {
    const { newPassword, confirmPassword } = data;
    setIsLoading(true);
    const response = await updateUserPassword({ password: newPassword, repeatPassword: confirmPassword }, userId || "");
    if (response.status === 200) {
      toast.success("Contraseña cambiada con exito!", {
        cancel: true,
      });
      reset();
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 3, mt: 3 }}>
        <Stack>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nueva contraseña"
                type="password"
                isValidField={!errors.newPassword}
                hint={errors.newPassword?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Stack>
        <Stack>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Confirmar nueva contraseña"
                type="password"
                isValidField={!errors.confirmPassword}
                hint={errors.confirmPassword?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Stack>
        <Box>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || Object.keys(dirtyFields).length < 2}
            size="small"
            text="Guardar cambios"
            variant="primary"
          />
        </Box>
      </Stack>
    </form>
  );
}
