"use client";
import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Box, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ICreateFundForm } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserPassword } from "@/services/Users.service";
import { schema } from "./yup";
import { toast } from "sonner";
import { ICreateFundFormProps } from "./CreateFundFormProps";
import { createFund } from "@/services/Funds.service";
import { useRouter } from "next/navigation";

export default function CreateFundForm({}: ICreateFundFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateFundForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: ICreateFundForm) => {
    const { name, externalId } = data;
    console.log("🚀 ~ onSubmit ~ data:", data);
    setIsLoading(true);
    const response = await createFund({ name, externalId });
    if (response?.status) {
      toast.success("Fondo creado con exito!", {
        cancel: true,
      });
      router.push("/administracion/organizacion/administrar-fondos");
      reset();
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 3, mt: 3 }}>
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Nombre*"
                  type="text"
                  isValidField={!errors.name}
                  hint={errors.name?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="externalId"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Id externo"
                  type="text"
                  isValidField={!errors.externalId}
                  hint={errors.externalId?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Stack>
        <Box>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || Object.keys(dirtyFields).length < 2}
            size="small"
            text="Aceptar"
            variant="primary"
          />
        </Box>
      </Stack>
    </form>
  );
}
