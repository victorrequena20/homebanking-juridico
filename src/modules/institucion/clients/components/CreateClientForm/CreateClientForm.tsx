"use client";
import React from "react";
import { ICreateClientFormProps } from "./CreateClientFormProps";
import { Controller, useForm } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import Input from "@/components/Input";
import { ICreateClientForm } from "./types";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { getOffices } from "@/services/Office.service";
import { IKeyValue } from "@/types/common";
import { getTemplate } from "@/services/Clients.service";
import InputCalendar from "@/components/InputCalendar";
import { Box } from "@mui/material";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import schema from "./yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreateClientForm({ action }: ICreateClientFormProps) {
  const [openSavingAccount, setOpenSavingAccount] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isPersonal, setIsPersonal] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm<ICreateClientForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    action(data);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getTemplate();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setTemplateData(response?.data);
      }
    })();
  }, []);

  React.useEffect(() => {
    console.log("��� ~ watch:", watch());
    console.log("��� ~ isvalid:", isValid, errors);
  }, [
    watch("officeId"),
    // watch("legalFormId"),
    watch("firstname"),
    watch("middlename"),
    watch("lastname"),
    watch("externalId"),
    watch("dateOfBirth"),
    // watch("staffId"),
    watch("mobileNo"),
    watch("emailAddress"),
    isValid,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 3, maxWidth: "900px", mx: "auto", alignItems: "center" }}>
        {/* Oficina y forma juridica */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="officeId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Oficina*"
                  options={keyValueAdapter(templateData?.officeOptions, "name", "id")}
                  setItem={(item: IKeyValue) => {
                    onChange(item);
                  }}
                  hint={errors?.officeId?.message}
                  value={value}
                  isValidField={!errors?.officeId}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="legalFormId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Forma jurídica*"
                  options={keyValueAdapter(templateData?.clientLegalFormOptions, "value", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  hint={errors.officeId?.message}
                  isValidField={!errors.officeId}
                  value={value}
                />
              )}
            />
          </Stack>
        </Stack>
        {/* Nombre y segundo nombre */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
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
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="middlename"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Segundo nombre"
                  type="text"
                  isValidField={!errors.middlename}
                  hint={errors.middlename?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Stack>
        {/* Apellido e ID externo */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
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
        {/* Fecha de nacimiento y asesor */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value, onChange } }) => (
                <InputCalendar
                  label="Fecha de nacimiento"
                  onChange={date => onChange(date)}
                  hint={errors.dateOfBirth?.message}
                  isValidField={!errors.dateOfBirth}
                  maxToday
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="staffId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Asesor"
                  options={keyValueAdapter(templateData?.staffOptions, "displayName", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  hint={errors.officeId?.message}
                  isValidField={!errors.officeId}
                  value={value}
                />
              )}
            />
          </Stack>
        </Stack>
        {/* Teléfono y email */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="mobileNo"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Teléfono móvil*"
                  type="text"
                  isValidField={!errors.mobileNo}
                  hint={errors.mobileNo?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="emailAddress"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Email*"
                  type="text"
                  isValidField={!errors.emailAddress}
                  hint={errors.emailAddress?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Stack>
        {/* Personal y activo */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack
            sx={{
              flexDirection: "row",
              width: "392px",
              maxWidth: "392px",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #cccccc80",
              pb: 2,
            }}
          >
            <Typography variant="body2" fontWeight="400" color="#12141a">
              ¿Es personal?
            </Typography>
            <Box>
              <Toggle isChecked={isPersonal} size="small" setIsChecked={setIsActive} />
            </Box>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              width: "392px",
              maxWidth: "392px",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #cccccc80",
              pb: 2,
            }}
          >
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Activo?
            </Typography>
            <Box>
              <Toggle isChecked={isActive} size="small" setIsChecked={setIsActive} />
            </Box>
          </Stack>
        </Stack>
        {/* Abrir cuenta de ahorros */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack
            sx={{
              flexDirection: "row",
              width: "392px",
              maxWidth: "392px",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "1px solid #cccccc80",
              pb: 2,
            }}
          >
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Abrir cuenta de Ahorros?
            </Typography>
            <Toggle isChecked={openSavingAccount} size="small" setIsChecked={setOpenSavingAccount} />
          </Stack>
          <Stack>
            {openSavingAccount ? (
              <Controller
                control={control}
                name="savingsProductId"
                render={({ field: { value, onChange } }) => (
                  <InputSelect
                    label="Producto de ahorro*"
                    options={keyValueAdapter(templateData?.savingProductOptions, "name", "id")}
                    setItem={(item: IKeyValue) => onChange(item)}
                    value={value}
                    hint={errors.savingsProductId?.message}
                    isValidField={!errors.savingsProductId}
                  />
                )}
              />
            ) : (
              <Box sx={{ width: "392px" }} />
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", mt: 3 }}>
        <Button variant="navigation" size="small" text="Cancelar" />
        <Button
          variant="primary"
          size="small"
          text="Siguiente"
          disabled={!isValid}
          type="submit"
          onClick={() => handleSubmit(onSubmit)}
        />
      </Stack>
    </form>
  );
}
