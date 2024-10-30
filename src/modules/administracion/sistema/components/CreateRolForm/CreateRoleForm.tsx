"use client";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ICreateRolForm } from "./types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { createRole } from "@/services/Roles.service";
import { schema } from "./yup";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

interface CreateRoleFormProps {
  roleData?: ICreateRolForm;
}

export default function CreateRoleForm({ roleData }: CreateRoleFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateRolForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (roleData) {
      reset({
        name: roleData.name,
        description: roleData.description,
      });
    }
  }, [roleData, reset]);

  const onSubmit = async (data: ICreateRolForm) => {
    setIsLoading(true);
    const response = await createRole(data, roleData?.id);
    if (response?.status) {
      toast.success(`Rol ${roleData ? "actualizado" : "creado"} con éxito!`, { cancel: true });
      router.push("/administracion/sistema/roles-permisos/");
      reset();
    } else {
      toast.error(`Error al ${roleData ? "actualizar" : "crear"} el rol`);
    }
    setIsLoading(false);
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        gap: 3,
        maxWidth: "600px",
        backgroundColor: "#fff",
        px: 6,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
      container
      mt={3}
    >
      <Stack sx={{ gap: 3, mt: 3 }}>
        <InputResponsiveContainer>
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
                disabled={!!roleData}
              />
            )}
          />
        </InputResponsiveContainer>
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Input label="Descripción*" type="text" isValidField={!errors.description} hint={errors.description?.message} value={value} onChange={onChange} />
            )}
          />
        </InputResponsiveContainer>

        <Grid md={12}>
          <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 3 }}>
            <Button type="button" size="small" text="Cancelar" variant="navigation" onClick={() => router.push("/administracion/sistema/roles-permisos/")} />
            <Button type="submit" isLoading={isLoading} disabled={!isValid} size="small" text="Aceptar" variant="primary" />
          </Stack>
        </Grid>
      </Stack>
    </Grid>
  );
}
