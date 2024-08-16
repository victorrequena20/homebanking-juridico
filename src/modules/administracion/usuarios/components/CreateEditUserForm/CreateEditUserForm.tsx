import React from "react";
import { ICreateEditUserFormProps } from "./CreateEditUserFormProps";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ICreateEditUserForm } from "./types";
import { createSchema, schema } from "./yup";
import { Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { createUser, getUsersTemplate, updateUser } from "@/services/Users.service";
import { getStaffs } from "@/services/Core.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IKeyValue } from "@/types/common";

export default function CreateEditUserForm({ user, close }: ICreateEditUserFormProps) {
  const [asesoresByOffice, setAsesoresByOffice] = React.useState<any[]>();
  const [allowedOffices, setAllowedOffices] = React.useState<any[] | null>(null);
  const [availableRoles, setAvailableRoles] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const resolver: any = yupResolver(schema);
  const createResolver: any = yupResolver(schema);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<ICreateEditUserForm>({ resolver: user ? resolver : createResolver, mode: "onChange" });

  const onSubmit = async (data: ICreateEditUserForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const dataToSend = {
      ...data,
      officeId: data?.officeId?.value,
      staffId: data?.staffId?.value,
    };
    console.log("🚀 ~ onSubmit ~ dataToSend:", isValid, Object.keys(dirtyFields).length);
    // @ts-ignore
    const invalidFields = Object.keys(touchedFields).filter(field => !dirtyFields[field] || errors[field]);
    console.log("🚀 ~ React.useEffect ~ invalidFields:", invalidFields);
    setIsLoading(true);
    if (user) {
      const response = await updateUser(dataToSend, user?.id?.toString() || "");
      if (response.status === 200) {
        toast.success("Usuario actualizado con exito!");
        close && close();
      }
    } else {
      const response = await createUser({
        ...dataToSend,
        passwordNeverExpires: true,
        sendPasswordToEmail: false,
      });
      if (response.status === 200) {
        toast.success("Usuario creado con exito!");
        close && close();
      }
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getUsersTemplate();
      console.log("🚀 ~ response temapl:", response);
      if (response.status === 200) {
        setAllowedOffices(response?.data?.allowedOffices);
        setAvailableRoles(response?.data?.availableRoles);
      }
    })();
  }, []);

  React.useEffect(() => {
    // @ts-ignore
    const invalidFields = Object.keys(touchedFields).filter(field => !dirtyFields[field] || errors[field]);
    console.log("🚀 ~ React.useEffect ~ invalidFields:", invalidFields);
    console.log("��� ~ errors:", errors);
  }, [errors]);

  React.useEffect(() => {
    (async () => {
      if (watch("officeId")) {
        const responseStaffs = await getStaffs({ officeId: watch("officeId")?.value || user?.officeId, status: "all" });
        if (responseStaffs?.status === 200) {
          setAsesoresByOffice(responseStaffs?.data);
        }
      }
    })();
  }, [watch("officeId")]);

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
  }, []);

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
                setItem={(item: IKeyValue) => onChange(item)}
                isValidField={!errors.officeId}
                hint={errors.officeId?.message}
                defaultValue={user?.officeId}
                value={value}
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
                setItem={(item: IKeyValue) => onChange(item)}
                defaultValue={user?.staff?.id}
                value={value}
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Password */}
      {!user && (
        <Grid>
          <Stack>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Nueva contraseña"
                  type="password"
                  isValidField={!errors.password}
                  hint={errors.password?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Grid>
      )}
      {/* Confirm password */}
      {!user && (
        <Grid>
          <Stack>
            <Controller
              control={control}
              name="repeatPassword"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Confirmar nueva contraseña"
                  type="password"
                  isValidField={!errors.repeatPassword}
                  hint={errors.repeatPassword?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Grid>
      )}
      {/* Roles */}
      <Grid>
        <Stack>
          <InputSelect
            label="Roles*"
            options={keyValueAdapter(
              user ? user?.selectedRoles.concat(user?.availableRoles) : availableRoles,
              "name",
              "id"
            )}
            withCheckbox
            isValidField={!errors.roles}
            hint={errors.roles?.message}
            setItems={selectedValues => {
              console.log("🚀 ~ WorkDaysPage ~ selectedValues:", selectedValues);
              setValue(
                "roles",
                selectedValues?.filter(el => el !== undefined)
              );
            }}
            defaultValue={user?.selectedRoles?.map((item: any) => item?.id)}
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
          <Button
            size="small"
            text="Aceptar"
            variant="primary"
            type="submit"
            disabled={user ? !isValid : Object.keys(dirtyFields).length < 8}
            isLoading={isLoading}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
