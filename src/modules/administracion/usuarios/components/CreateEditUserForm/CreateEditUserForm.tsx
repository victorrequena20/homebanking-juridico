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
import { getUsersTemplate, updateUser } from "@/services/Users.service";
import { getStaffs } from "@/services/Core.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateEditUserForm({ user, close }: ICreateEditUserFormProps) {
  //   console.log("🚀 ~ CreateEditUserForm ~ user:", user);
  const [asesoresByOffice, setAsesoresByOffice] = React.useState<any[]>();
  const [allowedOffices, setAllowedOffices] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const resolver: any = yupResolver(schema);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateEditUserForm>({ resolver, mode: "onChange" });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await updateUser(data, user?.id?.toString() || "");
    if (response.status === 200) {
      toast.success("Usuario actualizado con exito!");
      close && close();
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getUsersTemplate();
      if (response.status === 200) {
        setAllowedOffices(response?.data?.allowedOffices);
      }

      const responseStaffs = await getStaffs({ officeId: user?.officeId, status: "all" });
      if (responseStaffs?.status === 200) {
        setAsesoresByOffice(responseStaffs?.data);
      }
      //   console.log("🚀 ~ responseStaffs:", responseStaffs);
    })();
  }, []);

  //   Update fields
  React.useEffect(() => {
    if (user) {
      reset({
        username: user?.username,
        email: user?.email,
        firstname: user?.firstname,
        lastname: user?.lastname,
        officeId: user?.officeId,
        staffId: user?.staff?.id,
        roles: user?.selectedRoles.map((role: any) => role.id),
      });
    }
  }, [user]);

  React.useEffect(() => {
    console.log("🚀 ~ CreateEditUserForm ~ errors:", errors);
  }, [errors]);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      md={12}
      sx={{ gap: 3, maxWidth: "1000px" }}
      container
      mt={4}
    >
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
                isValidField={!errors.firstname}
                hint={errors.firstname?.message}
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
                type="text"
                isValidField={!errors.lastname}
                hint={errors.lastname?.message}
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
            name="officeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Oficina*"
                options={keyValueAdapter(allowedOffices, "name", "id")}
                onChange={onChange}
                setItem={item => onChange(item?.value)}
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
            name="staffId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Asesor"
                options={keyValueAdapter(asesoresByOffice, "displayName", "id")}
                setItem={item => onChange(item?.value)}
                defaultValue={user?.staff?.id}
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
                setItem={item => onChange(item?.value)}
                defaultValue={user?.selectedRoles?.map((item: any) => item?.id)}
              />
            )}
          />
        </Stack>
      </Grid>

      {/* Buttons */}
      <Grid md={10}>
        <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", columnGap: 2 }}>
          <Button
            type="button"
            size="small"
            text="cancelar"
            variant="navigation"
            onClick={() => {
              close && close();
            }}
          />
          <Button size="small" text="Aceptar" variant="primary" type="submit" isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
