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

export default function CreateClientForm({}: ICreateClientFormProps) {
  const [openSavingAccount, setOpenSavingAccount] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isPersonal, setIsPersonal] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateClientForm>({
    //   resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: ICreateClientForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 3, maxWidth: "900px", mx: "auto", alignItems: "center" }}>
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="officeId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Oficina*"
                  options={keyValueAdapter(templateData?.officeOptions, "name", "id")}
                  setItem={(item: IKeyValue) => onChange(item?.value.toString())}
                  hint={errors.officeId?.message}
                  isValidField={!errors.officeId}
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
                  setItem={(item: IKeyValue) => onChange(item?.value.toString())}
                  hint={errors.officeId?.message}
                  isValidField={!errors.officeId}
                />
              )}
            />
          </Stack>
        </Stack>

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
                  setItem={(item: IKeyValue) => onChange(item?.value.toString())}
                  hint={errors.officeId?.message}
                  isValidField={!errors.officeId}
                />
              )}
            />
          </Stack>
        </Stack>

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
              Abrir Cuenta de Ahorros?
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
                    setItem={(item: IKeyValue) => onChange(item?.value.toString())}
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
    </form>
  );
}
