"use client";
import React from "react";
import { ICreateClientFormProps } from "./CreateClientFormProps";
import { Controller, useForm } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { IKeyValue } from "@/types/common";
import InputCalendar from "@/components/InputCalendar";
import { Box } from "@mui/material";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import { useCreateClientContext } from "../../context/CreateClient/CreateClient.provider";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";

export default function CreateClientForm({ action }: ICreateClientFormProps) {
  const { formMethods, clientGeneralData, step, setClientGeneralData, templateData } = useCreateClientContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
    watch,
    getValues,
  } = formMethods;

  const onSubmit = async (data: any) => {
    // console.log("🚀 ~ onSubmit ~ data:", data);
    action(data);
  };

  React.useEffect(() => {
    // Update default value fields
    if (clientGeneralData) {
      Object.entries(clientGeneralData).forEach(([key, value]) => {
        // @ts-ignore
        setValue(key, value);
      });
    }
  }, []);

  // Actualizar estado cuando se cambia el step
  React.useEffect(() => {
    // Actualizar clientGeneralData
    return () => {
      console.log("��� ~ watch:", watch());
      console.log("IS valid____", isValid);
    };
  }, [step]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 3, maxWidth: "900px", mx: "auto", alignItems: "center" }}>
        {/* Oficina y forma juridica */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={formMethods?.control}
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
                  defaultValue={clientGeneralData?.officeId?.value}
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
                  defaultValue={clientGeneralData?.legalFormId?.value}
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
                  hint={errors.firstname?.message || ""}
                  value={value}
                  onChange={onChange}
                  defaultValue={clientGeneralData?.firstname}
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
                  defaultValue={clientGeneralData?.middlename}
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
                  defaultValue={clientGeneralData?.lastname}
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
                  defaultValue={clientGeneralData?.externalId}
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
                  defaultValue={formatDateEsddMMMMyyyy(clientGeneralData?.dateOfBirth) || null}
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
        {/* Genero */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="genderId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Genero"
                  options={keyValueAdapter(templateData?.genderOptions, "name", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  hint={errors.genderId?.message}
                  isValidField={!errors.genderId}
                  value={value}
                />
              )}
            />
          </Stack>
          <Stack sx={{ width: "392px" }}></Stack>
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
                  defaultValue={clientGeneralData?.mobileNo}
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
                  defaultValue={clientGeneralData?.emailAddress}
                />
              )}
            />
          </Stack>
        </Stack>
        {/* Tipo de cliente y clasificacion de clientes */}
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
            <Controller
              control={control}
              name="clientTypeId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Tipo de cliente"
                  options={keyValueAdapter(templateData?.clientTypeOptions, "name", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  hint={errors.clientType?.message}
                  isValidField={!errors.clientType}
                  value={value}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              control={control}
              name="clientClassificationId"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  label="Clasificación de cliente"
                  options={keyValueAdapter(templateData?.clientClassificationOptions, "name", "id")}
                  setItem={(item: IKeyValue) => onChange(item)}
                  hint={errors.clientClassification?.message}
                  isValidField={!errors.clientClassification}
                  value={value}
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
              <Toggle
                isChecked={formMethods?.getValues("isStaff")}
                size="small"
                setIsChecked={value => formMethods.setValue("isStaff", value)}
              />
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
              <Toggle
                isChecked={formMethods?.getValues("isActive")}
                size="small"
                setIsChecked={value => formMethods.setValue("isActive", value)}
              />
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
            <Toggle
              isChecked={getValues("openSavingAccount")}
              size="small"
              setIsChecked={value => setValue("openSavingAccount", value)}
            />
          </Stack>
          <Stack>
            {formMethods?.getValues("openSavingAccount") ? (
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
                    defaultValue={clientGeneralData?.savingsProductId?.value}
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
