import React from "react";
import { ICreateEditUserFormProps } from "./CreateEditUserFormProps";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ICreateEditUserForm } from "./types";
import { schema } from "./yup";
import { Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { getUsersTemplate } from "@/services/Users.service";

export default function CreateEditUserForm({ user }: ICreateEditUserFormProps) {
  const [allowedOffices, setAllowedOffices] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateEditUserForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  React.useEffect(() => {
    (async () => {
      const response = await getUsersTemplate();
      console.log("🚀 ~ response:", response);
      if (response.status === 200) {
        setAllowedOffices(response?.data?.allowedOffices);
      }
    })();
  }, []);

  return (
    <Grid component="form" md={12} sx={{ gap: 3, maxWidth: "1000px" }} container mt={4}>
      {/* Username */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nombre de usuario*"
                type="text"
                isValidField={!errors.username}
                hint={errors.username?.message}
                value={value}
                onChange={onChange}
                defaultValue={user?.username}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Email */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Correo eléctronico*"
                type="email"
                isValidField={!errors.email}
                hint={errors.email?.message}
                value={value}
                onChange={onChange}
                defaultValue={user?.email}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Name */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="firstname"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nombre*"
                type="text"
                isValidField={!errors.username}
                hint={errors.username?.message}
                value={value}
                onChange={onChange}
                defaultValue={user?.firstname}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Lastname */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="lastname"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Apellido*"
                type="email"
                isValidField={!errors.email}
                hint={errors.email?.message}
                value={value}
                onChange={onChange}
                defaultValue={user?.lastname}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Office */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="office"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Oficina*"
                options={keyValueAdapter(allowedOffices, "name", "id")}
                onChange={onChange}
                defaultValue={user?.officeId}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Asesor */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="asesor"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Asesor*"
                type="email"
                isValidField={!errors.email}
                hint={errors.email?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Roles */}
      <Grid>
        <Stack>
          <Controller
            control={control}
            name="roles"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Roles*"
                options={keyValueAdapter(user?.selectedRoles.concat(user?.availableRoles), "name", "id")}
                withCheckbox
                onChange={onChange}
                defaultValue={user?.selectedRoles?.map((item: any) => item?.id)}
              />
            )}
          />
        </Stack>
      </Grid>

      {/* Buttons */}
      <Grid md={10}>
        <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", columnGap: 2 }}>
          <Button size="small" text="cancelar" variant="navigation" />
          <Button size="small" text="Aceptar" variant="primary" />
        </Stack>
      </Grid>
    </Grid>
  );
}
