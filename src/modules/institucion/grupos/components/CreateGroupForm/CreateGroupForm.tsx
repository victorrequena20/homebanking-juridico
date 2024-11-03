"use client";
import React from "react";
import { ICreateGroupFormProps } from "./CreateGroupFormProps";
import { Box, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputSelect from "@/components/InputSelect";
import { ICreateGroupForm } from "./types";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { IKeyValue } from "@/types/common";
import Input from "@/components/Input";
import { getOffices } from "@/services/Office.service";
import { createGroup, getGroupsTemplate } from "@/services/Groups.service";
import InputCalendar from "@/components/InputCalendar";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./yup";
import { getTodayFormattedEsddMMMMyyyy } from "@/utilities/common.utility";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

export default function CreateGroupForm({}: ICreateGroupFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any | null>([]);
  const [staffs, setStaffs] = React.useState<any | null>([]);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
    watch
  } = useForm<ICreateGroupForm>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    const response = await createGroup({
      ...data,
      officeId: data?.officeId?.value,
      staffId: data?.staffId?.value,
      activationDate: getTodayFormattedEsddMMMMyyyy(),
      active: isActive,
      locale: "es",
      dateFormat: "dd MMMM yyyy"
    });

    if (response?.status === 200) {
      toast.success("Grupo creado con exito.");
      router.push("/institucion/grupos/");
    } else {
      toast.error("Error al crear el grupo.");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    (async () => {
      const response = await getOffices();
      if (response?.status === 200) {
        setOffices(response?.data);
      }
    })();
  }, []);

  React.useEffect(() => {
    setValue("staffId", null);
    (async () => {
      const response = await getGroupsTemplate({
        officeId: watch("officeId")?.value,
        staffInSelectedOfficeOnly: true
      });
      if (response?.status === 200) {
        setStaffs(response?.data?.staffOptions);
      }
    })();
  }, [watch("officeId")]);

  return (
    <Grid
      sx={{
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 3 }}>
        {/*Nombre*/}
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
              />
            )}
          />
        </InputResponsiveContainer>
        {isActive ? (
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="externalId"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Id externo*"
                  type="text"
                  isValidField={!errors.externalId}
                  hint={errors.externalId?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </InputResponsiveContainer>
        ) : (
          <Stack sx={{ opacity: 0 }}>
            <Stack sx={{ minWidth: "392px" }} />
          </Stack>
        )}
      </Stack>

      <Stack sx={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 3 }}>
        {/*Oficina*/}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="officeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Oficina*"
                options={keyValueAdapter(offices, "name", "id")}
                setItem={(item: IKeyValue) => onChange(item)}
                hint={errors.officeId?.message}
                isValidField={!errors.officeId}
                value={value}
              />
            )}
          />
        </InputResponsiveContainer>

        {/*Asesor*/}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="staffId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Asesor*"
                options={keyValueAdapter(staffs, "displayName", "id")}
                setItem={(item: IKeyValue) => onChange(item)}
                hint={errors.staffId?.message}
                isValidField={!errors.staffId}
                value={value}
              />
            )}
          />
        </InputResponsiveContainer>
      </Stack>

      <Stack sx={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 3 }}>
        {/* Registrado el dia */}
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="submittedOnDate"
            render={({ field: { onChange } }) => (
              <InputCalendar
                label="Registrado el día*"
                onChange={date => onChange(date)}
                hint={errors.submittedOnDate?.message}
                isValidField={!errors.submittedOnDate}
                maxToday
              />
            )}
          />
        </InputResponsiveContainer>
        <Stack
          sx={{
            flexDirection: "row",
            width: "392px",
            maxWidth: "392px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid #cccccc80",
            pb: 2
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

      <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 3, mt: 3 }}>
        <Button
          size="small"
          text="Cancelar"
          variant="navigation"
          type="button"
          onClick={() => router.push("/institucion/grupos/")}
        />
        <Button size="small" text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
      </Stack>
    </Grid>
  );
}
