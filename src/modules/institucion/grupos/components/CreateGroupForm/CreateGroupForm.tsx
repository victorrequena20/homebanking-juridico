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
import { getGroupsTemplate } from "@/services/Groups.service";
import InputCalendar from "@/components/InputCalendar";
import Toggle from "@/components/Toggle";

export default function CreateGroupForm({}: ICreateGroupFormProps) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any | null>([]);
  const [staffs, setStaffs] = React.useState<any | null>([]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm<ICreateGroupForm>({
    //   resolver: yupResolver(schema),
    mode: "onChange",
  });

  React.useEffect(() => {
    (async () => {
      const response = await getOffices();
      console.log("🚀 ~ response:", response);
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
        staffInSelectedOfficeOnly: true,
      });
      if (response?.status === 200) {
        setStaffs(response?.data?.staffOptions);
      }
    })();
  }, [watch("officeId")]);

  return (
    <form>
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
                  label="Id externo*"
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
          </Stack>
          <Stack>
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
          </Stack>
        </Stack>

        <Stack sx={{ flexDirection: "row", gap: 3 }}>
          <Stack>
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
          </Stack>
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
              Activo?
            </Typography>
            <Box>
              <Toggle isChecked={isActive} size="small" setIsChecked={setIsActive} />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}
